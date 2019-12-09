import { useReducer, Fragment } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Badge from "@material-ui/core/Badge";
import { ThemeProvider } from "@material-ui/styles";
import LayersIcon from "@material-ui/icons/Layers";
import CollectionsIcon from "@material-ui/icons/Collections";
import { groupBy } from "lodash";
import { generate } from "shortid";
import { MaterialTheme } from "../_Themes/index";

const MANUAL_LOCATION_SORT = ["National"];
const MANUAL_LOCATION_EXCLUDE = ["Nevada", "Georgia"];

const PackageSelector = ({ packages, onChange }) => {
  const [collapsedItems, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "toggle":
        return {
          ...state,
          [action.location]: !state[action.location]
        };
      default:
        return state;
    }
  }, {});

  const packagesWithLocations =
    packages &&
    packages.length &&
    packages.map(pkg => {
      const { displayName } = pkg;
      const nameAndLocation = displayName.split(":");
      const location = nameAndLocation.length === 2 ? nameAndLocation[0] : "";
      const name = nameAndLocation.length === 2 ? nameAndLocation[1] : "";
      return { ...pkg, name, location };
    });

  const packagesByLocation =
    packagesWithLocations &&
    groupBy(packagesWithLocations, item => item.location);

  const unsortedLocations =
    packagesWithLocations &&
    Object.keys(packagesByLocation).filter(
      location =>
        !MANUAL_LOCATION_SORT.includes(location) &&
        !MANUAL_LOCATION_EXCLUDE.includes(location)
    );
  const sortedLocations = packagesWithLocations && [
    ...MANUAL_LOCATION_SORT,
    ...unsortedLocations
  ];

  return (
    <ThemeProvider theme={MaterialTheme}>
      <List component="nav" aria-label="data collection list">
        {sortedLocations &&
          sortedLocations.map(location => (
            <Fragment>
              <ListItem
                key={generate()}
                button
                onClick={() =>
                  dispatch({
                    type: "toggle",
                    location
                  })
                }
              >
                <Badge
                  color="secondary"
                  anchorOrigin={{
                    horizontal: "left",
                    vertical: "top"
                  }}
                  badgeContent={packagesByLocation[location].length}
                >
                  <CollectionsIcon />
                </Badge>
                <ListItemText primary={location} />
                {!collapsedItems[location] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={!collapsedItems[location]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {packagesWithLocations &&
                    packagesWithLocations
                      .filter(pkg => pkg.location === location)
                      .map(({ displayName, name }) => (
                        <ListItem
                          key={generate()}
                          button
                          onClick={() => onChange(displayName)}
                          css={css(
                            `padding-left: ${MaterialTheme.spacing(
                              4
                            )}px !important;`
                          )}
                        >
                          <LayersIcon color="secondary" fontSize="small" />
                          <ListItemText primary={name} />
                        </ListItem>
                      ))}
                </List>
              </Collapse>
            </Fragment>
          ))}
      </List>
    </ThemeProvider>
  );
};
PackageSelector.displayName = "PackageSelector";

PackageSelector.propTypes = {
  packages: PropTypes.shape({
    displayName: PropTypes.string,
    layers: PropTypes.arrayOf(PropTypes.shape)
  }),
  onChange: PropTypes.func
};

export default PackageSelector;
