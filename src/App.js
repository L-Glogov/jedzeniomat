import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import Fridge from './components/Fridge/Fridge';
import Recipes from './components/Recipes/Recipes';

class App extends Component {
  state = {
    fridge: [
      {
        name: "banan",
        quantity: 3,
        unit: "szt.",
        modifyAmount: 0
      },
      {
        name: "płatki owsiane",
        quantity: 1000,
        unit: "gram",
        modifyAmount: 0
      },
      {
        name: "masło orzechowe",
        quantity: 500,
        unit: "gram",
        modifyAmount: 0
      },
      {
        name: "ksylitol",
        quantity: 500,
        unit: "gram",
        modifyAmount: 0
      },
      {
        name: "mleko",
        quantity: 2000,
        unit: "ml",
        modifyAmount: 0
      },
      {
        name: "maliny mrożone",
        quantity: 300,
        unit: "gram",
        modifyAmount: 0
      },
      {
        name: "jogurt naturalny",
        quantity: 500,
        unit: "ml",
        modifyAmount: 0
      }
    ],
    recipes: [
      {
        name: "Koktajl Bananowy",
        ingredients: [
          {
            name: "banan",
            quantity: 1,
            unit: "szt."
          },
          {
            name: "płatki owsiane",
            quantity: 50,
            unit: "gram"
          },
          {
            name: "masło orzechowe",
            quantity: 15,
            unit: "gram"
          },
          {
            name: "ksylitol",
            quantity: 10,
            unit: "gram"
          },
          {
            name: "mleko",
            quantity: 250,
            unit: "ml"
          }
        ],
        portions: 1,
        instructions: "Składniki zmiksować na gładki koktajl w blenderze. Podawać najlepiej od razu po przygotowaniu"
      },
      {
        name: "Koktajl Malinowy",
        ingredients: [
          {
            name: "banan",
            quantity: 1,
            unit: "szt."
          },
          {
            name: "maliny mrożone",
            quantity: 250,
            unit: "gram"
          },
          {
            name: "jogurt naturalny",
            quantity: 125,
            unit: "ml"
          },
          {
            name: "ksylitol",
            quantity: 15,
            unit: "gram"
          },
          {
            name: "mleko",
            quantity: 500,
            unit: "ml"
          }
        ],
        portions: 2,
        instructions: "Wszystkie składniki umieścić w kielichu blendera i zmiksować na gładki koktajl."
      }
    ],
    chosenRecipe: ''
  }
  
  // ----------Fridge Handlers--------------

  fridgeAddRemHandler = (amount, index) => {
    this.setState((prevState) => {
      const updatedState = {...prevState};
      updatedState.fridge[index].quantity += amount;
      if (updatedState.fridge[index].quantity < 0) {
        updatedState.fridge[index].quantity = 0;
      }
      return updatedState;
    })
  }

  fridgeModifyHandler = (amount, index) => {
    this.setState((prevState) => {
      const updatedState = {...prevState};
      updatedState.fridge[index].quantity = parseInt(amount);
      return updatedState;
    })
  }

  fridgeModifyAmountInputHandler = (index, e) => {
    let amt = e.target.value;
    this.setState((prevState) => {
      const updatedState = {...prevState};
      updatedState.fridge[index].modifyAmount = amt;
      return updatedState;
    })
  }

  fridgeRemoveHandler = (index) => {
    this.setState((prevState) => {
      const updatedState = {...prevState};
      updatedState.fridge.splice(index, 1);
      return updatedState;
    })
  }

  fridgeAddItemHandler = () => {
    let name = document.getElementById("fridgeAddItemName").value;
    let quantity = document.getElementById("fridgeAddItemQuantity").value;
    let unit = document.getElementById("fridgeAddItemUnit").value;

    let repeatedItem = this.state.fridge.some(item => item.name.toUpperCase() === name.toUpperCase());
    if (repeatedItem) return alert("Składnik już jest na stanie");

    if (name !== '' && quantity !== '') {
      this.setState((prevState) => {
        const updatedState = {...prevState};
        updatedState.fridge.push({
          name: name.toUpperCase(),
          quantity: parseInt(quantity),
          unit: unit,
          modifyAmount: 0
        })
        return updatedState;
      })
    }
    
  }

// ----------Recipes Handlers--------------

recipesRemoveHandler = (index) => {
  this.setState((prevState) => {
    const updatedState = {...prevState};
    updatedState.recipes.splice(index, 1);
    return updatedState;
  })
}

recipesChooseHandler = (index) => {
  this.setState((prevState) => {
    return {
      chosenRecipe: prevState.recipes[index].name
    }
  })
}

  render() {
    return (
      <div>
        <Layout>
          {/* <Fridge 
            supplies={this.state.fridge} 
            addRem={this.fridgeAddRemHandler}
            modify={this.fridgeModifyHandler}
            modifyAmtInput={this.fridgeModifyAmountInputHandler}
            remove={this.fridgeRemoveHandler}
            addItem={this.fridgeAddItemHandler}
          /> */}
          <Recipes
            recipeList={this.state.recipes}
            remove={this.recipesRemoveHandler}
            recipeChoose={this.recipesChooseHandler}
            chosenRecipe={this.state.chosenRecipe}
          />
        </Layout>
      </div>
    );
  }
}

export default App;
