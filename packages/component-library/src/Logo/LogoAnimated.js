import React from 'react';
import PropTypes from 'prop-types';
import isClient from '../utils/isClient';

const styles = {
  height: '60px',
  width: 'auto',
};

const Logo = ({ alt }) =>
  isClient && (
    <img
      style={styles}
      src={require('../../assets/civic-logo-invert-animated.svg')}
      alt={alt}
    />
  );

Logo.displayName = 'Logo';
Logo.propTypes = {
  alt: PropTypes.string,
};

export default Logo;
