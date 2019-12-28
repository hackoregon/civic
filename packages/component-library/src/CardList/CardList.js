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
import ProjectCard from "./ProjectCard";
import cardListStyling from "./cardListStyling";
import filterCardsBasedOnFilterStatus from "./filterCardsByActiveTags";

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

const useStyles = makeStyles(cardListStyling);

const filterPadding = css`
  padding-top: 1rem;
  margin-bottom: 0;
  padding-left: 1rem;
  font-size: 1.5rem;
`;

const headingPadding = css`
  padding-left: 1rem;
  padding-right: 1rem;
`;

function deriveCategoryNamesFromTagsList(tagsList) {
  const allCategories = new Set(tagsList.map(tag => tag.category));
  return [...allCategories];
}

function deriveInitialFilterStateFromCategories(categories) {
  const stateObject = {};
  categories.forEach(category => {
    stateObject[category] = [];
  });
  return stateObject;
}

function sortAllAvailableTagsByCategory(tagsList, categories) {
  const tagsByCategory = categories.reduce(
    (accumulator, category) => ({
      [category]: [],
      ...accumulator
    }),
    {}
  );
  tagsList.forEach(tag => {
    tagsByCategory[tag.category].push(tag.id);
  });
  return tagsByCategory;
}

function numberOfFiltersSelected(activeFilters, categories) {
  const flatListOfFilters = categories.reduce(
    (accumulator, category) => [...accumulator, activeFilters[category]],
    []
  );

  return flatListOfFilters.length;
}

function isFilterSelected(id, category, activeFilters) {
  for (let i = 0; i < activeFilters[category].length; i += 1) {
    if (activeFilters[category][i] === id) return true;
  }
  return false;
}

const CardList = ({ CardRegistry, tagsList, projects }) => {
  // eslint-disable-next-line no-unused-vars
  const { entries, tags } = CardRegistry;

  // eslint-disable-next-line no-console
  console.log("Tag Count:", tags);

  const categories = deriveCategoryNamesFromTagsList(tagsList);
  const tagsListByCategory = sortAllAvailableTagsByCategory(
    tagsList,
    categories
  );

  const classes = useStyles();
  const theme = useTheme();

  // Nested List and Drawer open / close handlers
  const [showAllStories, setShowAllStories] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openTopic, setOpenTopic] = useState(true);
  const [openLocation, setOpenLocation] = useState(false);
  const [openVisualization, setOpenVisualization] = useState(false);

  // holds state for checkboxes (nested object where specific tags are boolean)
  const [activeFilters, setActiveFilters] = useState(
    deriveInitialFilterStateFromCategories(categories)
  );

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
      <h1 css={filterPadding}>Filters</h1>
      <List
        component="aside"
        aria-labelledby="nested-list-subheader"
        className={classes.filtersList}
      >
        {categories.map(category => (
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
                {tagsListByCategory[category].sort().map(id => (
                  <ListItem key={shortid.generate()} className={classes.nested}>
                    <Checkbox
                      value={isFilterSelected(id, category, activeFilters)}
                      label={id}
                      onChange={() => {
                        if (showAllStories) setShowAllStories(false);
                        if (isFilterSelected(id, category, activeFilters)) {
                          setActiveFilters({
                            ...activeFilters,
                            [category]: activeFilters[category].filter(
                              tag => tag !== id
                            )
                          });
                        } else {
                          setActiveFilters({
                            ...activeFilters,
                            [category]: [...activeFilters[category], id]
                          });
                        }
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

  const filteredEntries = entries.filter(entry =>
    filterCardsBasedOnFilterStatus(
      entry.component.tags,
      categories,
      activeFilters,
      showAllStories,
      numberOfFiltersSelected(activeFilters, categories)
    )
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
                Filters
              </Button>
            </section>
            {numberOfFiltersSelected(activeFilters, categories) === 0 && (
              <section>
                <h2 css={headingPadding}>
                  <strong>Featured Projects: Hack Oregon Demo Day</strong>
                </h2>
                <ul className={classes.entriesList}>
                  {projects.map(entry => (
                    <li key={shortid.generate()} className={classes.entry}>
                      <ProjectCard
                        title={entry.title}
                        description={entry.description}
                        link={entry.link}
                        type={entry.type}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {filteredEntries.length > 0 ? (
              <section>
                <h2 css={headingPadding}>
                  <strong>Cards:</strong>
                </h2>
                <ul className={classes.entriesList}>
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
              </section>
            ) : (
              <div css={emptyState}>
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
  }),
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.title,
      description: PropTypes.description,
      link: PropTypes.link
    })
  )
};

export default CardList;
