import React from 'react';
import isClient from '../utils/isClient';

const styles = {
  height: '60px',
  width: 'auto',
};

const LogoStandard = () => (
  <img
    alt="Hack Oregon footer logo"
    src={isClient ? require('../../assets/civic-logo-stack_standard.svg') : ''}
    style={styles}
  />
);

export default LogoStandard;
