import React from "react";
import {SortableElement} from 'react-sortable-hoc';
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";

let styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.2)"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between"
  },
  deleteIcon: {
    color: "rgba(0,0,0,0.5)",
    transition: "all 0.3s ease-in-out",
    cursor: 'pointer'
  }
};

let NewColorBox = SortableElement(props => { 
    let { classes, color, name, handleClick } = props;
    return (
      <div
        className={classes.root}
        style={{ backgroundColor: color }}
      >
        <div className={classes.boxContent}>
          <span>{name}</span>
          <DeleteIcon className={classes.deleteIcon} onClick={handleClick}/>
        </div>
      </div>
    );
})

export default withStyles(styles)(NewColorBox);
