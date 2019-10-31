import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
class PaletteDialogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: "",
      stage: "form"
    };
    this.handleChange = this.handleChange.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  showPicker() {
    this.setState({ stage: "emoji" });
  }
  savePalette(emoji) {
    let palette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    };
    this.props.savePalette(palette);
  }
  render() {
    let { closeForm } = this.props;
    let { stage, newPaletteName } = this.state;
    return (
      <div>
        <Dialog open={stage === "emoji"} onClose={closeForm}>
          <DialogTitle id="form-dialog-title">Choose an Emoji</DialogTitle>
          <Picker onSelect={this.savePalette} />
        </Dialog>
        <Dialog
          open={stage === "form"}
          onClose={closeForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showPicker}>
            <DialogContent>
              <DialogContentText>
                Enter a unique name for your new palette!
              </DialogContentText>
              <TextValidator
                value={newPaletteName}
                name="newPaletteName"
                label="Palette Name"
                fullWidth
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Enter palette name",
                  "Palette name already taken"
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Pick Emoji
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteDialogForm;
