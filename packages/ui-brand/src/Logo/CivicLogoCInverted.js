import React from "react";
import PropTypes from "prop-types";
import { isClient } from "@hackoregon/utils";
import logoCInverted from "../../assets/civic-logo-c-invert.svg";

const styles = {
  height: "60px",
  width: "auto"
};

const CivicLogoCInverted = ({ alt }) =>
  isClient && <img style={styles} src={logoCInverted} alt={alt} />;

CivicLogoCInverted.displayName = "Logo";
CivicLogoCInverted.propTypes = {
  alt: PropTypes.string
};

export default CivicLogoCInverted;
