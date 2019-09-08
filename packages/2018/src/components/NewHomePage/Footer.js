/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Logo, BrandColors } from "@hackoregon/component-library";
import { defaultFontSize, browserDefaultSize } from "./index.styles";

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
`;

const logoStyle = css`
  height: 90px !important;
  justify-self: end;
`;

const textStyle = css`
  color: ${BrandColors.primary.hex};
  font-family: Rubik, sans-serif;
  font-weight: normal;
  font-size: ${defaultFontSize / browserDefaultSize}rem;
  line-height: ${50 / defaultFontSize}rem;
  text-decoration: none;
`;

const boldText = css`
  ${textStyle};
  font-weight: 500;
`;

const header = css`
  ${textStyle};
  font-size: ${30 / browserDefaultSize}rem;
`;

const Footer = props => (
  <footer css={footerWrapper}>
    <div css={contentWrapper(props)}>
      <div>
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
      <div
        css={css`
          display: grid;
          justify-content: center;
        `}
      >
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
