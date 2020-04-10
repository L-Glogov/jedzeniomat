import React, { Component, Fragment } from 'react';
import Layout from './components/Layout/Layout';
import Fridge from './components/Fridge/Fridge';
import Recipes from './components/Recipes/Recipes';
import Menu from './components/Menu/Menu';
import SelectContext from './context/selectContext';
import { addDays } from 'date-fns';
import Axios from 'axios';
import produce from 'immer';

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
      modalShown: false
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
      menuRecSelect: 'Wybierz przepis',
      currentDay: 1
    },
    currentDisplay: 'home',
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

  
  // ----------Multi-Component Methods--------------

  saveData = () => {
    const post = {
      "recipes": this.state.recipes,
      "fridge": this.state.fridge
    }
    console.log("will post now");
    Axios.post('http://localhost:3000/db-state', post)
      .catch(error => {
        console.error(error);
        alert("Network error: Failed to save data to database");
      })
  }

  saveUpdatedStateData = (draft) => {
    console.log(JSON.parse(JSON.stringify(draft.recipes)));
    const post = {
      "recipes": JSON.parse(JSON.stringify(draft.recipes)),
      "fridge": JSON.parse(JSON.stringify(draft.fridge))
    }
    Axios.post('http://localhost:3000/db-state', post)
      .catch(error => {
        console.error(error);
        alert("Network error: Failed to save data to database");
      })
  }

  // ----------Fridge Methods--------------

  fridgeAddRemHandler = (amount, index) => {
    this.setState(
      produce(draft => {
        draft.fridge[index].quantity += amount;
        if (draft.fridge[index].quantity < 0) {
          draft.fridge[index].quantity = 0;
        }
      })
    )
  }

  fridgeModifyHandler = (amount, index) => {
    this.setState(
      produce(draft => {
         draft.fridge[index].quantity = parseInt(amount);
      })
    )
  }

  fridgeModifyAmtInputHandler = (index, e) => {
    let amt = e.target.value;
    this.setState(
      produce(draft => {
        draft.fridge[index].modifyAmount = amt;
      })
    )
  }

  fridgeRemoveHandler = (index) => {
    this.setState(
      produce(draft => {
        draft.fridge.splice(index, 1);
      })
    )
  }

  fridgeInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      produce(draft => {
        draft.fridgeInternal[name] = value;
      })
    )
  }

  fridgeAddItemHandler = () => {
    const name = this.state.fridgeInternal.fridgeNameInput;
    const quantity = this.state.fridgeInternal.fridgeQuantityInput;
    const repeatedItem = this.state.fridge.some(item => item.name.toUpperCase() === name.toUpperCase());
    if (repeatedItem) return alert("Składnik już jest na stanie");

    if (name !== '' && quantity !== '') {
      this.setState(
        produce(draft => {
          draft.fridge.push({
            name: name.toUpperCase(),
            quantity: parseInt(quantity),
            unit: this.state.fridgeInternal.selectUnitInput,
            modifyAmount: 0
          })
          draft.fridgeInternal.fridgeNameInput = '';
          draft.fridgeInternal.fridgeQuantityInput = '';
          draft.fridgeInternal.selectUnitInput = "szt.";
        })
      )
    } 
  }

  

  // ----------Recipes Methods --------------

  recipesModalCheckToggle = () => {
    this.setState(
      produce(draft => {
        draft.recipesInternal.modalShown = !draft.recipesInternal.modalShown;
      })
    )
  }
  
  recipesRemoveHandler = (index) => {
    this.setState(
      produce(draft => {
        draft.recipes.splice(index, 1);
        this.saveUpdatedStateData(draft);
        draft.recipesInternal.modalShown = !draft.recipesInternal.modalShown;
      })
    )
  }

  recipesChooseHandler = (index) => {
    this.setState(
      produce(draft => {
        draft.recipesInternal.addRecipeToggle = false;
        draft.recipesInternal.chosenRecipe = draft.recipes[index].name;
        draft.recipesInternal.editName = draft.recipes[index].name;
      })
    )
  }

  recipesAddIngHandler = () => {
    const name = this.state.recipesInternal.addRecIngNameInput;
    const quantity = this.state.recipesInternal.addRecIngQuantityInput;
    const repeatedItem = this.state.recipesInternal.tempAddIngs.some(item => item.name.toUpperCase() === name.toUpperCase());
    if (repeatedItem) return alert("Składnik już został dodany");

    if (name !== '') {
      this.setState(
        produce(draft => {
          draft.recipesInternal.tempAddIngs.push({
            name: name.toUpperCase(),
            quantity: parseInt(quantity),
            unit: this.state.recipesInternal.selectUnitInput,
            modifyAmount: 0
          })
          draft.recipesInternal.addRecIngNameInput = '';
          draft.recipesInternal.addRecIngQuantityInput = 1;
        })
      )
    }
  }

  recipesRemoveIngHandler = (index) => {
    this.setState(
      produce(draft => {
        draft.recipesInternal.tempAddIngs.splice(index, 1);
      })
    )
  }

  recipesModifyIngHandler = (index, name, quantity, unit) => {
    this.setState(
      produce(draft => {
        draft.recipesInternal.addRecIngNameInput = name;
        draft.recipesInternal.addRecIngQuantityInput = quantity;
        draft.recipesInternal.selectUnitInput = unit;
        draft.recipesInternal.tempAddIngs.splice(index, 1);
      })
    )
  }

  recipesInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      produce(draft => {
        draft.recipesInternal[name] = value;
      })
    )
  }

  recipesModifyHandler = (index) => {
    this.setState(
      produce(draft => {
        draft.recipesInternal.addRecipeToggle = true;
        draft.recipesInternal.editRecipeToggle = true;
        draft.recipesInternal.chosenRecipe = '';
        draft.recipesInternal.editName = draft.recipes[index].name;
        draft.recipesInternal.newRecipeNameInput = draft.recipes[index].name;
        draft.recipesInternal.newRecipePortInput = draft.recipes[index].portions;
        draft.recipesInternal.tempAddIngs = draft.recipes[index].ingredients;
        draft.recipesInternal.tempAddInst = draft.recipes[index].instructions;
      })
    )
  }

  recipesAddNewToggle = () => {
    this.setState(
      produce(draft => {
        draft.recipesInternal.addRecipeToggle = true;
        draft.recipesInternal.editRecipeToggle = false;
        draft.recipesInternal.chosenRecipe = '';
        draft.recipesInternal.editName = '';
        draft.recipesInternal.newRecipeNameInput = '';
        draft.recipesInternal.newRecipePortInput = 1;
        draft.recipesInternal.tempAddIngs = [];
        draft.recipesInternal.tempAddInst = '';
      })
    )
  }

  recipesClearChangesAux = (draft) => {
    draft.recipesInternal.addRecipeToggle = false;
    draft.recipesInternal.editRecipeToggle = false;
    draft.recipesInternal.addRecIngNameInput = '';
    draft.recipesInternal.addRecIngQuantityInput = 1;
    draft.recipesInternal.newRecipeNameInput = '';
    draft.recipesInternal.newRecipePortInput = 1;
    draft.recipesInternal.editName = '';
    draft.recipesInternal.tempAddIngs = [];
    draft.recipesInternal.tempAddInst = '';
  }

  recipesSaveHandler = () => {
    this.setState(
      produce(draft => {
        if (draft.recipesInternal.editRecipeToggle) {
          const modInd = draft.recipes.findIndex(item => item.name === draft.recipesInternal.editName);
          draft.recipes.splice(modInd, 1);
        } 
        draft.recipes.push({
          name: draft.recipesInternal.newRecipeNameInput,
          portions: draft.recipesInternal.newRecipePortInput,
          ingredients: draft.recipesInternal.tempAddIngs,
          instructions: draft.recipesInternal.tempAddInst
        });
        this.saveUpdatedStateData(draft);
        this.recipesClearChangesAux(draft);
      })
    )
  }

  recipesDiscardHandler = () => {
    this.setState(
      produce(draft => {
        return this.recipesClearChangesAux(draft); 
      })
    )
  }

  // ----------Menu Methods --------------

  menuInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      produce(draft => {
        draft.menuInternal[name] = value;
      })
    )
  }

  menuDateHandler = async (date) => {
    this.setState(
      produce(draft => {
        draft.menu.startDate = date;
        draft.menu.recipes = [{
            date: date,
            dayNum: 1,
            recList: []
        }];
        for(let n = 1; n < draft.menu.numDays; n++) {
          draft.menu.recipes.push({
            date: addDays(date, n),
            dayNum: 1 + n,
            recList: []
          });
        }
        draft.menuInternal.currentDay = 1;
      })
    )
  }


  menuNumDaysHandler = (e) => {
    const value = parseInt(e.target.value);
    this.setState(
      produce(draft => {
        const curNumDays = draft.menu.numDays;
        if (value > curNumDays) {
          for(let n = 1; n <= value - curNumDays; n++) {
            draft.menu.recipes.push({
              date: addDays(draft.menu.startDate, curNumDays + n - 1),
              dayNum: curNumDays + n,
              recList: []
            });
          }
        } else if (value < curNumDays) {
          if (value < draft.menuInternal.currentDay) {
            draft.menuInternal.currentDay = 1;
          }
          draft.menu.recipes.splice(value);
        }
        draft.menu.numDays = value;
      })
    )
  }
  
  menuAddRecHandler = () => {
    this.setState(
      produce(draft => {
        if (draft.menuInternal.menuRecSelect === 'Wybierz przepis') {
          return alert("Wybierz przepis!");
        }
        const dayInd = draft.menu.recipes.findIndex(item => item.dayNum === draft.menuInternal.currentDay);
        draft.menu.recipes[dayInd].recList.push({
          name: draft.menuInternal.menuRecSelect,
          portions: draft.menuInternal.menuNumPortInput
        });
      })
    )
  }

  menuRmvRecHandler = (index, dayInd) => {
    this.setState(
      produce(draft => {
        draft.menu.recipes[dayInd].recList.splice(index, 1);
      })
    )
  }

  menuNextDayHandler = () => {
    this.setState(
      produce(draft => {
        if (draft.menuInternal.currentDay < draft.menu.numDays) {
          draft.menuInternal.currentDay++;
        }
      })
    )
  }

  menuGoToDayHandler = (e) => {
    const value = e.target.value;
    this.setState(
      produce(draft => {
        draft.menuInternal.currentDay = parseInt(value);
      })
    )
  }

  // ----------Layout Methods --------------

  layoutDisplay = (display) => {
    this.setState({
      currentDisplay: display
    })
  }

  render() {
    return (
      <Fragment>
        <SelectContext.Provider value={{units: this.state.units}}>
          <Layout layoutDisplay={this.layoutDisplay} display={this.state.currentDisplay} >
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
                saveData={this.saveData}
              /> : null
            }
            {(this.state.currentDisplay === "recipes") ? 
              <Recipes
                recipeList={this.state.recipes}
                internals={this.state.recipesInternal}
                remove={this.recipesRemoveHandler}
                check={this.recipesModalCheckToggle}
                modify={this.recipesModifyHandler}
                recipeChoose={this.recipesChooseHandler}
                addRecipeIng={this.recipesAddIngHandler}
                modifyIng={this.recipesModifyIngHandler}
                inputHandler={this.recipesInputHandler}
                rmvIng={this.recipesRemoveIngHandler}
                addNew={this.recipesAddNewToggle}
                save={this.recipesSaveHandler}
                discard={this.recipesDiscardHandler}
                saveData={this.saveData}
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
      </Fragment>
    );
  }
}

export default App;
