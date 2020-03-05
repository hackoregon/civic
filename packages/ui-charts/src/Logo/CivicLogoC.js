import React from "react";
import PropTypes from "prop-types";
import isClient from "../utils/isClient";
import logoC from "../../assets/civic-logo-c.svg";

const styles = {
  height: "60px",
  width: "auto"
};

const CivicLogoC = ({ alt, ...other }) =>
  isClient && <img style={styles} src={logoC} alt={alt} {...other} />;

CivicLogoC.displayName = "Logo";
CivicLogoC.propTypes = {
  alt: PropTypes.string
};

export default CivicLogoC;
