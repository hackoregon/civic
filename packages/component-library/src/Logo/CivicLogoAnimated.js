import React from "react";
import PropTypes from "prop-types";
import isClient from "../utils/isClient";

const styles = {
  height: "60px",
  width: "auto"
};

const CivicLogoAnimated = ({ alt }) =>
  isClient && (
    <img
      style={styles}
      src={require("../../assets/civic-logo-animated.svg")}
      alt={alt}
    />
  );

CivicLogoAnimated.displayName = "Logo";
CivicLogoAnimated.propTypes = {
  alt: PropTypes.string
};

export default CivicLogoAnimated;
