/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useRef } from "react";
import { Logo, BrandColors } from "@hackoregon/component-library";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

import { defaultFontSize } from "./index.styles";
import navCaret from "../../assets/nav-caret.svg";
import menuVector from "../../assets/menu-vector.svg";

const { primary, action } = BrandColors;

const dropdownStyles = {
  marginTop: "30px",
  backgroundColor: "#F3F2F3"
};

const optionText = {
  fontFamily: "Rubik, sans-serif",
  fontWeight: 500,
  fontSize: `${16 / defaultFontSize}em`,
  lineHeight: `${37 / defaultFontSize}em`,
  color: primary.hex
};

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

const navStyle = css`
  display: grid;
  justify-self: end;
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

  :focus {
    outline: none;
  }
`;

const buttonText = css`
  line-height: unset;

  :hover {
    color: ${action.hex};
  }
`;

const caratStyle = css`
  height: 8px;
  margin-left: 5px;
  padding-bottom: 2px;
`;

const vectorStyle = css`
  position: absolute;
  top: 12px;
  right: 20px;
`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  return (
    <header css={headerWrapper}>
      <div css={contentWrapper}>
        <Logo css={logoStyle} type="squareLogo" />
        <div />
        <nav css={navStyle} aria-label="Site">
          <ul css={linkContainer}>
            <li>
              <a css={linkStyle}>EXPLORE CIVIC</a>
            </li>
            <li>
              <button
                css={menuButton}
                type="button"
                ref={anchorRef}
                aria-controls="menu-list-grow"
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <p css={buttonText}>
                  JOIN THE MOVEMENT
                  <span>
                    <img css={caratStyle} src={navCaret} alt="" />
                  </span>
                </p>
              </button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                      ...dropdownStyles
                    }}
                  >
                    <Paper
                      id="menu-list-grow"
                      square
                      style={dropdownStyles.menu}
                    >
                      <img src={menuVector} css={vectorStyle} alt="" />
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList>
                          <MenuItem
                            onClick={handleClose}
                            style={optionText}
                            dense
                          >
                            Work With Us
                          </MenuItem>
                          <MenuItem
                            onClick={handleClose}
                            style={optionText}
                            dense
                          >
                            Become a Contributor
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
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
