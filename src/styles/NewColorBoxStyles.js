import sizes from "./sizes";
import chroma from "chroma-js";
let styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-5px",
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%"
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "5%"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: props =>
      chroma(props.color).luminance() < 0.05
        ? "rgba(255,255,255,0.8)"
        : "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
    [sizes.down("sm")]: {
      padding: "0"
    }
  },
  deleteIcon: {
    color: "rgba(0,0,0,0.5)",
    transition: "all 0.1s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      color: "white",
      transform: "scale(1.2)"
    }
  }
};

export default styles;
