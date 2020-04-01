import React from 'react';
import AddIngredients from './AddIngredients';

const Recipes = ( props ) => {

  const recipeNames = props.recipeList.map((item, index) => {
    return (
      <tr key={item.name}>
        <td onClick={props.recipeChoose.bind(this, index)}>{item.name}</td>
        <td>
          <button onClick={props.modify.bind(this, index)}>modify symbol</button>
        </td>
        <td>
          <button onClick={props.remove.bind(this, index)}>X</button>
        </td>
      </tr>
    )
  })

  const recipeInd = props.recipeList.findIndex(item => item.name === props.internals.chosenRecipe);
  let ingredientList;
  let instructions;
  if (recipeInd >= 0) {
    ingredientList = props.recipeList[recipeInd].ingredients.map((item) => {
      return (
        <li key={item.name}>{item.name}: {item.quantity} {item.unit}</li>
      )
    })
    instructions = <div>
      <p>{props.recipeList[recipeInd].instructions}</p>
      <p>Liczba porcji: {props.recipeList[recipeInd].portions}</p>
    </div>
  }

  return (
    <div>
      <div>
        <h2>Lista przepisów</h2>
        <table>
          <thead>
            <tr>
             <th>Nazwa</th>
             <th>Edytuj</th>
             <th>Usuń</th> 
            </tr>
          </thead>
          <tbody>
            {recipeNames}
          </tbody>
        </table>
        <button onClick={props.addNew}>Dodaj przepis</button>
      </div>
      <h2>
        {props.internals.addRecipeToggle 
        ? <input  
            type="text" 
            name="newRecipeNameInput" 
            onChange={props.inputHandler} 
            value={props.internals.newRecipeNameInput} 
          /> 
        : props.internals.chosenRecipe}
      </h2>
      <div>
        <h3>Składniki</h3>
        {props.internals.addRecipeToggle  
        ? <AddIngredients 
            internals={props.internals} 
            addRecipeIng={props.addRecipeIng}
            inputHandler={props.inputHandler} 
            rmvIng = {props.rmvIng}  
          />
        : <ul>{ingredientList}</ul>}
      </div>
      <div>
        <h3>Przygotowanie</h3>
        {props.internals.addRecipeToggle  
        ? <div>
            <textarea 
              placeholder="Tu wpisz instrukcje przygotowania." 
              name="tempAddInst" 
              value={props.internals.tempAddInst} 
              onChange={props.inputHandler}
            />
            <label htmlFor="recPortInput">Liczba porcji:</label>
            <input 
              type="number" 
              name="newRecipePortInput" 
              onChange={props.inputHandler} 
              value={props.internals.newRecipePortInput} 
              id="recPortInput"
            />
            <button onClick={props.save}>Zapisz</button>
            <button onClick={props.discard}>Odrzuć zmiany</button>
          </div>
        : instructions}
      </div>
      <button onClick={props.saveData}>Zapisz zmiany</button>
    </div>
  )
}

export default Recipes;