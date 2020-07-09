import React from "react";
import PropTypes from "prop-types";
import { isClient } from "@hackoregon/utils";
import civicSandboxInverted from "../../assets/civic-sandbox-inverted.svg";

const styles = {
  height: "30px",
  width: "auto"
};

const CivicSandboxLogoInverted = ({ alt }) =>
  isClient && <img style={styles} src={civicSandboxInverted} alt={alt} />;

CivicSandboxLogoInverted.displayName = "Logo";
CivicSandboxLogoInverted.propTypes = {
  alt: PropTypes.string
};

export default CivicSandboxLogoInverted;
