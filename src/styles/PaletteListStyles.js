import sizes from './sizes'

export default {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    overflow: "scroll",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  container: {
    width: "55%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down('md')] : {
      width: '70%'
    },
    [sizes.down('xs')] : {
      width: '60%'
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": { color: "white", textDecoration: "none" }
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "1.5rem",
    [sizes.down('sm')] : {
      gridTemplateColumns: "repeat(2, 50%)",
    },
    [sizes.down('xs')] : {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1rem",
    },
  }
};
