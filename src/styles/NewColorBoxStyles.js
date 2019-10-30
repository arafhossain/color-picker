let styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-5px"
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between"
  },
  deleteIcon: {
    color: "rgba(0,0,0,0.5)",
    transition: "all 0.1s ease-in-out",
    cursor: 'pointer',
    "&:hover": {
      color: "white",
      transform: "scale(1.2)"
    }
  }
};

export default styles;