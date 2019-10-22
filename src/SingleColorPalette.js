import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from './PaletteFooter'
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
    let colorBoxes = this.state.colors.map(color => (
      <ColorBox
        key={color.id}
        name={color.name}
        background={color[this.state.colorFormat]}
        showMore={false}
      />
    ));
    return (
      <div className="Palette">
        <NavBar handleChange={this.changeFormat} showSlider={false} />
        <div className="Palette-colors">{colorBoxes}</div>
        <PaletteFooter emoji={this.props.palette.emoji} name={this.props.palette.paletteName}/>
      </div>
    );
  }
}

export default SingleColorPalette;
