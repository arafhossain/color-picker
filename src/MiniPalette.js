import React, { Component } from 'react'
import {withStyles} from '@material-ui/styles'

let styles ={
  root : {
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer'
    },
    border: '1px solid black'
  },
  colors: {
    backgroundColor: 'grey'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative'
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem'
  }
}

class MiniPalette extends Component {
  render(){
    let {classes, paletteName, emoji} = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.colors}></div>
        <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
      </div>
    )
  }
}

export default withStyles(styles)(MiniPalette);