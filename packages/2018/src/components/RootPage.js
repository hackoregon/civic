import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const RootPage = ({ children }) => <div>{children}</div>;

RootPage.propTypes = {
  children: PropTypes.node
};

RootPage.displayName = "Root";

export default connect(
  () => ({}),
  () => ({})
)(RootPage);
