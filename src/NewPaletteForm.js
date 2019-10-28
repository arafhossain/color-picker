import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ColorPicker from "./ColorPicker";
import Button from "@material-ui/core/Button";
import NewColorBoxList from "./NewColorBoxList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";

export const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center'
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    height: "calc(100vh - 64px)"
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  drawerContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  buttons: {width: '100%'},
  button: {width: '50%'}
});
class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: "red",
      currentPalette: this.props.palettes[0].colors,
      newName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.addToPalette = this.addToPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  addToPalette(newColor) {
    this.setState({
      currentPalette: [...this.state.currentPalette, newColor]
    });
  }
  savePalette(newName) {
    let newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.currentPalette
    };
    this.props.savePalette(newPalette);
    this.props.history.push("/");
  }
  removeColor(name) {
    this.setState({
      currentPalette: this.state.currentPalette.filter(
        color => color.name !== name
      )
    });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ currentPalette }) => ({
      currentPalette: arrayMove(currentPalette, oldIndex, newIndex)
    }));
  };
  clearColors() {
    this.setState({ currentPalette: [] });
  }
  getRandomColor() {
    let allColors = this.props.palettes.map(palette => palette.colors).flat();
    let newColor = allColors[Math.floor(Math.random() * allColors.length)];
    this.setState({ currentPalette: [...this.state.currentPalette, newColor] });
  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={this.props.palettes}
          savePalette={this.savePalette}
          handleDrawerOpen={this.handleDrawerOpen}
          drawerWidth={drawerWidth}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <div className={classes.drawerContent}>
            <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.getRandomColor}
                className={classes.button}
                disabled={
                  this.state.currentPalette.length >= this.props.maxColors
                }
              >
                Random Color
              </Button>
            </div>
            <ColorPicker
              currentPalette={this.state.currentPalette}
              maxColors={this.props.maxColors}
              addToPalette={this.addToPalette}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <NewColorBoxList
            currentPalette={this.state.currentPalette}
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
