import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/SnackBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "rc-slider/assets/index.css";
import { withStyles } from "@material-ui/styles";
import styles from './styles/NavBarStyles.js'
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { colorFormat: "hex", open: false };
    this.handleChange = this.handleChange.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
  }
  handleChange(evt) {
    this.setState({ colorFormat: evt.target.value, open: true });
    this.props.handleChange(evt.target.value);
  }
  closeSnackBar() {
    this.setState({ open: false });
  }
  render() {
    let { classes } = this.props;
    return (
      <header className={classes.NavBar}>
        <div className={classes.logo}>
          <Link to="/">reactcolorpicker</Link>
        </div>
        {this.props.showSlider && (
          <div>
            <span>Level: {this.props.level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={this.props.level}
                min={100}
                max={900}
                step={100}
                onAfterChange={this.props.changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={this.state.colorFormat} onChange={this.handleChange}>
            <MenuItem value="hex">Hex - #000000</MenuItem>
            <MenuItem value="rgb">RGB - rgb(0,0,0)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(0, 0, 0, 0.5)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format Changed to {this.state.colorFormat.toUpperCase()}
            </span>
          }
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          action={[
            <IconButton
              onClick={this.closeSnackBar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
          onClose={this.closeSnackBar}
        />
      </header>
    );
  }
}

export default withStyles(styles)(NavBar);
