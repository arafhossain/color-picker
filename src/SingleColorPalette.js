import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

let styles = {
  palette: {
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  paletteColors: {
    height: "90%"
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    marginBottom: "-3.5px",
    background: "black",
    position: "relative",
    opacity: "1",
    "& a": {
      color: 'white',
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none",
    }
  }
};
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
        key={color.name}
        name={color.name}
        background={color[this.state.colorFormat]}
        showMore={false}
      />
    ));
    return (
      <div className={this.props.classes.palette}>
        <NavBar handleChange={this.changeFormat} showSlider={false} />
        <div className={this.props.classes.paletteColors}>
          {colorBoxes}
          <div className={this.props.classes.goBack}>
            <Link
              to={`/palette/${this.props.palette.id}`}
            >
              Go back
            </Link>
          </div>
        </div>
        <PaletteFooter
          emoji={this.props.palette.emoji}
          name={this.props.palette.paletteName}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
