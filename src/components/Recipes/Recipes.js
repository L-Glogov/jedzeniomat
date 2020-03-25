import React from 'react';

const Recipes = ( props ) => {

  const recipeNames = props.recipeList.map((item, index) => {
    return (
      <tr key={item.name}>
        <td onClick={props.recipeChoose.bind(this, index)}>{item.name}</td>
        <td>
          <button>modify symbol</button>
        </td>
        <td>
          <button onClick={props.remove.bind(this, index)}>X</button>
        </td>
      </tr>
    )
  })

  const recipeInd = props.recipeList.findIndex(item => item.name === props.chosenRecipe);
  let ingredientList;
  let instructions;
  if (recipeInd >= 0) {
    ingredientList = props.recipeList[recipeInd].ingredients.map((item, index) => {
      return (
        <li key={item.name}>{item.name}: {item.quantity} {item.unit}</li>
      )
    })
    instructions = <p>{props.recipeList[recipeInd].instructions}</p>
  }



  return (
    <div>
      <section>
        <h3>Lista przepisów</h3>
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
        <button>Dodaj przepis</button>
      </section>
      <section>
        <h3>Składniki</h3>
        <ul>
          {ingredientList}
        </ul>
      </section>
      <section>
        <h3>Przygotowanie</h3>
        {instructions}
      </section>
    </div>
  )
}

export default Recipes;