import React, { useState } from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import shortid from "shortid";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { PageLayout } from "../..";
import { Checkbox, CivicCardLayoutPreview } from "../index";

const drawerWidth = 240;
const headerHeight = 120;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "95vw",
    alignSelf: "center",
    margin: "0px"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    backgroundColor: "#201024",
    marginLeft: drawerWidth,
    height: headerHeight,
    [theme.breakpoints.up("sm")]: {
      width: "100%"
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: {
    width: "100%",
    marginLeft: "10px"
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      top: `${headerHeight}px`
    }
  },
  content: {
    position: "absolute",
    top: headerHeight,
    // border: '3px solid red',
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
    display: "flex"
  },
  entry: {
    margin: "10px",
    width: "100%",
    flexWrap: "wrap",
    listStyleType: "none",
    alignSelf: "stretch"
  }
}));

const checkTags = (entryTags, activeTags) => {
  if (!entryTags) return false;
  for (let i = 0; i < entryTags.length; i += 1) {
    if (activeTags[entryTags[i]]) return true;
  }
  return false;
};

const CardList = ({ CardRegistry }) => {
  const { entries, tags } = CardRegistry;

  const initState = {};
  Object.keys(tags).forEach(tag => {
    initState[tag] = true;
  });
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const [activeTags, setActiveTags] = useState(initState);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div className={classes.toolbar}>
      <h1>Filters</h1>
      <h2>Topic</h2>
      <ul>
        {Object.keys(tags).map(tag => (
          <li key={shortid.generate()} className={classes.filterItem}>
            <Checkbox
              value={activeTags[tag]}
              label={tag}
              onChange={() =>
                setActiveTags({ ...activeTags, [tag]: !activeTags[tag] })
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );

  console.log("ENTRY / TAGS / 0", entries[0].component.tags);
  console.log("ENTRY / TAGS / 1", entries[1].component.tags);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <h1>Did you know?</h1>
        <div>
          <ul className={classes.entriesList}>
            {entries
              .filter(entry => checkTags(entry.component.tags, activeTags))
              .map(entry => (
                <li key={shortid.generate()} className={classes.entry}>
                  {<entry.component Layout={CivicCardLayoutPreview} />}
                </li>
              ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

CardList.displayName = "CardList";
CardList.propTypes = {
  CardRegistry: PropTypes.shape({})
};

export default CardList;
