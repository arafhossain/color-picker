import React, { Component } from "react";
import styles from "./styles/PaletteStyles";
import { withStyles } from "@material-ui/styles";

class SingleFooter extends Component {
  render() {
    let { classes, name, emoji } = this.props;
    return (
      <footer className={classes.paletteFooter}>
        {name}
        <span className={classes.emoji}>{emoji}</span>
      </footer>
    );
  }
}

export default withStyles(styles)(SingleFooter);
