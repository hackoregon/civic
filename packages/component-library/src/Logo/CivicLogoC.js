import React from 'react';
import PropTypes from 'prop-types';
import isClient from '../utils/isClient';

const styles = {
  height: '60px',
  width: 'auto',
};

const CivicLogoC = ({ alt }) => (isClient && <img style={styles} src={require('../../assets/civic-logo-c.svg')} alt={alt} />);

CivicLogoC.displayName = 'Logo';
CivicLogoC.propTypes = {
  alt: PropTypes.string,
};

export default CivicLogoC;
