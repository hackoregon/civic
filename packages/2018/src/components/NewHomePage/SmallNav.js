/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import { Logo, BrandColors } from "@hackoregon/component-library";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router";
import hamburgerMenu from "../../assets/burger.svg";
import { defaultFontSize } from "./index.styles";

const { primary, secondary } = BrandColors;

const contentWrapper = css`
  margin: 0 auto;
  display: grid;
  padding: 16px 20px 12px;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
`;

const logoStyle = css`
  height: 45px !important;
  justify-self: center;
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
        <Logo css={logoStyle} type="squareLogo" />
        <div />
      </div>
      <List component="nav" style={{ paddingTop: 0 }}>
        <Divider />
        <ListItem>
          <Link to="/cards" css={linkStyle}>
            <ListItemText primary="EXPLORE CIVIC" />
          </Link>
        </ListItem>

        <Divider />

        <ListSubheader component="div" id="nested-list-subheader">
          <p css={subHeaderStyle}>JOIN THE MOVEMENT</p>
        </ListSubheader>
        <ListItem>
          <a css={subLinkStyle} href="#work-with-us">
            <ListItemText primary="Work With Us" />
          </a>
        </ListItem>
        <ListItem>
          <a css={subLinkStyle} href="#become-a-contributor">
            <ListItemText primary="Become a Contributor" />
          </a>
        </ListItem>

        <Divider />

        <ListSubheader component="div" id="nested-list-subheader">
          <p css={subHeaderStyle}>ABOUT</p>
        </ListSubheader>
        <ListItem>
          <a css={subLinkStyle} href="#civic-platform">
            <ListItemText primary="Civic Platform" />
          </a>
        </ListItem>
        <ListItem>
          <a css={subLinkStyle} href="#civic-software-foundation">
            <ListItemText primary="Civic Software Foundation" />
          </a>
        </ListItem>

        <Divider />

        <ListItem>
          <a css={linkStyle} href="#contact-us">
            <ListItemText primary="CONTACT" />
          </a>
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
      <Logo css={logoStyle} type="squareLogo" />
      <div />
    </nav>
  );
};

export default SmallNav;
