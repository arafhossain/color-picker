import React, { Component } from "react";
import CopyToClipBoard from "react-copy-to-clipboard";
import "./ColorBox.css";
import chroma from 'chroma-js'
import { Link } from "react-router-dom";

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
    let { name, background, showMore } = this.props;
    let darkColor = chroma(background).luminance() < 0.05;
    let lightColor = chroma(background).luminance() > 0.6;

    return (
      <CopyToClipBoard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className="ColorBox">
          <div
            style={{ background }}
            className={`copy-overlay ${this.state.beingCopied && "show"}`}
          />
          <div className={`copy-msg ${this.state.beingCopied && "show"}`}>
            <h1>Copied!</h1>
            <p className={lightColor ? 'dark-text' : undefined}>{this.props.background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={darkColor ? 'light-text' : undefined}>{name}</span>
            </div>
            <button className={`copy-button ${lightColor ? 'dark-text' : undefined}`}>Copy</button>
          </div>
          {showMore && (
            <Link
              to={`/palette/${this.props.paletteId}/${this.props.id}`}
              onClick={event => event.stopPropagation()}
            >
              <span className={`see-more ${lightColor ? 'dark-text' : undefined}`}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipBoard>
    );
  }
}

export default ColorBox;
