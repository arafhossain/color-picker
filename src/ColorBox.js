import React, { Component } from "react";
import CopyToClipBoard from "react-copy-to-clipboard";
import styles from "./styles/ColorBoxStyles";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

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
    let { name, background, showMore, classes, paletteId, id } = this.props;
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
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.nameText}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showMore && (
            <Link
              to={`/palette/${paletteId}/${id}`}
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
