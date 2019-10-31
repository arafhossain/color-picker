import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";
class MiniPalette extends PureComponent {
  constructor(props){
    super(props);
    this.state = {}
    this.recordPaletteId = this.recordPaletteId.bind(this);
  }
  recordPaletteId(event){
   event.stopPropagation();
  this.props.setId(this.props.id)
  }
  render() {
    let { classes, paletteName, emoji, colors } = this.props;
    console.log(paletteName);
    let miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));
    return (
      <div className={classes.root} onClick={() => this.props.handleClick(this.props.id)}>
        <div className={classes.delete}>
          <DeleteIcon className={classes.deleteIcon} onClick={this.recordPaletteId}/>
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
