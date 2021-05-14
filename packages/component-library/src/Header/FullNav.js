/* eslint-disable no-unused-vars */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useRef } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router";

import navCaret from "../../assets/nav-caret.svg";
import { defaultFontSize } from "../_Constants/styles";
import { Logo, BrandColors } from "../index";

const { primary, action } = BrandColors;
const menuColor = "#F3F2F3";

const dropdownStyles = {
  marginTop: "30px",
  backgroundColor: menuColor
};

const optionText = {
  fontFamily: "Rubik, sans-serif",
  fontWeight: 500,
  fontSize: `${16 / defaultFontSize}rem`,
  lineHeight: `${37 / defaultFontSize}rem`,
  color: primary.hex
};

const contentWrapper = props => css`
  max-width: ${props.greatestWidth}px;
  margin: 0 auto;
  display: grid;
  padding: 8px 20px 0;
  align-items: center;
  grid-template-columns: 80px 1fr 645px;
`;

const logoStyle = css`
  height: 60px !important;
`;

const navStyle = css`
  display: grid;
  justify-self: end;
`;

const linkContainer = css`
  display: grid;
  justify-self: end;
  grid-template-columns: repeat(4, max-content);
  grid-gap: ${48 / defaultFontSize}rem;
  justify-items: end;
  margin: 0;
  padding: 0;
`;

const listStyle = css`
  display: unset;
  text-align: unset;
`;

const linkStyle = css`
  font-weight: 500;
  font-family: Rubik, sans-serif;
  font-size: ${24 / defaultFontSize}rem;
  line-height: ${28 / defaultFontSize}rem;
  color: ${primary.hex};
  text-decoration: none;
`;

const menuButton = css`
  ${linkStyle};
  display: inline-grid;
  text-align: end;
  align-items: end;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  color: inherit;
  cursor: pointer;
`;

const buttonText = css`
  line-height: unset;
  margin: 0;

  :hover {
    color: ${action.hex};
  }
`;

const caratStyle = css`
  height: 8px;
  margin-left: 5px;
  padding-bottom: 2px;
`;

const arrowUp = css`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid ${menuColor};
`;

const menuLink = css`
  color: ${primary.hex};
  text-decoration: none;
`;

const FullNav = props => {
  const [joinOpen, setJoinOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const joinAnchorRef = useRef(null);
  const aboutAnchorRef = useRef(null);

  function handleJoinToggle() {
    setJoinOpen(prevOpen => !prevOpen);
  }

  function handleAboutToggle() {
    setAboutOpen(prevOpen => !prevOpen);
  }

  function handleJoinClose(event) {
    if (joinAnchorRef.current && joinAnchorRef.current.contains(event.target)) {
      return;
    }
    setJoinOpen(false);
  }

  function handleAboutClose(event) {
    if (
      aboutAnchorRef.current &&
      aboutAnchorRef.current.contains(event.target)
    ) {
      return;
    }
    setAboutOpen(false);
  }

  return (
    <div css={contentWrapper(props)}>
      <Link to="/">
        <Logo alt="CIVIC home page" css={logoStyle} type="squareLogo" />
      </Link>
      <div />
      <nav css={navStyle} aria-label="Site">
        <ul css={linkContainer}>
          <li css={listStyle}>
            <Link
              to={{
                hash: "#"
              }}
              css={linkStyle}
            >
              DEMO ONLY
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default FullNav;
