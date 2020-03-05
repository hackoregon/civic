import React from "react";
import PropTypes from "prop-types";
import { isClient } from "@hackoregon/utils";
import animatedLogoInverted from "../../assets/civic-logo-invert-animated.svg";

const styles = {
  height: "60px",
  width: "auto"
};

const CivicLogoAnimatedInverted = ({ alt }) =>
  isClient && <img style={styles} src={animatedLogoInverted} alt={alt} />;

CivicLogoAnimatedInverted.displayName = "Logo";
CivicLogoAnimatedInverted.propTypes = {
  alt: PropTypes.string
};

export default CivicLogoAnimatedInverted;
