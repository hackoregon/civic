import React from "react";
import PropTypes from "prop-types";
import { isClient } from "@hackoregon/utils";
import logo from "../../assets/civic-logo.svg";

const styles = {
  height: "60px",
  width: "auto"
};

const CivicLogo = ({ alt }) =>
  isClient && <img style={styles} src={logo} alt={alt} />;

CivicLogo.displayName = "Logo";
CivicLogo.propTypes = {
  alt: PropTypes.string
};

export default CivicLogo;
