import React from "react";
import PropTypes from "prop-types";
import { isClient } from "@hackoregon/utils";
import animatedLogo from "../../assets/civic-logo-animated.svg";

const styles = {
  height: "60px",
  width: "auto"
};

const CivicLogoAnimated = ({ alt }) =>
  isClient && <img style={styles} src={animatedLogo} alt={alt} />;

CivicLogoAnimated.displayName = "Logo";
CivicLogoAnimated.propTypes = {
  alt: PropTypes.string
};

export default CivicLogoAnimated;
