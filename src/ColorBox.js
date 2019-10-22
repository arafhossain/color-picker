import React, { Component } from "react";
import CopyToClipBoard from "react-copy-to-clipboard";
import "./ColorBox.css";
import chroma from "chroma-js";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

let styles = {
  ColorBox:{
    width: '20%',
    height: props => props.showMore ? '25%' : '50%',
    margin:'0 auto',
    display: 'inline-block',
    position: 'relative',
    marginBottom: '-3.5px',
    '&:hover button': {
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
            className={`copy-overlay ${this.state.beingCopied && "show"}`}
          />
          <div className={`copy-msg ${this.state.beingCopied && "show"}`}>
            <h1>Copied!</h1>
            <p className={classes.copyText}>{this.props.background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
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
