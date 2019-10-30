import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import styles from './styles/PaletteListStyles'
import {Link} from 'react-router-dom';
class PaletteList extends Component {
  goToPalette(id){
    this.props.history.push(`/palette/${id}`)
  }
  render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h2 className={classes.title}>Color Picker</h2>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {this.props.palettes.map(palette => (
              <MiniPalette {...palette} removePalette={this.props.removePalette} handleClick={() => this.goToPalette(palette.id)} key={palette.id}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
