import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class PaletteDialogForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      newPaletteName: "",
      open: true
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  render() {
    return (
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm
                onSubmit={() =>
                  this.props.savePalette(this.state.newPaletteName)
                }
              >
          <DialogContent>
            <DialogContentText>
              Enter a unique name for your new palette!
            </DialogContentText>

                <TextValidator
                  value={this.state.newPaletteName}
                  name="newPaletteName"
                  label="Palette Name"
                  fullWidth
                  margin="normal"
                  onChange={this.handleChange}
                  validators={["required", "isPaletteNameUnique"]}
                  errorMessages={[
                    "Enter palette name",
                    "Palette name already taken"
                  ]}
                />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
                  Save Palette
                </Button>
          </DialogActions>
          </ValidatorForm>
        </Dialog>
    );
  }
}

export default PaletteDialogForm;


