import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";
class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, colorFormat: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeLevel(newLevel) {
    this.setState({
      level: newLevel
    });
  }
  changeFormat(value) {
    this.setState({ colorFormat: value });
  }
  render() {
    let { palette, classes } = this.props;
    let { level, colorFormat } = this.state;
    let colorBoxes = palette.colors[level].map(color => (
      <ColorBox
        background={color[colorFormat]}
        name={color.name}
        key={color.id}
        id={color.id}
        paletteId={palette.id}
        showMore={true}
      />
    ));
    return (
      <div className={classes.palette}>
        <NavBar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showSlider={true}
        />
        <div className={classes.paletteColors}>{colorBoxes}</div>
        <PaletteFooter name={palette.paletteName} emoji={palette.emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
