import React, { PropTypes } from 'react';

const Logo = ({ alt }) => (
  <img src={require('../../assets/civic-logo.svg')} alt={alt} />
);

Logo.displayName = 'Logo';
Logo.propTypes = {
  alt: PropTypes.string,
};

export default Logo;
