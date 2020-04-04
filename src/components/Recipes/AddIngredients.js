import React, { Fragment } from 'react';
import SelectUnit from '../Auxiliary/SelectUnit';
import styles from './AddIngredients.module.css';

const AddIngredients = ( props ) => {
  
  let currentIng;
  if (props.internals.tempAddIngs.length > 0) {
    currentIng = props.internals.tempAddIngs.map((item, index) => {
      const name = item.name.length > 20 ? item.name.slice(0, 21).concat('...	\u00a0 \u00a0 \u00a0') : item.name.concat(': \u00a0');
      
      return (
        <ul key={item.name}>
          <li>{name} {item.quantity} {item.unit}</li>
          <li><button onClick={props.modifyIng.bind(this, index, item.name, item.quantity, item.unit)}>Edytuj</button></li>
          <li><button onClick={props.rmvIng.bind(this, index)}>Usuń</button></li>
        </ul>
      )
    })
  }
  
  return (
    <Fragment>
      <div className={styles.ingList}>
        {currentIng}
      </div>
      <ul className={styles.inputList}>
        <li>
          <input 
            type="text" 
            name="addRecIngNameInput" 
            onChange={props.inputHandler} 
            value={props.internals.addRecIngNameInput}
            placeholder="Nazwa" 
          />
        </li>
        <li>
          <input 
            type="number" 
            name="addRecIngQuantityInput" 
            min={1} 
            onChange={props.inputHandler} 
            value={props.internals.addRecIngQuantityInput}  
            placeholder="Ilość"
          />
        </li>
        <li>
          <SelectUnit inputHandler={props.inputHandler} selectUnitInput={props.internals.selectUnitInput} />
        </li>
        <li>
          <button onClick={props.addRecipeIng} >Dodaj</button>
        </li>
      </ul>
    </Fragment>
    
  )
}

export default AddIngredients;