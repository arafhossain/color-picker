import React, { Component } from 'react'
import ColorBox from './ColorBox'

class SingleColorPalette extends Component {
  constructor(props){
    super(props);
    this.state = {
      colors: this.getColors(this.props.palette, this.props.colorId)
    }
  }
  getColors(palette, wantedColor){
    let shades = []
    let allColors = palette.colors;
    for(let key in allColors){
      shades = shades.concat(
        allColors[key].filter(color => (
          color.id === wantedColor
        ))
      )
    }
    return shades.slice(1);
  }
  render(){
    let colorBoxes = this.state.colors.map(color => (
      <ColorBox key={color.id} name={color.name} background={color.hex} showMore={false}/>
    ))
    return (
      <div className="Palette">
        <h2>Single Colors</h2>
        <div className="Palette-colors">
          {colorBoxes}
        </div>
      </div>
    )
  }
}

export default SingleColorPalette;