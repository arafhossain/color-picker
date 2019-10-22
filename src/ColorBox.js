import React, { Component } from "react";
import CopyToClipBoard from 'react-copy-to-clipboard';
import "./ColorBox.css";
import {Link} from 'react-router-dom'

class ColorBox extends Component {
  constructor(props){
    super(props);
    this.state = {beingCopied: false}
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState(){
    this.setState({beingCopied: true}, () => {
      setTimeout(() => this.setState({beingCopied: false}), 1500)
    })
  }
  render() {
    let { name, background } = this.props;
    return (
      <CopyToClipBoard text={background} onCopy={this.changeCopyState}>
      <div style={{ background }} className="ColorBox">
        <div style={{background}}className={`copy-overlay ${this.state.beingCopied && 'show'}`}/>
      <div className={`copy-msg ${this.state.beingCopied && 'show'}`}>
        <h1>Copied!</h1>
        <p>{this.props.background}</p>
      </div>
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <Link to="/" onClick={event => event.stopPropagation()}>
        <span className="see-more">More</span>
        </Link>
      </div>
      </CopyToClipBoard>
    );
  }
}

export default ColorBox;
