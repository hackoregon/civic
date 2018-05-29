import React from 'react';
import PropTypes from 'prop-types';
import isClient from '../utils/isClient';

var styles = {
  height: '60px',
  width: 'auto'
};

var Logo = function Logo(_ref) {
  var alt = _ref.alt;
  return isClient && React.createElement('img', { style: styles, src: require('../../assets/civic-logo-invert-animated.svg'), alt: alt });
};

Logo.displayName = 'Logo';
Logo.propTypes = {
  alt: PropTypes.string
};

export default Logo;