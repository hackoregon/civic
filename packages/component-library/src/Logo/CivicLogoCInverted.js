import React from "react";
import PropTypes from "prop-types";
import isClient from "../utils/isClient";

const styles = {
  height: "60px",
  width: "auto"
};

const CivicLogoCInverted = ({ alt }) =>
  isClient && (
    <img
      style={styles}
      src={require("../../assets/civic-logo-c-invert.svg")}
      alt={alt}
    />
  );

CivicLogoCInverted.displayName = "Logo";
CivicLogoCInverted.propTypes = {
  alt: PropTypes.string
};

export default CivicLogoCInverted;
