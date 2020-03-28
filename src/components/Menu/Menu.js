import React, { Fragment } from 'react';
import DatePicker, { registerLocale }  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
registerLocale("pl", pl);

const Menu = ( props ) => {
  const dayInd = props.menu.recipes.findIndex(item => item.dayNum === props.internals.currentDay);
  const recipeList = props.menu.recipes[dayInd].recList.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.portions}</td>
        <td><button onClick={props.rmvRec.bind(this, index, dayInd)}>X</button></td>
      </tr>
    )
  })
  
  const recipeOptionList = props.recipeList.map(item => {
    return (
      <option value={item.name} key={item.name}>{item.name}</option>
    )
  })
  
  const dayList = props.menu.recipes.map(item => {
    const formatDate = format(item.date, "do LLL y",{
      locale: pl
    });
    return (
      <option value={item.dayNum} key={item.dayNum}>{formatDate}</option>
    )
  })

  return (
    <Fragment>
      <label>Data rozpoczęcia:</label>
      <DatePicker 
        selected={props.menu.startDate} 
        onChange={props.dateChg}
        locale="pl" 
      />
      <label>Liczba dni:</label>
      <input 
        type="number" 
        min="1"
        onChange={props.numDaysChg} 
        value={props.menu.numDays}  
      /> 
      <div>
        <h2>Wybrany Dzień</h2>
        <h2>Day 1</h2>
        <table>
          <thead>
            <tr>
              <td>Przepis</td>
              <td>Porcje</td>
              <td>Usuń</td>
            </tr>
          </thead>
          <tbody>
            {recipeList}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <select onChange={props.inputHandler} name="menuRecSelect"  value={props.internals.menuRecSelect}>
                  <option disabled>--Wybierz przepis--</option>
                  {recipeOptionList}
                </select>
              </td>
              <td>
                <label htmlFor="menuNumPortInput">Porcje: </label>
                <input
                type="number" 
                name="menuNumPortInput" 
                id="menuNumPortInput"
                min="1"
                onChange={props.inputHandler} 
                value={props.internals.menuNumPortInput}  
                />
              </td>
              <td>
                <button onClick={props.addRec}>Dodaj</button>
              </td>
            </tr>
          </tfoot>
        </table>
        <button onClick={props.nextDay}>Next Day</button>
        <label htmlFor="menuSelectDay">Wybierz dzień:</label>
        <select onChange={props.goToDay} name="menuSelectDay" value={props.internals.currentDay} id="menuSelectDay">
          {dayList}
        </select>
      </div>
    </Fragment>
    
  )
}

export default Menu;