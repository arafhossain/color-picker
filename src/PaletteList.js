import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import styles from './styles/PaletteListStyles'
class PaletteList extends Component {
  goToPalette(id){
    console.log('Click!')
    this.props.history.push(`/palette/${id}`)
  }
  render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}></nav>
          <div className={classes.palettes}>
            {this.props.palettes.map(palette => (
              <MiniPalette {...palette} handleClick={() => this.goToPalette(palette.id)}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
