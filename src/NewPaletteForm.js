import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import NewColorBoxList from "./NewColorBoxList";
import { arrayMove } from "react-sortable-hoc";

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
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
  }
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
      newName: "",
      newPaletteName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addToPalette = this.addToPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isNameUnique", value =>
      this.state.currentPalette.every(
        color => color.name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      this.state.currentPalette.every(
        color => color.color !== this.state.currentColor
      )
    );
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
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
  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex });
  }
  addToPalette() {
    let newColor = {
      color: this.state.currentColor,
      name: this.state.newName
    };
    this.setState({
      currentPalette: [...this.state.currentPalette, newColor],
      newName: ""
    });
  }
  savePalette() {
    let newName = this.state.newPaletteName;
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
        <CssBaseline />
        <AppBar
          color="default"
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={this.savePalette}>
              <TextValidator
                value={this.state.newPaletteName}
                name="newPaletteName"
                label="Palette Name"
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Enter palette name",
                  "Palette name already taken"
                ]}
              />
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
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
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.getRandomColor}
              disabled={
                this.state.currentPalette.length >= this.props.maxColors
              }
            >
              Random Color
            </Button>
          </div>
          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={newColor => this.updateCurrentColor(newColor)}
          />
          <ValidatorForm onSubmit={this.addToPalette}>
            <TextValidator
              value={this.state.newName}
              name="newName"
              onChange={this.handleChange}
              validators={["required", "isNameUnique", "isColorUnique"]}
              errorMessages={[
                "this field is required",
                "Color name must be unique",
                "Already added color!"
              ]}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: this.state.currentColor }}
              type="submit"
              disabled={
                this.state.currentPalette.length >= this.props.maxColors
              }
            >
              {this.state.currentPalette.length >= this.props.maxColors
                ? "Palette Full"
                : "Add Color"}
            </Button>
          </ValidatorForm>
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
