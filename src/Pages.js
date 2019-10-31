import React, { Component } from 'react'
import './Page.css'

class Pages extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <section className="page">
        {this.props.children}
      </section>
    )
  }
}

export default Pages;