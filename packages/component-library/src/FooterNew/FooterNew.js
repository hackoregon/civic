/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Logo, BrandColors } from "../index";
import { defaultFontSize, browserDefaultSize } from "../../constants/styles";

const footerWrapper = css`
  height: 185px;
  width: 100%;
  background: #fff;

  position: relative;
  box-sizing: border-box;
`;

const contentWrapper = props => css`
  margin: 0 auto;
  max-width: ${props.greatestWidth}px;
  padding: 55px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: end;

  @media (max-width: ${props.collapseWidth}px) {
    grid-template-columns: 1fr auto auto;
  }

  @media (max-width: ${props.condensedWidth}px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-row-gap: 30px;
  }
`;

const businessWrapper = props => css`
  display: grid;
  justify-content: center;

  @media (max-width: ${props.collapseWidth}px) {
    padding: 0 40px;
  }

  @media (max-width: ${props.condensedWidth}px) {
    justify-content: start;
    padding: 0;
  }
`;

const logoStyle = props => css`
  height: 90px !important;
  justify-self: end;

  @media (max-width: ${props.condensedWidth}px) {
    justify-self: start;
  }
`;

const textStyle = css`
  color: ${BrandColors.primary.hex};
  font-family: Rubik, sans-serif;
  font-weight: normal;
  font-size: ${defaultFontSize / browserDefaultSize}rem;
  line-height: ${50 / defaultFontSize}rem;
  text-decoration: none;
  margin: 0;
`;

const boldText = css`
  ${textStyle};
  font-weight: 500;
`;

const header = css`
  ${textStyle};
  font-weight: 500;
  font-size: ${30 / browserDefaultSize}rem;
`;

const Footer = props => (
  <footer css={footerWrapper}>
    <div css={contentWrapper(props)}>
      <div id="contact-us">
        <p css={header}>Contact</p>
        <a css={textStyle} href="mailto:hi@civicsoftwarefoundation.org">
          hi@civicsoftwarefoundation.org
        </a>
        <p css={boldText}>Creative and Tech HQ</p>
        <p css={textStyle}>Portland, OR</p>
        <a css={textStyle} href="tel:12345678901">
          +1-234-567-8901
        </a>
      </div>
      <div css={businessWrapper(props)}>
        <div>
          <p css={boldText}>Business HQ</p>
          <p css={textStyle}>Washington, DC</p>
          <a css={textStyle} href="tel:12345678901">
            +1-234-567-8901
          </a>
        </div>
      </div>
      <Logo css={logoStyle} type="squareLogo" />
    </div>
  </footer>
);

Footer.displayName = "Footer";

export default Footer;
