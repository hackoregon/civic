/* TODO: Fix linting errors */
/* eslint-disable */
import PropTypes from "prop-types";
import React from "react";
import { css } from "emotion";

const baseMapMenu = css(`
  padding: 10px;
  z-index: 2;
  font-family: "Roboto Condensed", sans-serif;
`);

const SandboxBaseMapSelector = ({ onBaseMapStyleChange, baseMapStyle }) => {
  return (
    <React.Fragment>
      <div className={baseMapMenu}>
        <input
          checked={baseMapStyle === "light"}
          type="radio"
          value="light"
          onChange={onBaseMapStyleChange}
        />
        <label htmlFor="light">Light</label>
        <input
          checked={baseMapStyle === "dark"}
          type="radio"
          value="dark"
          onChange={onBaseMapStyleChange}
        />
        <label htmlFor="dark">Dark</label>
      </div>
    </React.Fragment>
  );
};

SandboxBaseMapSelector.propTypes = {
  onBaseMapStyleChange: PropTypes.func.isRequired,
  baseMapStyle: PropTypes.string.isRequired
};

export default SandboxBaseMapSelector;
