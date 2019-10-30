import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";
class MiniPalette extends Component {
  constructor(props){
    super(props);
    this.state = {}
    this.deletePalette = this.deletePalette.bind(this);
  }
  deletePalette(event){
    event.stopPropagation();
    this.props.removePalette(this.props.id)
  }
  render() {
    let { classes, paletteName, emoji, colors } = this.props;
    let miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));
    return (
      <div className={classes.root} onClick={this.props.handleClick}>
        <div className={classes.delete}>
          <DeleteIcon className={classes.deleteIcon} onClick={this.deletePalette}/>
        </div>
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName}
          <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
