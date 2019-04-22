import PropTypes from "prop-types";
import React from "react";
import { css } from "emotion";

const baseMapMenu = css(`
  position: absolute;
  background: #f3f2f3;
  padding: 10px;
  bottom: 0;
  right: 0;
  z-index: 2;
  font-family: "Roboto Condensed", sans-serif;
`);

const SandboxBaseMapSelector = ({ onBaseMapStyleChange, baseMapStyle }) => {
  return (
    <>
      <div className={baseMapMenu}>
        <input
          checked={baseMapStyle === "light"}
          type="radio"
          value="light"
          onChange={onBaseMapStyleChange}
        />
        <label for="light">Light</label>
        <input
          checked={baseMapStyle === "dark"}
          type="radio"
          value="dark"
          onChange={onBaseMapStyleChange}
        />
        <label for="dark">Dark</label>
      </div>
    </>
  );
};

SandboxBaseMapSelector.propTypes = {
  onBaseMapStyleChange: PropTypes.func.isRequired,
  baseMapStyle: PropTypes.string.isRequired
};

export default SandboxBaseMapSelector;
