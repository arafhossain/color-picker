import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import "./Palette.css";
import PaletteFooter from "./PaletteFooter";
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
    let colorBoxes = this.props.palette.colors[this.state.level].map(color => (
      <ColorBox
        background={color[this.state.colorFormat]}
        name={color.name}
        key={color.id}
        id={color.id}
        paletteId={this.props.palette.id}
        showMore={true}
      />
    ));
    return (
      <div className="Palette">
        <NavBar
          level={this.state.level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showSlider={true}
        />
        <div className="Palette-colors">{colorBoxes}</div>
        <PaletteFooter
          name={this.props.palette.paletteName}
          emoji={this.props.palette.emoji}
        />
      </div>
    );
  }
}

export default Palette;
