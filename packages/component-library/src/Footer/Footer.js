import React from 'react';
import LogoStandard from '../Logo/LogoStandard';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import styles from './Footer.css';

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.copyright}>&copy; Copyright {(new Date()).getFullYear()}</div>
    <div className={styles.logo}><LogoStandard /></div>
    <div className={styles.scrollToTop}><ScrollToTop iconStyle="fa fa-angle-up" /></div>
  </div>

);

Footer.displayName = 'Footer';

export default Footer;
// src={isClient ? require('../../assets/civic-logo-stack_standard.svg') : ''}
