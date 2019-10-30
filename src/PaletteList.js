import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
class PaletteList extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
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
            <TransitionGroup className={classes.palettes}>
              {this.props.palettes.map(palette => (
                <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                  <MiniPalette
                    {...palette}
                    removePalette={this.props.removePalette}
                    handleClick={() => this.goToPalette(palette.id)}
                    key={palette.id}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
