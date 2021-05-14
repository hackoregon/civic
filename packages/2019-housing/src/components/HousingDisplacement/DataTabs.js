/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StorageIcon from "@material-ui/icons/Storage";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { useState } from "react";
import VisualizationColors from "@hackoregon/component-library/dist/_Themes/VisualizationColors";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function DataTabs({ Storycard, DatasetA, DatasetB }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const card = !!Storycard;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {card && (
            <Tab
              label="Story Card"
              icon={
                <AssessmentIcon
                  fontSize="small"
                  css={css`
                    color: ${VisualizationColors.categorical.pink.hex}};
                  `}
                />
              }
              {...a11yProps(0)}
            />
          )}
          {DatasetA && (
            <Tab
              label="Dataset A"
              icon={
                <StorageIcon
                  fontSize="small"
                  css={css`
                    color: ${VisualizationColors.categorical.green.hex}};
                  `}
                />
              }
              {...a11yProps(0 + (card ? 1 : 0))}
            />
          )}
          {DatasetB && (
            <Tab
              label="Dataset B"
              icon={
                <StorageIcon
                  fontSize="small"
                  css={css`
                    color: ${VisualizationColors.categorical.yellow.hex}};
                  `}
                />
              }
              {...a11yProps(1 + (card ? 1 : 0))}
            />
          )}
        </Tabs>
      </AppBar>
      {card && (
        <TabPanel value={value} index={0}>
          <Storycard />
        </TabPanel>
      )}
      {DatasetA && (
        <TabPanel value={value} index={0 + (card ? 1 : 0)}>
          <DatasetA />
        </TabPanel>
      )}
      {DatasetB && (
        <TabPanel value={value} index={1 + (card ? 1 : 0)}>
          <DatasetB />
        </TabPanel>
      )}
    </div>
  );
}

DataTabs.propTypes = {
  Storycard: PropTypes.node,
  DatasetA: PropTypes.node.isRequired,
  DatasetB: PropTypes.node.isRequired
};
