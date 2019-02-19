import React from 'react';
import PropTypes from 'prop-types';
import isClient from '../utils/isClient';

const styles = {
  height: '60px',
  width: 'auto',
};

const CivicLogoInverted = ({ alt }) => (isClient && <img style={styles} src={require('../../assets/civic-logo-inverted.svg')} alt={alt} />);

CivicLogoInverted.displayName = 'Logo';
CivicLogoInverted.propTypes = {
  alt: PropTypes.string,
};

export default CivicLogoInverted;
