import React from 'react';
import SelectUnit from '../Auxiliary/SelectUnit';
import styles from './Fridge.module.css';

const Fridge = ( props ) => {
  
  const supplies = props.supplies.map((item, index) => {
    let amount;
    let step;
    switch(item.unit) {
      case "szt":
        amount = 1;
        step = 1;
        break;
      case "gram":
        amount = 100;
        step = 500;
        break;
      case "ml":
        amount = 100;
        step = 500;
        break;
      default:
        amount = 1;
        step = 1;
    }
    return (
      <ul key={item.name.toUpperCase()} className={styles.ing }>
        <li className={styles.name}>{item.name.toUpperCase()}</li>
        <li className={styles.quantity}>{item.quantity} {item.unit}</li>
        <li className={styles.addRem}>
          <button className={styles.plusBtn} onClick={props.addRem.bind(this, amount, index)}>+</button>
          <button className={styles.minusBtn} onClick={props.addRem.bind(this, -amount, index)}>-</button>
        </li>
        <li className={styles.modify}>
          <input 
            type='number' 
            min={0} 
            step={step}
            placeholder='Wpisz ilość'
            onChange={(e) => props.modifyAmtInput(index, e)}
          />
          <button onClick={props.modify.bind(this, item.modifyAmount, index)}>Zmień</button>
        </li>
        <li className={styles.rem}>
          <button onClick={props.remove.bind(this, index)}>X</button>
        </li>
      </ul>
    )
  });

  return(
    <main className={styles.mainCont}>
      <div className={styles.border}>
        <div className={styles.fridgeTable}>
          <ul className={styles.listLabels}>
            <li className={styles.name + ' ' + styles.labelItem}>Nazwa</li>
            <li className={styles.quantity + ' ' + styles.labelItem}>Ilość</li>
            <li className={styles.addRem + ' ' + styles.labelItem}>+/-</li>
            <li className={styles.modify + ' ' + styles.labelItem}>Zmień</li>
            <li className={styles.rem + ' ' + styles.labelItem}>Usuń</li>
          </ul>
          <div className={styles.scrollList}>
              {supplies}
          </div>
        </div>
        <h3>Dodaj Składnik</h3>
        <ul className={styles.addIng}>
          <li>
            <label htmlFor="fridgeNameInput">Nazwa:</label>
            <input 
              type="text" 
              name="fridgeNameInput" 
              onChange={props.inputHandler} 
              value={props.internals.fridgeNameInput}
              maxLength="18"
          />
          </li>
          <li>
            <label htmlFor="fridgeQuantityInput">Ilość:</label>
            <input 
              type="number" 
              name="fridgeQuantityInput" 
              min={0} 
              onChange={props.inputHandler} 
              value={props.internals.fridgeQuantityInput}  
            />
          </li>
          <li>
            <label htmlFor="fridgeUnitInput">Jednostka:</label>
            <SelectUnit inputHandler={props.inputHandler} selectUnitInput={props.internals.selectUnitInput} name="fridgeUnitInput"/>
          </li>
          <li>
            <button 
              onClick={props.addItem} 
              disabled={props.internals.fridgeNameInput === '' || props.internals.fridgeQuantityInput === ''} >Dodaj:</button>
          </li>
        </ul>   
      </div>
      <button className={styles.save} onClick={props.saveData}>Zapisz zmiany</button>
    </main>
  )
}

export default Fridge;