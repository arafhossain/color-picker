import React, { Component } from 'react'
import styles from './styles/PaletteStyles'
import {withStyles} from '@material-ui/styles'

class SingleFooter extends Component {
  render(){
    return (
      <footer className={this.props.classes.paletteFooter}>
        {this.props.name}
        <span className={this.props.classes.emoji}>{this.props.emoji}</span>
      </footer>
    )
  }
}

export default withStyles(styles)(SingleFooter);