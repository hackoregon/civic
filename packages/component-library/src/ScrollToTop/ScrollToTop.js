import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon/Icon';

const hashToGoToTop = '#';
const styles = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
};

const ScrollToTop = ({ iconStyle = null }) => (
  <div>
    <a style={styles} aria-label="scroll to top" href={hashToGoToTop}>
      {iconStyle && <Icon className={iconStyle} />}
      <span>Back to Top</span>
    </a>
  </div>
);

ScrollToTop.displayName = 'ScrollToTop';
ScrollToTop.propTypes = {
  iconStyle: PropTypes.string,
};

export default ScrollToTop;
