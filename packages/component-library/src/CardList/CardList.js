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

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

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
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const tagsListExample = {
  topics: ["Transportation", "Disaster Resilience", "Housing"],
  locations: ["Portland", "Nationwide", "Your City"],
  visualizations: ["Bar Chart", "Cloropleth Map", "Scatterplot"],
  other: ["Bananas", "Walruses", "Flamingos"]
};

const checkTags = (entryTags, activeTags) => {
  if (!entryTags) return false;
  for (let i = 0; i < entryTags.length; i += 1) {
    if (activeTags[entryTags[i]]) return true;
  }
  return false;
};

const CardList = ({ CardRegistry }) => {
  // eslint-disable-next-line no-unused-vars
  const { entries, tags } = CardRegistry;

  const initState = {};
  Object.keys(tagsListExample).forEach(category => {
    tagsListExample[category].forEach(tag => {
      initState[tag] = true;
    });
  });
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openTopic, setOpenTopic] = React.useState(true);
  const [openLocation, setOpenLocation] = React.useState(true);
  const [openVisualization, setOpenVisualization] = React.useState(true);
  const [openOther, setOpenOther] = React.useState(true);
  const theme = useTheme();
  const [activeTags, setActiveTags] = useState(initState);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function handleTopic() {
    setOpenTopic(!openTopic);
  }

  function handleLocation() {
    setOpenLocation(!openLocation);
  }

  function handleVisualization() {
    setOpenVisualization(!openVisualization);
  }

  function handleOther() {
    setOpenOther(!openOther);
  }

  const drawer = (
    <div className={classes.toolbar}>
      <h1>Filters</h1>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem button onClick={handleTopic}>
          <ListItemText primary="Topics" />
          {openTopic ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openTopic} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {tagsListExample.topics.map(topic => (
              <ListItem
                key={shortid.generate()}
                button
                className={classes.nested}
              >
                <Checkbox
                  value={activeTags[topic]}
                  label={topic}
                  onChange={() =>
                    setActiveTags({
                      ...activeTags,
                      [topic]: !activeTags[topic]
                    })
                  }
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem button onClick={handleLocation}>
          <ListItemText primary="Locations" />
          {openLocation ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openLocation} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {tagsListExample.locations.map(location => (
              <ListItem
                key={shortid.generate()}
                button
                className={classes.nested}
              >
                <Checkbox
                  value={activeTags[location]}
                  label={location}
                  onChange={() =>
                    setActiveTags({
                      ...activeTags,
                      [location]: !activeTags[location]
                    })
                  }
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem button onClick={handleVisualization}>
          <ListItemText primary="Visualizations" />
          {openVisualization ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openVisualization} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {tagsListExample.visualizations.map(visualizations => (
              <ListItem
                key={shortid.generate()}
                button
                className={classes.nested}
              >
                <Checkbox
                  value={activeTags[visualizations]}
                  label={visualizations}
                  onChange={() =>
                    setActiveTags({
                      ...activeTags,
                      [visualizations]: !activeTags[visualizations]
                    })
                  }
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem button onClick={handleOther}>
          <ListItemText primary="Other" />
          {openOther ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openOther} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {tagsListExample.other.map(other => (
              <ListItem
                key={shortid.generate()}
                button
                className={classes.nested}
              >
                <Checkbox
                  value={activeTags[other]}
                  label={other}
                  onChange={() =>
                    setActiveTags({
                      ...activeTags,
                      [other]: !activeTags[other]
                    })
                  }
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );

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
