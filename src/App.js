import React, { Component } from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelpers";
import {Switch, Route} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Switch>
         <Route exact path="/" render={() => <h2>List goes here</h2>}/>
        <Route exact path="/palette/:id"/>
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

export default App;
