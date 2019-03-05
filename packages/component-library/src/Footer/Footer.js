import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
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
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  margin-left: 0;
  margin-top: 200px;
  padding: 32px 40px;
  position: relative;
  box-sizing: border-box;
  border-top: 1px solid lightgrey;

  @media (min-width: 768px) {
    margin-left: 0;
  }

  @media (max-width: 850px) {
    padding: 32px 20px;
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

const logoLinkStyle = css`
  margin: 0 auto;
  border-bottom: none;
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

const defaultAttribution = `\u00A9 Copyright ${new Date().getFullYear()}`;

const Footer = ({ attribution }) => (
  <div className={footerClass}>
    <div className={copyrightClass}>{attribution}</div>
    <div className={logoClass}>
      <Link to="/" className={logoLinkStyle}>
        <LogoStandard />
      </Link>
    </div>
    <div className={scrollToTopClass}>
      <ScrollToTop iconStyle="fa fa-angle-up" />
    </div>
  </div>
);

Footer.displayName = 'Footer';

Footer.defaultProps = {
  attribution: defaultAttribution,
};

Footer.propTypes = {
  attribution: PropTypes.node,
};

export default Footer;
