import React, { Component } from "react";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import styles from './styles/ColorPickerStyles'
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "blue",
      newColorName: ""
    };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isNameUnique", value =>
      this.props.currentPalette.every(
        color => color.name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      this.props.currentPalette.every(
        color => color.color !== this.state.currentColor
      )
    );
  }
  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit() {
    let newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addToPalette(newColor);
    this.setState({ newColorName: "" });
  }
  render() {
    let {classes, maxColors, currentPalette} = this.props;
    let {newColorName, currentColor} = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={newColor => this.updateCurrentColor(newColor)}
          className={classes.colorPicker}
        />
        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
          <TextValidator
            value={newColorName}
            name="newColorName"
            variant="filled"
            placeholder="Color Name"
            onChange={this.handleChange}
            className={classes.newColorInput}
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
            style={{ backgroundColor: currentColor }}
            type="submit"
            className={classes.addButton}
            disabled={currentPalette.length >= maxColors}
          >
            {currentPalette.length >= maxColors
              ? "Palette Full"
              : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPicker);
