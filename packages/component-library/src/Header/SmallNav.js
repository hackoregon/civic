/* eslint-disable no-unused-vars */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router";

import hamburgerMenu from "../../assets/burger.svg";
import { defaultFontSize } from "../_Constants/styles";
import { Logo, BrandColors } from "../index";

const { primary, secondary } = BrandColors;

const contentWrapper = css`
  margin: 0 auto;
  display: grid;
  padding: 16px 20px 12px;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
`;

const logoWrapper = css`
  justify-self: center;
`;

const logoStyle = css`
  height: 45px !important;
`;

// Padding makes it easier to click
const hamburgerStyle = css`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  padding: 10px 10px 10px 0;

  :focus {
    outline: none;
  }
`;

const linkStyle = css`
  font-weight: 500;
  font-family: Rubik, sans-serif;
  font-size: ${24 / defaultFontSize}rem;
  line-height: ${28 / defaultFontSize}rem;
  color: ${primary.hex};
  text-decoration: none;
`;

const subHeaderStyle = css`
  ${linkStyle};
  color: ${secondary.hex};
  padding-top: 8px;
  margin: 0;
`;

const subLinkStyle = css`
  ${linkStyle};
  padding-left: 20px;
`;

const SmallNav = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = isOpen => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(isOpen);
  };

  const fullList = () => (
    <div
      className={{
        width: "auto"
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div css={contentWrapper}>
        <div>
          <button
            type="button"
            onClick={toggleDrawer(false)}
            css={hamburgerStyle}
          >
            <img src={hamburgerMenu} alt="Close menu" />
          </button>
        </div>
        <Link to="/" css={logoWrapper}>
          <Logo type="squareLogo" css={logoStyle} />
        </Link>
        <div />
      </div>
      <List component="nav" style={{ paddingTop: 0 }}>
        <ListItem>
          <Link
            to={{
              hash: "#contact-us"
            }}
            css={subLinkStyle}
          >
            <ListItemText primary="DEMO ONLY" />
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <nav css={contentWrapper}>
      <div>
        <button type="button" onClick={toggleDrawer(true)} css={hamburgerStyle}>
          <img src={hamburgerMenu} alt="Open menu" />
        </button>
        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
          {fullList()}
        </Drawer>
      </div>
      <Link to="/" css={logoWrapper}>
        <Logo type="squareLogo" css={logoStyle} />
      </Link>
      <div />
    </nav>
  );
};

export default SmallNav;
