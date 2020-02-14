import React from "react";
import PropTypes from "prop-types";
import isClient from "../utils/isClient";
import hackOregonLogo from "../../assets/hack-oregon-logo.svg";

const styles = {
  height: "60px",
  width: "auto"
};

const HackOregonLogo = ({ alt, ...other }) =>
  isClient && <img style={styles} src={hackOregonLogo} alt={alt} {...other} />;

HackOregonLogo.displayName = "Logo";
HackOregonLogo.propTypes = {
  alt: PropTypes.string
};

export default HackOregonLogo;
