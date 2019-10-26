import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from '@material-ui/icons/Delete';

let styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-3.5px",
    '&:hover svg' : {
      color: 'white',
      transform: 'scale(1.2)'
    }
  }, boxContent : {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: 'flex',
    justifyContent: 'space-between'
  }, deleteIcon : {
    color: 'rgba(0,0,0,0.5)',
    transition: 'all 0.3s ease-in-out'
  }
};

class NewColorBox extends Component {
  render() {
    let {classes} = this.props;
    return (
      <div
        className={classes.root}
        style={{ backgroundColor: this.props.color }}
      >
        <div className={classes.boxContent}>
          <span>{this.props.name}</span>
          <DeleteIcon className={classes.deleteIcon}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NewColorBox);
