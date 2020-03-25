import React, {useContext} from 'react';
import selectContext from '../../context/selectContext';

const SelectUnit = () => {
  
  const selectCtx = useContext(selectContext);
  const unitList = selectCtx.units.map(item => {
    return (
      <option value={item}>{item}</option>
    )
  })

  return (
    <select>
      {unitList}
    </select>
  )
}

export default SelectUnit;