import React, { Component } from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import "rc-slider/assets/index.css";
import "./NavBar.css";

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {colorFormat : 'hex'};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt){
    this.setState({ colorFormat: evt.target.value})
    this.props.handleChange(evt.target.value);
  }
  render() {
    return (
      <header className="NavBar">
        <div className="logo">
          <a href="#">reactcolorpicker</a>
        </div>
        <div className="slider-container">
          <span>Level: {this.props.level}</span>
          <div className="slider">
            <Slider
              defaultValue={this.props.level}
              min={100}
              max={900}
              step={100}
              onAfterChange={this.props.changeLevel}
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={this.state.colorFormat} onChange={this.handleChange}>
            <MenuItem value="hex">'Hex'</MenuItem>
            <MenuItem value="rgb">'RGB'</MenuItem>
            <MenuItem value="rgba">'RGBA'</MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}

export default NavBar;
