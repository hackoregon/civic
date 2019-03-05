import React from 'react';
import PropTypes from 'prop-types';
import isClient from '../utils/isClient';

const styles = {
  height: '60px',
  width: 'auto',
};

const CivicLogo = ({ alt }) =>
  isClient && (
    <img
      style={styles}
      src={require('../../assets/civic-logo.svg')}
      alt={alt}
    />
  );

CivicLogo.displayName = 'Logo';
CivicLogo.propTypes = {
  alt: PropTypes.string,
};

export default CivicLogo;
