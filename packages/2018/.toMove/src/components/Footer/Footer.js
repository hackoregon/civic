import PropTypes from "prop-types";
import { Link } from "react-router";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Logo } from "@hackoregon/ui-brand";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const commonFont = `
  font-family: 'Rubik';
  font-weight: 500;
`;

const commonMargin = "12px 8px";

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
  <footer css={footerClass}>
    <div css={copyrightClass}>{attribution}</div>
    <div css={logoClass}>
      <Link to="/" alt="civic homepage" css={logoLinkStyle}>
        <Logo type="standardLogo" />
      </Link>
    </div>
    <div css={scrollToTopClass}>
      <ScrollToTop iconStyle="fa fa-angle-up" />
    </div>
  </footer>
);

Footer.displayName = "Footer";

Footer.defaultProps = {
  attribution: defaultAttribution
};

Footer.propTypes = {
  attribution: PropTypes.node
};

export default Footer;
