import {DRAWER_WIDTH} from '../constants'

const styles = theme => ({
  root: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
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
    marginLeft: -DRAWER_WIDTH,
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

export default styles;