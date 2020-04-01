import React, { Fragment } from 'react';
import DatePicker, { registerLocale }  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
registerLocale("pl", pl);

const Menu = ( props ) => {

  const dayInd = props.menu.recipes.findIndex(item => item.dayNum === props.internals.currentDay);
  const recipeList = props.menu.recipes[dayInd].recList.map((item, index) => {
    return (
      <tr key={item.name + index}>
        <td>{item.name}</td>
        <td>{item.portions}</td>
        <td><button onClick={props.rmvRec.bind(this, index, dayInd)}>X</button></td>
      </tr>
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
        <li key={recipe.name + index}>{recipe.name} dla {recipe.portions}</li>
      )
    })
    return (
      <div key={item.dayNum}>
        <h3>{format(item.date, "do LLL y",{locale: pl})}</h3>
        <ul>
          {recList}
        </ul>
      </div>
    )
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

  
  const suppShoppingList = [...shopListArr]
    .map(item => {
      const fridgeIng = props.supplies.find(ing => ing.name === item.name);
      if (fridgeIng) {item.quantity -= fridgeIng.quantity}
      return item;
  })
    .filter(item => item.quantity > 0)
    .map(item => {
      const quantity = Math.ceil(item.quantity);
      return (
        <li key={item.name}>{item.name}: {quantity} {item.unit}</li>
      )
    })


  return (
    <Fragment>
      <label>Data rozpoczęcia:</label>
      <DatePicker 
        selected={props.menu.startDate} 
        onChange={props.dateChg}
        locale="pl" 
      />
      <label>Liczba dni:</label>
      <input 
        type="number" 
        min="1"
        onChange={props.numDaysChg} 
        value={props.menu.numDays}  
      /> 
      <div>
        <h2>Wybrany Dzień</h2>
        <h2>{chosenDay}</h2>
        <table>
          <thead>
            <tr>
              <td>Przepis</td>
              <td>Porcje</td>
              <td>Usuń</td>
            </tr>
          </thead>
          <tbody>
            {recipeList}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <select onChange={props.inputHandler} name="menuRecSelect"  value={props.internals.menuRecSelect}>
                  <option disabled>--Wybierz przepis--</option>
                  {recipeOptionList}
                </select>
              </td>
              <td>
                <label htmlFor="menuNumPortInput">Porcje: </label>
                <input
                type="number" 
                name="menuNumPortInput" 
                id="menuNumPortInput"
                min="1"
                onChange={props.inputHandler} 
                value={props.internals.menuNumPortInput}  
                />
              </td>
              <td>
                <button onClick={props.addRec}>Dodaj</button>
              </td>
            </tr>
          </tfoot>
        </table>
        <button onClick={props.nextDay}>Next Day</button>
        <label htmlFor="menuSelectDay">Wybierz dzień:</label>
        <select onChange={props.goToDay} name="menuSelectDay" value={props.internals.currentDay} id="menuSelectDay">
          {dayList}
        </select>
      </div>
      <div>
        {fullList}
      </div>
      <div>
        <h2>Lista zakupów:</h2>
        <h3>Brakujące produkty:</h3>
        <ul>
          {suppShoppingList}
        </ul>
        <h3>Pełna lista:</h3>
        <ul>
          {fullShoppingList}
        </ul>
      </div>
    </Fragment>
  )
}

export default Menu;