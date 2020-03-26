import React, {useContext} from 'react';
import selectContext from '../../context/selectContext';

const SelectUnit = ( props ) => {
  
  const selectCtx = useContext(selectContext);
  const unitList = selectCtx.units.map(item => {
    return (
      <option value={item} key={item}>{item}</option>
    )
  })

  return (
    <select onChange={props.inputHandler} name="selectUnitInput" value={props.selectUnitInput}>
      {unitList}
    </select>
  )
}

export default SelectUnit;