import React from 'react';
import SelectUnit from '../Auxiliary/SelectUnit';

const AddIngredients = ( props ) => {
  
  const currentIng = props.internals.tempAddIngs.map(item => {
    return (
      <tr key={item.name}>
        <td>{item.name}</td>
        <td>{item.quantity} {item.unit}</td>
        <td>{item.unit}</td>
        <td><button>X</button></td>
      </tr>
    )
  })
  
  const addInputs = (
    <tr>
      <td>
        <input 
          type="text" 
          name="addRecipeNameInput" 
          onChange={props.inputHandler} 
          value={props.internals.addRecipeNameInput} 
        />
      </td>
      <td>
        <input 
          type="number" 
          name="addRecipeQuantityInput" 
          min={0} 
          onChange={props.inputHandler} 
          value={props.internals.addRecipeQuantityInput}  
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