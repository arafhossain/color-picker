import React, { Component } from 'react'
import './Page.css'

class Pages extends Component {
  render(){
    return (
      <section className="page">
        {this.props.children}
      </section>
    )
  }
}

export default Pages;