/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Logo, BrandColors } from "@hackoregon/component-library";
import Select from "react-select";
import { defaultFontSize } from "./NewHomePage.styles";

const { primary } = BrandColors;

const headerWrapper = css`
  height: 115px;
  width: 100vw;
  position: fixed;
  background: #fdfdfd;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  margin: 0;
  top: 0;
  z-index: 100;
`;

const contentWrapper = css`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  padding: 22px 0 8px;
  align-items: center;
  grid-template-columns: 80px auto 831px;
`;

const logoStyle = css`
  height: 90px !important;
`;

const linkContainer = css`
  display: grid;
  justify-self: end;
  grid-template-columns: repeat(4, max-content);
  grid-gap: ${48 / defaultFontSize}em;

  justify-items: end;
`;

const linkStyle = css`
  font-weight: 500;
  font-family: Rubik, sans-serif;
  font-size: ${24 / defaultFontSize}em;
  line-height: ${28 / defaultFontSize}em;
  color: ${primary.hex};
  text-decoration: none;
`;

const Header = () => {
  return (
    <header css={headerWrapper}>
      <div css={contentWrapper}>
        <Logo css={logoStyle} type="squareLogo" />
        <div />
        <nav css={linkContainer} aria-label="Site">
          <ul>
            <li>
              <a css={linkStyle}>EXPLORE CIVIC</a>
            </li>
            <li>
              <a css={linkStyle}>JOIN THE MOVEMENT</a>
            </li>
            <li>
              <a css={linkStyle}>ABOUT</a>
            </li>
            <li>
              <a css={linkStyle}>CONTACT</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
