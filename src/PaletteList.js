import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      deletingId: ""
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setId = this.setId.bind(this);
    this.goToPalette = this.goToPalette.bind(this);
  }
  setId(paletteId) {
    this.setState({
      deletingId: paletteId,
      showDialog: true
    });
  }
  toggleDialog() {
    this.setState({ showDialog: !this.state.showDialog, deletingId: "" });
  }
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  handleDelete() {
    this.props.removePalette(this.state.deletingId);
    this.toggleDialog();
  }
  render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h2 className={classes.title}>Color Picker</h2>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {this.props.palettes.map(palette => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...palette}
                  setId={this.setId}
                  removePalette={this.toggleDialog}
                  handleClick={this.goToPalette}
                  key={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={this.state.showDialog}
          aria-labelledby="delete-dialog"
          onClose={this.toggleDialog}
        >
          <DialogTitle id="delete-dialog">Delete this palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: green[300] }}>
                  <DeleteIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={this.toggleDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[300], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
