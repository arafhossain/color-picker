import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import NewColorBox from './NewColorBox'

 let NewColorBoxList = SortableContainer((props) => {
  return (
    <div style={{height: '100%'}}>
      {props.currentPalette.map((color, idx) => (
        <NewColorBox
          index = {idx}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => props.removeColor(color.name)}
        />
      ))}
    </div>
  );
});

export default NewColorBoxList;