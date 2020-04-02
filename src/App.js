import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Fridge from './components/Fridge/Fridge';
import Recipes from './components/Recipes/Recipes';
import Menu from './components/Menu/Menu';
import SelectContext from './context/selectContext';
import { addDays } from 'date-fns';
import Axios from 'axios';

Axios.defaults.headers.post['Content-Type'] = 'application/json';

class App extends Component {
  state = {
    fridge: [],
    recipes: [],
    units: [
      "szt.",
      "gram",
      "ml"
    ],
    fridgeInternal: {
      fridgeNameInput: '',
      fridgeQuantityInput: '',
      selectUnitInput: 'szt.'
    },
    recipesInternal: {
      addRecipeToggle: false,
      editRecipeToggle: false,
      chosenRecipe: '',
      addRecIngNameInput: '',
      addRecIngQuantityInput: 1,
      newRecipeNameInput: '',
      newRecipePortInput: 1,
      editName: '',
      selectUnitInput: 'szt.',
      tempAddIngs: [],
      tempAddInst: '',
    },
    menu: {
      startDate: new Date(),
      numDays: 1,
      recipes: [
        {
          date: new Date(),
          dayNum: 1,
          recList: []
        }
      ]
    },
    menuInternal: {
      menuNumPortInput: 1,
      menuRecSelect: '--Wybierz przepis--',
      currentDay: 1
    },
    currentDisplay: '',
    shouldLoadExtData: true
  }

componentDidMount() {
  if (this.state.shouldLoadExtData) {
    Axios.get('http://localhost:3000/db-state')
      .then(res => {
        this.setState({
          recipes: res.data.recipes,
          fridge: res.data.fridge,
          shouldLoadExtData: false
        })
      })
      .catch(error => {
        console.error(error); 
        alert("Network error: The database failed to load.");
      }) 
  }
}

saveDataHandler = () => {
  const post = {
    "recipes": this.state.recipes,
    "fridge": this.state.fridge
  }
  Axios.post('http://localhost:3000/db-state', post)
    .catch(error => {
      console.error(error);
      alert("Network error: Failed to save data to database");
    })
}

  // ----------Fridge Methods--------------

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

