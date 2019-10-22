import React, { Component } from "react";
import CopyToClipBoard from "react-copy-to-clipboard";
import "./ColorBox.css";
import chroma from "chroma-js";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

let styles = {
  ColorBox: {
    width: "20%",
    height: props => (props.showMore ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: 1
    }
  },
  copyText: {
    color: props =>
      chroma(props.background).luminance() > 0.6
        ? "rgba(0, 0, 0, 0.5)"
        : "white"
  },
  nameText: {
    color: props =>
      chroma(props.background).luminance() < 0.05 ? "white" : "black"
  },
  seeMore: {
    color: props =>
      chroma(props.background).luminance() > 0.6
        ? "rgba(0, 0, 0, 0.5)"
        : "white",
    background: "rgba(255,255,255,0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase"
  },
  copyButton: {
    color: props =>
      chroma(props.background).luminance() > 0.6
        ? "rgba(0, 0, 0, 0.5)"
        : "white",
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
    opacity: 0
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px"
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out"
  },
  showOverlay: {
    opacity: "1",
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute"
  },
  copyMessage: {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "rgba(255,255,255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      textTransform: "uppercase"
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "200"
    }
  },
  showMessage: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "25",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s"
  }
};
class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { beingCopied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ beingCopied: true }, () => {
      setTimeout(() => this.setState({ beingCopied: false }), 1500);
    });
  }
  render() {
    let { name, background, showMore, classes } = this.props;
    return (
      <CopyToClipBoard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          <div
            style={{ background }}
            className={`${classes.copyOverlay} ${this.state.beingCopied &&
              classes.showOverlay}`}
          />
          <div
            className={`${classes.copyMessage} ${this.state.beingCopied &&
              classes.showMessage}`}
          >
            <h1>Copied!</h1>
            <p className={classes.copyText}>{this.props.background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.nameText}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showMore && (
            <Link
              to={`/palette/${this.props.paletteId}/${this.props.id}`}
              onClick={event => event.stopPropagation()}
            >
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipBoard>
    );
  }
}

export default withStyles(styles)(ColorBox);
