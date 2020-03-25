import React, { Fragment } from 'react';

const Fridge = ( props ) => {
  const supplies = props.supplies.map((item, index) => {
    
    let amount;
    let step;
    switch(item.unit) {
      case "szt":
        amount = 1;
        step = 1;
        break;
      case "gram":
        amount = 100;
        step = 500;
        break;
      case "ml":
        amount = 100;
        step = 500;
        break;
      default:
        amount = 1;
        step = 1;
    }
  
    return (
      <tr key={item.name.toUpperCase()}>
        <td>{item.name.toUpperCase()}</td>
        <td>{item.quantity} {item.unit}</td>
        <td>
          <button onClick={props.addRem.bind(this, amount, index)}>+</button>
          <button onClick={props.addRem.bind(this, -amount, index)}>-</button>
        </td>
        <td>
          <input 
            type='number' 
            min={0} 
            step={step}
            placeholder='Wpisz nowy stan ilościowy'
            onChange={(e) => props.modifyAmtInput(index, e)}
          />
          <button onClick={props.modify.bind(this, item.modifyAmount, index)}>Zmień</button>
        </td>
        <td>
          <button onClick={props.remove.bind(this, index)}>X</button>
        </td>
      </tr>
    )
  });

  return(
    <Fragment>
      <table>
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Ilość</th>
          <th>Dodaj/Odejmij</th>
          <th>Zmień</th>
          <th>Usuń</th>
        </tr>
      </thead>
      <tbody>
        {supplies}
      </tbody>
      <tfoot>
        <tr>
          <td>Dodaj Składniki</td>
        </tr>
        <tr>
          <td>Nazwa</td>
          <td>Ilość</td>
          <td>Jednostka</td>
          <td>Dodaj</td>
        </tr>
        <tr>
          <td>
            <input type="text" id="fridgeAddItemName" />
          </td>
          <td>
            <input type="number" id="fridgeAddItemQuantity" min={0} />
          </td>
          <td>
            <select id="fridgeAddItemUnit">
              <option value="szt.">szt.</option>
              <option value="ml">ml</option>
              <option value="l.">l.</option>
              <option value="gram">gram</option>
              <option value="kg">kg</option>
            </select>
          </td>
          <td>
            <button onClick={props.addItem}>Dodaj</button>
          </td>
        </tr>
      </tfoot>         
    </table>
    </Fragment>
  )
}

export default Fridge;