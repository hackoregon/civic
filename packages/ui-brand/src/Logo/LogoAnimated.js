import React from "react";
import PropTypes from "prop-types";
import { isClient } from "@hackoregon/utils";
import logoAnimatedInvert from "../../assets/civic-logo-invert-animated.svg";

const styles = {
  height: "60px",
  width: "auto"
};

const Logo = ({ alt }) =>
  isClient && <img style={styles} src={logoAnimatedInvert} alt={alt} />;

Logo.displayName = "Logo";
Logo.propTypes = {
  alt: PropTypes.string
};

export default Logo;
