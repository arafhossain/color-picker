import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";
class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorFormat: "hex",
      colors: this.getColors(this.props.palette, this.props.colorId)
    };
    this.changeFormat = this.changeFormat.bind(this);
  }
  getColors(palette, wantedColor) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === wantedColor)
      );
    }
    return shades.slice(1);
  }
  changeFormat(value) {
    this.setState({ colorFormat: value });
  }
  render() {
    let { palette, paletteColors, goBack } = this.props.classes;
    let { id, emoji, paletteName } = this.props.palette;
    let colorBoxes = this.state.colors.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[this.state.colorFormat]}
        showMore={false}
      />
    ));
    return (
      <div className={palette}>
        <NavBar handleChange={this.changeFormat} showSlider={false} />
        <div className={paletteColors}>
          {colorBoxes}
          <div className={goBack}>
            <Link to={`/palette/${id}`}>Go back</Link>
          </div>
        </div>
        <PaletteFooter emoji={emoji} name={paletteName} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