  fridgeModifyAmtInputHandler = (index, e) => {
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

  fridgeInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => {
      const updatedState = {...prevState};
      updatedState.fridgeInternal[name] = value;
      return updatedState;
    })
  }

  fridgeAddItemHandler = () => {
    const name = this.state.fridgeInternal.fridgeNameInput;
    const quantity = this.state.fridgeInternal.fridgeQuantityInput;
    const repeatedItem = this.state.fridge.some(item => item.name.toUpperCase() === name.toUpperCase());
    if (repeatedItem) return alert("Składnik już jest na stanie");

    if (name !== '' && quantity !== '') {
      this.setState((prevState) => {
        const updatedState = {...prevState};
        updatedState.fridge.push({
          name: name.toUpperCase(),
          quantity: parseInt(quantity),
          unit: this.state.fridgeInternal.selectUnitInput,
          modifyAmount: 0
        })
        return updatedState;
      })
    }
    
  }

  

  // ----------Recipes Methods --------------

  recipesRemoveHandler = (index) => {
    this.setState((prevState) => {
      const updatedState = {...prevState};
      updatedState.recipes.splice(index, 1);
      return updatedState;
    })
  }

  recipesChooseHandler = (index) => {
    this.setState((prevState) => {
      const updatedState = {...prevState};
      updatedState.recipesInternal.addRecipeToggle = false;
      updatedState.recipesInternal.chosenRecipe = prevState.recipes[index].name;
      updatedState.recipesInternal.editName = prevState.recipes[index].name;
      return updatedState;
    })
  }

  recipesAddIngHandler = () => {
    const name = this.state.recipesInternal.addRecIngNameInput;
    const quantity = this.state.recipesInternal.addRecIngQuantityInput;
    const repeatedItem = this.state.recipesInternal.tempAddIngs.some(item => item.name.toUpperCase() === name.toUpperCase());
    if (repeatedItem) return alert("Składnik już został dodany");

    if (name !== '') {
      this.setState((prevState) => {
        const updatedState = {...prevState};
        updatedState.recipesInternal.tempAddIngs.push({
          name: name.toUpperCase(),
          quantity: parseInt(quantity),
          unit: this.state.recipesInternal.selectUnitInput,
          modifyAmount: 0
        })
        return updatedState;
      })
    }
  }

  recipesRemoveIngHandler = (index) => {
    this.setState((prevState) => {
      const updatedState = {...prevState};
      updatedState.recipesInternal.tempAddIngs.splice(index, 1);
      return updatedState;
    })
  }

  recipesInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => {
      const updatedState = {...prevState};
      updatedState.recipesInternal[name] = value;
      return updatedState;
    })
  }

  recipesModifyHandler = (index) => {
    this.setState(prevState => {
      const updatedState = {...prevState};
      updatedState.recipesInternal.addRecipeToggle = true;
      updatedState.recipesInternal.editRecipeToggle = true;
      updatedState.recipesInternal.chosenRecipe = '';
      updatedState.recipesInternal.editName = prevState.recipes[index].name;
      updatedState.recipesInternal.newRecipeNameInput = prevState.recipes[index].name;
      updatedState.recipesInternal.newRecipePortInput = prevState.recipes[index].portions;
      updatedState.recipesInternal.tempAddIngs = prevState.recipes[index].ingredients;
      updatedState.recipesInternal.tempAddInst = prevState.recipes[index].instructions;
      return updatedState;
    })
  }

  recipesAddNewToggle = () => {
    this.setState(prevState => {
      const updatedState = {...prevState};
      updatedState.recipesInternal.addRecipeToggle = true;
      updatedState.recipesInternal.editRecipeToggle = false;
      updatedState.recipesInternal.chosenRecipe = '';
      updatedState.recipesInternal.editName = '';
      updatedState.recipesInternal.newRecipeNameInput = '';
      updatedState.recipesInternal.newRecipePortInput = 1;
      updatedState.recipesInternal.tempAddIngs = [];
      updatedState.recipesInternal.tempAddInst = '';
      return updatedState;
    })
  }

  recipesClearChangesAux = (updatedState) => {
    updatedState.recipesInternal.addRecipeToggle = false;
    updatedState.recipesInternal.editRecipeToggle = false;
    updatedState.recipesInternal.addRecIngNameInput = '';
    updatedState.recipesInternal.addRecIngQuantityInput = 1;
    updatedState.recipesInternal.newRecipeNameInput = '';
    updatedState.recipesInternal.newRecipePortInput = 1;
    updatedState.recipesInternal.editName = '';
    updatedState.recipesInternal.tempAddIngs = [];
    updatedState.recipesInternal.tempAddInst = '';
    return updatedState;
  }

  recipesSaveHandler = () => {
    this.setState(prevState => {
      const updatedState = {...prevState};
      if (prevState.recipesInternal.editRecipeToggle) {
        const modInd = updatedState.recipes.findIndex(item => item.name === prevState.recipesInternal.editName);
        updatedState.recipes.splice(modInd, 1);
      } 
      updatedState.recipes.push({
        name: prevState.recipesInternal.newRecipeNameInput,
        portions: prevState.recipesInternal.newRecipePortInput,
        ingredients: prevState.recipesInternal.tempAddIngs,
        instructions: prevState.recipesInternal.tempAddInst
      });
      return this.recipesClearChangesAux(updatedState);
    })
  }

  recipesDiscardHandler = () => {
    this.setState(prevState => {
      const updatedState = {...prevState};
      return this.recipesClearChangesAux(updatedState); 
    })
  }

  // ----------Menu Methods --------------

  menuInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => {
      const updatedState = {...prevState};
      updatedState.menuInternal[name] = value;
      return updatedState;
    })
  }

  menuDateHandler = (date) => {
    this.setState(prevState => {
      const updatedState = {...prevState};
      updatedState.menu.startDate = date;
      updatedState.menu.recipes = [{
          date: date,
          dayNum: 1,
          recList: []
      }];
      for(let n = 1; n < prevState.menu.numDays; n++) {
        updatedState.menu.recipes.push({
          date: addDays(date, n),
          dayNum: 1 + n,
          recList: []
        });
      }
      updatedState.menuInternal.currentDay = 1;
      return updatedState;
    })
  }

  menuNumDaysHandler = (e) => {
    const value = parseInt(e.target.value);
    this.setState((prevState) => {
      const updatedState = {...prevState};
      const curNumDays = prevState.menu.numDays;
      if (value > curNumDays) {
        for(let n = 1; n <= value - curNumDays; n++) {
          updatedState.menu.recipes.push({
            date: addDays(prevState.menu.startDate, curNumDays + n - 1),
            dayNum: curNumDays + n,
            recList: []
          });
        }
      } else if (value < curNumDays) {
        if (value < updatedState.menuInternal.currentDay) {
          updatedState.menuInternal.currentDay = 1;
        }
        updatedState.menu.recipes.splice(value);
      }
      updatedState.menu.numDays = value;
      
      return updatedState;
    })
  }
  
  menuAddRecHandler = () => {
    this.setState((prevState) => {
      if (prevState.menuInternal.menuRecSelect === '--Wybierz przepis--') {
        return alert("Wybierz przepis!");
      }
      const updatedState = {...prevState};
      const dayInd = updatedState.menu.recipes.findIndex(item => item.dayNum === updatedState.menuInternal.currentDay);
      updatedState.menu.recipes[dayInd].recList.push({
        name: prevState.menuInternal.menuRecSelect,
        portions: prevState.menuInternal.menuNumPortInput
      });
      return updatedState;
    })
  }

  menuRmvRecHandler = (index, dayInd) => {
    this.setState((prevState) => {
      const updatedState = {...prevState};
      updatedState.menu.recipes[dayInd].recList.splice(index, 1);
      return updatedState;
    })
  }

  menuNextDayHandler = () => {
    this.setState(prevState => {
      const updatedState = {...prevState};
      if (prevState.menuInternal.currentDay < prevState.menu.numDays) {
        updatedState.menuInternal.currentDay++;
      }
      return updatedState;
    })
  }

  menuGoToDayHandler = (e) => {
    const value = e.target.value;
    this.setState(prevState => {
      const updatedState = {...prevState};
      updatedState.menuInternal.currentDay = parseInt(value);
      return updatedState;
    })
  }

  // ----------Layout Methods --------------

  layoutDisplay = (display) => {
    this.setState({
      currentDisplay: display
    })
  }

  render() {
    return (
      <div>
        <SelectContext.Provider value={{units: this.state.units}}>
          <Layout layoutDisplay={this.layoutDisplay}>
            {(this.state.currentDisplay === "fridge") ? 
              <Fridge 
                supplies={this.state.fridge} 
                internals={this.state.fridgeInternal}
                addRem={this.fridgeAddRemHandler}
                modify={this.fridgeModifyHandler}
                modifyAmtInput={this.fridgeModifyAmtInputHandler}
                remove={this.fridgeRemoveHandler}
                addItem={this.fridgeAddItemHandler}
                inputHandler={this.fridgeInputHandler}
                saveData={this.saveDataHandler}
              /> : null
            }
            {(this.state.currentDisplay === "recipes") ? 
              <Recipes
                recipeList={this.state.recipes}
                internals={this.state.recipesInternal}
                remove={this.recipesRemoveHandler}
                modify={this.recipesModifyHandler}
                recipeChoose={this.recipesChooseHandler}
                addRecipeIng={this.recipesAddIngHandler}
                inputHandler={this.recipesInputHandler}
                rmvIng={this.recipesRemoveIngHandler}
                addNew={this.recipesAddNewToggle}
                save={this.recipesSaveHandler}
                discard={this.recipesDiscardHandler}
                saveData={this.saveDataHandler}
              /> : null
            }
            {(this.state.currentDisplay === "menu") ? 
              <Menu 
                menu={this.state.menu}
                recipeList={this.state.recipes}
                supplies={this.state.fridge}
                internals={this.state.menuInternal}
                inputHandler={this.menuInputHandler}
                dateChg={this.menuDateHandler}
                numDaysChg={this.menuNumDaysHandler}
                addRec={this.menuAddRecHandler}
                rmvRec={this.menuRmvRecHandler}
                nextDay={this.menuNextDayHandler}
                goToDay={this.menuGoToDayHandler}
              /> : null
            }
          </Layout>
        </SelectContext.Provider>
        
      </div>
    );
  }
}

export default App;
