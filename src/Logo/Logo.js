import React, { PropTypes } from 'react';
import isClient from '../utils/isClient';

const styles = {
  height: '80px',
  width: 'auto',
};

const Logo = ({ alt }) => (isClient && <img style={styles} src={require('../../assets/civic-logo-animated-invert.svg')} alt={alt} />);

Logo.displayName = 'Logo';
Logo.propTypes = {
  alt: PropTypes.string,
};

export default Logo;
