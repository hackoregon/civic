import PropTypes from "prop-types";
import React from "react";
import Icon from "../Icon/Icon";

const hashToGoToTop = "#site-header";
const styles = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center"
};

const ScrollToTop = ({ iconStyle = null }) => (
  <div>
    <a style={styles} href={hashToGoToTop}>
      {iconStyle && <Icon className={iconStyle} />}
      <span>Back to Top</span>
    </a>
  </div>
);

ScrollToTop.displayName = "ScrollToTop";
ScrollToTop.propTypes = {
  iconStyle: PropTypes.string
};

export default ScrollToTop;
