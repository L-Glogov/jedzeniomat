import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import Fridge from './components/Fridge/Fridge';

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
        name: "mrożone maliny",
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
  }
  
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

  render() {
    return (
      <div>
        <Layout>
          <Fridge 
            supplies={this.state.fridge} 
            addRem={this.fridgeAddRemHandler}
            modify={this.fridgeModifyHandler}
            modifyAmtInput={this.fridgeModifyAmountInputHandler}
            remove={this.fridgeRemoveHandler}
            addItem={this.fridgeAddItemHandler}
          />
        </Layout>
      </div>
    );
  }
}

export default App;
