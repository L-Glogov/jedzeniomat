import React, { Fragment } from 'react';
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
      <tr key={item.name.toUpperCase()}>
        <td className={styles.name}><p>{item.name.toUpperCase()}</p></td>
        <td className={styles.quantity}>{item.quantity} {item.unit}</td>
        <td className={styles.addRem}>
          <button onClick={props.addRem.bind(this, amount, index)}>+</button>
          <button onClick={props.addRem.bind(this, -amount, index)}>-</button>
        </td>
        <td className={styles.modify}>
          <input 
            type='number' 
            min={0} 
            step={step}
            placeholder='Wpisz ilość'
            onChange={(e) => props.modifyAmtInput(index, e)}
          />
          <button onClick={props.modify.bind(this, item.modifyAmount, index)}>Zmień</button>
        </td>
        <td className={styles.rem}>
          <button onClick={props.remove.bind(this, index)}>X</button>
        </td>
      </tr>
    )
  });

  return(
    <main className={styles.mainCont}>
      <table>
        <thead>
          <tr>
            <th className={styles.name}>Nazwa</th>
            <th className={styles.quantity}>Ilość</th>
            <th className={styles.addRem}>+/-</th>
            <th className={styles.modify}>Zmień</th>
            <th className={styles.rem}>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {supplies}
        </tbody>     
      </table>
      <h3>Dodaj Składnik</h3>
      <ul>
        <li>
          <label htmlFor="fridgeNameInput">Nazwa</label>
          <input 
            type="text" 
            name="fridgeNameInput" 
            onChange={props.inputHandler} 
            value={props.internals.fridgeNameInput}
         />
        </li>
        <li>
          <label htmlFor="fridgeQuantityInput">Ilość</label>
          <input 
            type="number" 
            name="fridgeQuantityInput" 
            min={0} 
            onChange={props.inputHandler} 
            value={props.internals.fridgeQuantityInput}  
          />
        </li>
        <li>
          <label htmlFor="fridgeUnitInput">Jednostka</label>
          <SelectUnit inputHandler={props.inputHandler} selectUnitInput={props.internals.selectUnitInput} name="fridgeUnitInput"/>
        </li>
        <li>
          <button onClick={props.addItem}>Dodaj</button>
        </li>
      </ul>   
      <button onClick={props.saveData}>Zapisz zmiany</button>
    </main>
  )
}

export default Fridge;