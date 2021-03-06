import React from 'react';
import styles from './Menu.module.css';
import DatePicker, { registerLocale }  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { saveAs } from 'file-saver';
import * as docx from "docx";

registerLocale("pl", pl);


const Menu = ( props ) => {

  const dayInd = props.menu.recipes.findIndex(item => item.dayNum === props.internals.currentDay);
  const recipeList = props.menu.recipes[dayInd].recList.map((item, index) => {
    return (
      <div className={styles.recRow} key={item.name + index}>
        <p>{item.name} dla {item.portions}{' \u00a0'}<i class="fas fa-male"></i></p>
        <button onClick={props.rmvRec.bind(this, index, dayInd)}>Usuń</button>
      </div>
    )
  })
  
  const recipeOptionList = props.recipeList.map(item => {
    return (
      <option value={item.name} key={item.name}>{item.name}</option>
    )
  })
  
  const dayList = props.menu.recipes.map(item => {
    const formatDate = format(item.date, "do LLL y",{
      locale: pl
    });
    return (
      <option value={item.dayNum} key={item.dayNum}>{formatDate}</option>
    )
  })

  const chosenDay = `Dzień ${props.internals.currentDay}: ${format(props.menu.recipes[dayInd].date, "do LLL y",{
    locale: pl
  })}`;

  const fullList = props.menu.recipes.map(item => {
    const recList = item.recList.map((recipe, index) => {
      return (
        <li key={recipe.name + index}>{recipe.name} dla {recipe.portions}{' \u00a0'}<i class="fas fa-male"></i></li>
      )
    })
    return (
      <div key={item.dayNum}>
        <h3>{format(item.date, "do LLL y",{locale: pl})}</h3>
        <ul>
          {recList.length === 0 ? <li>Dodaj przepisy.</li> : recList}
        </ul>
      </div>
    )
  })

  const fullMenuChildren = [
    new docx.Paragraph({
      children: [new docx.TextRun({
        text: "Menu",
        bold: true,
        color: "bf1343",
        size: 48
      })],
      heading: docx.HeadingLevel.HEADING_1,
      alignment: docx.AlignmentType.CENTER,
      spacing: {
        line: 900
      }     
    })
  ];
  
  props.menu.recipes.forEach(item => {
    fullMenuChildren.push(
      new docx.Paragraph({
        children: [new docx.TextRun({
          text: `${format(item.date, "do LLL y",{locale: pl})}`,
          size: 32
        })],
        bullet: {
          level: 0
        },
        spacing: {
          before: 400,
          after: 400
        }
      })
    );
    item.recList.forEach(recipe => {
      fullMenuChildren.push(
        new docx.Paragraph({
          children: [new docx.TextRun({
            text: `${recipe.name} dla ${recipe.portions}`,
            size: 32
          })],
          bullet: {
            level: 1
          }
        })
      )
    })
  })

  const shopListArr = [];
  props.menu.recipes.forEach(item => {
    item.recList.forEach(recipe => {
      props.recipeList.find(element => element.name === recipe.name).ingredients.forEach(ing => {
        const listInd = shopListArr.findIndex(listItem => listItem.name === ing.name);
        if (listInd < 0) {
          shopListArr.push({
            name: ing.name,
            quantity: ing.quantity * (recipe.portions / props.recipeList.find(element => element.name === recipe.name).portions),
            unit: ing.unit
          })
        } else {
          shopListArr[listInd].quantity += ing.quantity * (recipe.portions / props.recipeList.find(element => element.name === recipe.name).portions);
        }
      })
    })
  })
  
  const fullShoppingList = shopListArr.map(item => {
    const quantity = Math.ceil(item.quantity);
    
    return (
      <li key={item.name}>{item.name}: {quantity} {item.unit}</li>
    )
  })

  const fullShopChildren = [
    new docx.Paragraph({
      children: [new docx.TextRun({
        text: "Potrzebne produkty",
        bold: true,
        color: "bf1343",
        size: 48
      })],
      heading: docx.HeadingLevel.HEADING_1,
      alignment: docx.AlignmentType.CENTER,
      spacing: {
        line: 900
      }
    })
  ];
  shopListArr.forEach((item => {
    const quantity = Math.ceil(item.quantity);
    fullShopChildren.push(
      new docx.Paragraph({
        children: [new docx.TextRun({
          text: `${item.name}: ${quantity} ${item.unit}`,
          size: 32
        })],
        bullet: {
          level: 0
        }
      })
    )
  }))

  const suppShoppingListPrim = shopListArr
    .map(item => {
      const fridgeIng = props.supplies.find(ing => ing.name === item.name);
      if (fridgeIng) {item.quantity -= fridgeIng.quantity}
      return item;
  })
    .filter(item => item.quantity > 0);

  const suppShoppingList = suppShoppingListPrim
    .map(item => {
      const quantity = Math.ceil(item.quantity);
      return (
        <li key={item.name}>{item.name}: {quantity} {item.unit}</li>
      )
    })

  const suppShopChildren = [
    new docx.Paragraph({
      children: [new docx.TextRun({
        text: "Brakujące produkty",
        bold: true,
        color: "bf1343",
        size: 48
      })],
      heading: docx.HeadingLevel.HEADING_1,
      alignment: docx.AlignmentType.CENTER,
      spacing: {
        line: 900
      }
    })
  ];
  suppShoppingListPrim.forEach(item => {
    const quantity = Math.ceil(item.quantity);
    suppShopChildren.push(
      new docx.Paragraph({
        children: [new docx.TextRun({
          text: `${item.name}: ${quantity} ${item.unit}`,
          size: 32
        })],
        bullet: {
          level: 0
        }
      })
    )
  })

  const generateDOCX = () => {
    const doc = new docx.Document();
    
    doc.addSection({
        headers: {
          default: new docx.Header({
            children: [new docx.Paragraph("Jedzeniomat")],
        }),
        },  
        properties: {},
          children: suppShopChildren         
      });
      doc.addSection({
        headers: {
          default: new docx.Header({
            children: [new docx.Paragraph("Jedzeniomat")],
        }),
        },  
        properties: {},
          children: fullShopChildren         
      });
      doc.addSection({
        headers: {
          default: new docx.Header({
            children: [new docx.Paragraph("Jedzeniomat")],
        }),
        },  
        properties: {},
          children: fullMenuChildren         
      });

    docx.Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "menu.docx");
      console.log("Document created successfully");
    });
  }

 
  return (
    <main className={styles.mainCont}>  
      <div className={styles.editCont}>
        <h2>Skomponuj Menu</h2>
        <div className={styles.dateNum}>
          <div className={styles.date}>
            <label>Data rozpoczęcia:</label>
            <DatePicker 
              selected={props.menu.startDate} 
              onChange={props.dateChg}
              locale="pl"
              className={styles.datePicker} 
            />
          </div>
          <div className={styles.numDay}>
            <label>Liczba dni:</label>
            <input 
              type="number" 
              min="1"
              onChange={props.numDaysChg} 
              value={props.menu.numDays}  
            /> 
          </div>     
        </div>
        <h3>{chosenDay}</h3>
        <div className={styles.recList}>
          {recipeList}
        </div>
        <div className={styles.addRec}>
          <select onChange={props.inputHandler} name="menuRecSelect"  value={props.internals.menuRecSelect}>
            <option disabled>Wybierz przepis</option>
            {recipeOptionList}
          </select>
          <label htmlFor="menuNumPortInput">Dla:</label>
          <input
            type="number" 
            name="menuNumPortInput" 
            id="menuNumPortInput"
            min="1"
            onChange={props.inputHandler} 
            value={props.internals.menuNumPortInput}  
          />
          <button onClick={props.addRec}>Dodaj</button>
        </div>
        <div className={styles.chooseDayBox}>
          <button 
          onClick={props.nextDay}
          disabled={props.internals.currentDay >= props.menu.numDays}>Kolejny dzień</button>
          <div className={styles.chooseDay}>
            <label htmlFor="menuSelectDay">Wybierz dzień:</label>
            <select onChange={props.goToDay} name="menuSelectDay" value={props.internals.currentDay} id="menuSelectDay">
              {dayList}
            </select>
          </div>   
        </div>
      </div>
      <div className={styles.showCont}>
        <h2>Menu</h2>
        <div className={styles.dayList}>
          {fullList}
        </div>
      </div>
      <div className={styles.shoppingCont}>
        <h2>Lista zakupów:</h2>
        <h3>Brakujące produkty:</h3>
        <ul className={styles.suppShopList}>
          {suppShoppingList.length === 0 ? <li>Niczego nie brakuje.</li> : suppShoppingList}
        </ul>
        <h3>Pełna lista:</h3>
        <ul className={styles.fullShopList}>
          {fullShoppingList.length === 0 ? <li>Nic nie potrzeba.</li> : fullShoppingList}
        </ul>
        <div className={styles.genDoc}>
          <button type="button" onClick={generateDOCX}>Pobierz listę zakupów</button>
        </div>
      </div>     
    </main>
  )
}

export default Menu;