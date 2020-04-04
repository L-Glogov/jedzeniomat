import React from 'react';
import AddIngredients from './AddIngredients';
import styles from './Recipes.module.css';

const Recipes = ( props ) => {

  const recipeNames = props.recipeList.map((item, index) => {
    return (
      <li onClick={props.recipeChoose.bind(this, index)} key={item.name} className={styles.recRow}>
        {item.name}
      </li>
    )
  })

  const recipeInd = props.recipeList.findIndex(item => item.name === props.internals.chosenRecipe);
  let ingredientList;
  let instructions;
  if (recipeInd >= 0) {
    ingredientList = props.recipeList[recipeInd].ingredients.map((item) => {
      const name = item.name.length > 20 ? item.name.slice(0, 21).concat('...	\u00a0 \u00a0 \u00a0') : item.name.concat(': \u00a0');
      return (
        <li key={item.name}>{name} {item.quantity} {item.unit}</li>
      )
    })

    instructions = <div className={styles.insCont}>
      <div className={styles.insText}>
        <p>{props.recipeList[recipeInd].instructions}</p>
      </div>
      <p className={styles.insPort}>Liczba porcji: {props.recipeList[recipeInd].portions}</p>
      <div className={styles.recFoot}>
        <button onClick={props.modify.bind(this, recipeInd)}>Edytuj</button>
        <button onClick={props.remove.bind(this, recipeInd)}>Usuń</button>
      </div>
    </div>


  }

  return (
    <main className={styles.mainCont}>
      <div className={styles.recListCont}>
        <h2>Lista przepisów</h2>
        <ul className={styles.recList}>
          {recipeNames}
        </ul>
        <button onClick={props.addNew}>Dodaj przepis</button>
      </div>
      <div className={styles.recShowCont}>
        <h2>
          {props.internals.addRecipeToggle 
          ? <input  
              type="text" 
              name="newRecipeNameInput" 
              onChange={props.inputHandler} 
              value={props.internals.newRecipeNameInput}
              placeholder="Nazwa" 
            /> 
          : props.internals.chosenRecipe}
        </h2>
        <div className={styles.ing}>
          <h3>
            {props.internals.chosenRecipe === '' 
            && props.internals.addRecipeToggle === false 
            && props.internals.editRecipeToggle === false ? '' : 'Składniki'}
          </h3>
          {props.internals.addRecipeToggle  
          ? <AddIngredients 
              internals={props.internals} 
              addRecipeIng={props.addRecipeIng}
              modifyIng={props.modifyIng}
              inputHandler={props.inputHandler} 
              rmvIng = {props.rmvIng}  
            />
          : <ul className={styles.ingList} >{ingredientList}</ul>}
        </div>
        <div className={styles.instr}>
          <h3>
            {props.internals.chosenRecipe === '' 
            && props.internals.addRecipeToggle === false 
            && props.internals.editRecipeToggle === false ? '' : 'Przygotowanie'}
          </h3>
          {props.internals.addRecipeToggle  
          ? <div className={styles.instInputs}>
              <textarea 
                placeholder="Tu wpisz instrukcje przygotowania." 
                name="tempAddInst" 
                value={props.internals.tempAddInst} 
                onChange={props.inputHandler}
              />
              <div className={styles.portDiv}>
                <label htmlFor="recPortInput">Liczba porcji:</label>
                <input 
                  type="number" 
                  name="newRecipePortInput" 
                  onChange={props.inputHandler} 
                  value={props.internals.newRecipePortInput} 
                  id="recPortInput"
                />
              </div>
              <div className={styles.saveDiv}>
                <button onClick={props.save}>Zapisz</button>
                <button onClick={props.discard}>Odrzuć zmiany</button>
              </div>
            </div>
          : instructions}
        </div>
      </div>
      {/* <button onClick={props.saveData}>Zapisz zmiany</button> */}
    </main>
  )
}

export default Recipes;