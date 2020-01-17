const drawerWidth = 240;
const headerHeight = 72;
const drawerGap = 0;
export default theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "95vw",
    margin: "0px"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      zIndex: "998",
      width: drawerWidth,
      flexShrink: 0
    }
  },
  filtersButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: {
    width: "calc(100% - 10px)",
    marginLeft: "10px"
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      top: `calc(${headerHeight}px - 30px + ${drawerGap}px)`,
      height: `calc(100vh - ${headerHeight}px + 30px - ${drawerGap}px)`
    }
  },
  filtersList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignSelf: "center",
    margin: "0px",
    width: "100%"
  },
  categoryListText: {
    [theme.breakpoints.up("sm")]: {
      flexGrow: 0
    }
  },
  content: {
    position: "absolute",
    top: headerHeight,
    padding: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      left: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      alignSelf: "flex-end"
    }
  },
  filterItem: {
    listStyleType: "none"
  },
  entriesList: {
    padding: "0px",
    display: "flex",
    flexWrap: "wrap"
  },
  entry: {
    margin: "10px",
    flexWrap: "wrap",
    listStyleType: "none",
    alignSelf: "stretch",
    width: "90%",
    [theme.breakpoints.up("lg")]: {
      width: "45%"
    }
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  storyCard: {
    height: "1000px"
  }
});
