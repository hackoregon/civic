import React from 'react';
import { css } from 'emotion';
import LogoStandard from '../Logo/LogoStandard';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const commonFont = `
  font-family: 'Rubik';
  font-weight: 500;
`;

const commonMargin = '12px 8px';

const footerClass = css`
  width: 100%;
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-direction: row;

  @media (min-width: 768px) {
    margin-left: 0;
  }
`;

const copyrightClass = css`
  color: #726371;
  ${commonFont}
  margin: ${commonMargin};
`;

const logoClass = css`
  flex: 2 auto;
  display: flex;
  align-items: center;
  height: auto;

  & > img {
    flex: 1;
    padding: 12px;
  }
`;

const scrollToTopClass = css`
  color: #EE495C;
  ${commonFont}
  margin: ${commonMargin};

  & > div {
    margin-left: auto;
  }

  @media (min-width: 758px) {
    margin-left: 0;
  }
`;

const Footer = () => (
  <div className={footerClass}>
    <div className={copyrightClass}>&copy; Copyright {(new Date()).getFullYear()}</div>
    <div className={logoClass}><LogoStandard /></div>
    <div className={scrollToTopClass}><ScrollToTop iconStyle="fa fa-angle-up" /></div>
  </div>

);

Footer.displayName = 'Footer';

export default Footer;
