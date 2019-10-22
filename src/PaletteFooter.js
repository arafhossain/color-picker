import React, { Component } from 'react'

class SingleFooter extends Component {
  render(){
    return (
      <footer className="Palette-footer">
        {this.props.name}
        <span className='emoji'>{this.props.emoji}</span>
      </footer>
    )
  }
}

export default SingleFooter;