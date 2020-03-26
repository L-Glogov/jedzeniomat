import React from 'react';
import SelectUnit from '../Auxiliary/SelectUnit';

const AddIngredients = ( props ) => {
  
  let currentIng;
  if (props.internals.tempAddIngs.length > 0) {
    currentIng = props.internals.tempAddIngs.map((item, index) => {
      return (
        <tr key={item.name}>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.unit}</td>
          <td><button onClick={props.rmvIng.bind(this, index)}>X</button></td>
        </tr>
      )
    })
  }
  
  const addInputs = (
    <tr>
      <td>
        <input 
          type="text" 
          name="addRecIngNameInput" 
          onChange={props.inputHandler} 
          value={props.internals.addRecIngNameInput} 
        />
      </td>
      <td>
        <input 
          type="number" 
          name="addRecIngQuantityInput" 
          min={1} 
          onChange={props.inputHandler} 
          value={props.internals.addRecIngQuantityInput}  
        />
      </td>
      <td>
        <SelectUnit inputHandler={props.inputHandler} selectUnitInput={props.internals.selectUnitInput} />
      </td>
      <td>
        <button onClick={props.addRecipeIng} >Dodaj</button>
      </td>
    </tr>
  )
  
  return (
    <table>
      <thead>
        <tr>
          <th>Nazwa</th> 
          <th>Ilość</th>
          <th>Jednostka</th>
          <th>Dodaj/Usuń</th>
        </tr>
      </thead>
      <tbody>
        {currentIng}
      </tbody>
      <tfoot>
      {addInputs}
      </tfoot>
    </table>
  )
}

export default AddIngredients;