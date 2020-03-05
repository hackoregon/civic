import React from "react";
import PropTypes from "prop-types";
import { isClient } from "@hackoregon/utils";
import logoInverted from "../../assets/civic-logo-invert.svg";

const styles = {
  height: "60px",
  width: "auto"
};

const CivicLogoInverted = ({ alt }) =>
  isClient && <img style={styles} src={logoInverted} alt={alt} />;

CivicLogoInverted.displayName = "Logo";
CivicLogoInverted.propTypes = {
  alt: PropTypes.string
};

export default CivicLogoInverted;
