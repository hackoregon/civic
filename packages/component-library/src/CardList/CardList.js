/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import { Link } from "react-router";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Header from "../Header/Header";
import BrandColors from "../_Themes/Brand/BrandColors";
import SandboxCard from "./SandboxCard";

import {
  Checkbox,
  CivicCardLayoutPreview,
  MaterialTheme,
  Button
} from "../index";

const emptyState = css`
  display: grid;
  justify-content: center;
  font-size: 1.2rem;

  > p {
    > a {
      color: ${BrandColors.action.hex};
    }
  }
`;

const drawerWidth = 240;
const headerHeight = 72;
const drawerGap = 0;
const useStyles = makeStyles(theme => ({
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
}));

const tagsListExample = {
  topics: ["Transportation", "Disaster Resilience", "Housing"],
  locations: ["Portland", "Oregon", "Nationwide", "Your City"],
  visualizations: ["Bar Chart", "Cloropleth Map", "Scatterplot"]
};

const CardList = ({ CardRegistry, tagsList = tagsListExample }) => {
  // eslint-disable-next-line no-unused-vars
  const { entries, tags } = CardRegistry;

  // eslint-disable-next-line no-console
  console.log("Tag Count:", tags);

  const allTagsFalse = {};
  Object.keys(tagsList).forEach(category => {
    tagsList[category].forEach(tag => {
      allTagsFalse[tag] = false;
    });
  });

  const classes = useStyles();

  const [showAllStories, setShowAllStories] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openTopic, setOpenTopic] = useState(true);
  const [openLocation, setOpenLocation] = useState(false);
  const [openVisualization, setOpenVisualization] = useState(false);
  const theme = useTheme();
  const [activeTags, setActiveTags] = useState(allTagsFalse);

  const noFiltersSelected = () => {
    const tagNames = Object.keys(activeTags);
    for (let i = 0; i < tagNames.length; i += 1) {
      if (activeTags[tagNames[i]]) return false;
    }
    return true;
  };

  const categoryOpeners = {
    topics: openTopic,
    locations: openLocation,
    visualizations: openVisualization
  };

  const categoryHandlers = {
    topicsHandler() {
      setOpenTopic(!openTopic);
    },
    locationsHandler() {
      setOpenLocation(!openLocation);
    },
    visualizationsHandler() {
      setOpenVisualization(!openVisualization);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={classes.toolbar}>
      <h1>Filters</h1>
      <List
        component="aside"
        aria-labelledby="nested-list-subheader"
        className={classes.filtersList}
      >
        {Object.keys(tagsList).map(category => (
          <Fragment>
            <ListItem button onClick={categoryHandlers[`${category}Handler`]}>
              <ListItemText
                className={classes.categoryListText}
                primary={category.replace(/^\w/, c => c.toUpperCase())}
              />
              {categoryOpeners[category] ? <ExpandMore /> : <ChevronRight />}
            </ListItem>
            <Collapse
              in={categoryOpeners[category]}
              timeout="auto"
              unmountOnExit
            >
              <List component="ul" disablePadding>
                {tagsList[category].sort().map(topic => (
                  <ListItem key={shortid.generate()} className={classes.nested}>
                    <Checkbox
                      value={activeTags[topic]}
                      label={topic}
                      onChange={() => {
                        if (showAllStories) setShowAllStories(false);
                        setActiveTags({
                          ...activeTags,
                          [topic]: !activeTags[topic]
                        });
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Fragment>
        ))}
      </List>
    </div>
  );

  const filterCardsBasedOnActiveTags = entryTags => {
    if (!entryTags) return false;
    if (showAllStories) return true;
    if (noFiltersSelected()) return true;
    for (let i = 0; i < entryTags.length; i += 1) {
      if (activeTags[entryTags[i]]) return true;
    }
    return false;
  };

  const filteredEntries = entries.filter(entry =>
    filterCardsBasedOnActiveTags(entry.component.tags)
  );

  return (
    <Fragment>
      <Header />
      <ThemeProvider theme={MaterialTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer} aria-label="mailbox folders">
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
            <section className={classes.filtersButton}>
              <Button
                aria-label="open filters list"
                onClick={handleDrawerToggle}
              >
                Filter Stories
              </Button>
            </section>
            {filteredEntries.length > 0 ? (
              <ul className={classes.entriesList}>
                <li key="sandbox" className={classes.entry}>
                  <SandboxCard />
                </li>
                {filteredEntries.map(entry => (
                  <li key={shortid.generate()} className={classes.entry}>
                    {
                      <entry.component
                        className={classes.storyCard}
                        Layout={CivicCardLayoutPreview}
                      />
                    }
                  </li>
                ))}
              </ul>
            ) : (
              <div css={emptyState}>
                <SandboxCard />
                <p>
                  {`We haven't yet made any cards matching your selection.`}
                  <br />
                  <Link
                    to={{
                      pathname: "/",
                      hash: "#become-a-contributor"
                    }}
                  >
                    Join us
                  </Link>{" "}
                  to make it happen!
                </p>
              </div>
            )}
          </main>
        </div>
      </ThemeProvider>
    </Fragment>
  );
};

CardList.displayName = "CardList";
CardList.propTypes = {
  CardRegistry: PropTypes.shape({}),
  tagsList: PropTypes.shape({
    topics: PropTypes.arrayOf(PropTypes.string),
    locations: PropTypes.arrayOf(PropTypes.string),
    visualizations: PropTypes.arrayOf(PropTypes.string)
  })
};

export default CardList;
