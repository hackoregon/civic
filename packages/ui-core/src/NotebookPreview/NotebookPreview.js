/* eslint-disable import/prefer-default-export */
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { Icon } from "../Icon/Icon";

const header = css`
  padding-left: 1rem;
`;

const useProjectStyles = makeStyles({
  card: {
    "&:hover": {
      boxShadow:
        "0px 2px 6px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 4px 2px -1px rgba(0,0,0,0.12)"
    }
  }
});

export const NotebookPreview = ({ message, link }) => {
  const classes = useProjectStyles();

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Card className={classes.card}>
        <h3 css={header}>
          <Icon className="fa fa-book" />
          {` ${message}`}
        </h3>
      </Card>
    </a>
  );
};
NotebookPreview.propTypes = {
  message: PropTypes.string,
  /** a url */
  link: PropTypes.string
};

NotebookPreview.defaultProps = {
  message: "See the data science notebook",
  link: "https://github.com/hackoregon/"
};

NotebookPreview.displayName = "NotebookPreview";
