import React, { Component } from "react";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";

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
    let {newColorName, currentColor} = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={newColor => this.updateCurrentColor(newColor)}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            value={newColorName}
            name="newColorName"
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
            style={{ backgroundColor: currentColor }}
            type="submit"
            disabled={this.props.currentPalette.length >= this.props.maxColors}
          >
            {this.props.currentPalette.length >= this.props.maxColors
              ? "Palette Full"
              : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default ColorPicker;
