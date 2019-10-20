import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from './NavBar'
import "./Palette.css";
class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
    this.changeLevel = this.changeLevel.bind(this);
  }
  changeLevel(newLevel) {
    this.setState({
      level: newLevel
    });
  }
  render() {
    let colorBoxes = this.props.palette.colors[this.state.level].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className="Palette">
        <NavBar level={this.state.level} changeLevel={this.changeLevel}/>
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default Palette;
