import React from "react";
import PropTypes from "prop-types";
import { isClient } from "@hackoregon/utils";
import masterBuilders from "../../assets/civic-master-builders.svg";

const styles = {
  height: "60px",
  width: "auto"
};

const MasterBuilders = ({ alt, ...other }) =>
  isClient && <img style={styles} src={masterBuilders} alt={alt} {...other} />;

MasterBuilders.displayName = "Logo";
MasterBuilders.propTypes = {
  alt: PropTypes.string
};

export default MasterBuilders;
