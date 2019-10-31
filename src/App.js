import React, { Component } from "react";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelpers";
import { Switch, Route } from "react-router-dom";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Pages from './Pages'
import './Page.css'
class App extends Component {
  constructor(props) {
    super(props);
    let savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || seedColors
    };
    this.getPalette = this.getPalette.bind(this);
    this.removePalette = this.removePalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }
  getPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  removePalette(id) {
    this.setState(
      currentState => ({
        palettes: currentState.palettes.filter(palette => palette.id !== id)
      }),
      this.saveLocalStorage
    );
  }
  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.saveLocalStorage
    );
  }
  saveLocalStorage() {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }
  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page">
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={routeProps => (
                    <Pages>
                      <NewPaletteForm
                        savePalette={this.savePalette}
                        palettes={this.state.palettes}
                        {...routeProps}
                      />
                    </Pages>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <Pages>
                      <PaletteList
                        palettes={this.state.palettes}
                        removePalette={this.removePalette}
                        {...routeProps}
                      />
                    </Pages>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <Pages>
                      <Palette
                        palette={generatePalette(
                          this.getPalette(routeProps.match.params.id)
                        )}
                      />
                    </Pages>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <SingleColorPalette
                      palette={generatePalette(
                        this.getPalette(routeProps.match.params.paletteId)
                      )}
                      colorId={routeProps.match.params.colorId}
                    />
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
