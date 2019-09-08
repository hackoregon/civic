/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import { Logo } from "@hackoregon/component-library";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import hamburgerMenu from "../../assets/burger.svg";

const contentWrapper = css`
  margin: 0 auto;
  display: grid;
  padding: 16px 20px 0;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
`;

const logoStyle = css`
  height: 45px !important;
  justify-self: center;
`;

const hamburgerStyle = css`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;

  :focus {
    outline: none;
  }
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
      <List component="nav">
        <ListItem>
          <a>
            <ListItemText primary="EXPLORE CIVIC" />
          </a>
        </ListItem>

        <Divider />

        <ListSubheader component="div" id="nested-list-subheader">
          JOIN THE MOVEMENT
        </ListSubheader>
        <ListItem>
          <a href="#work-with-us">
            <ListItemText primary="Work With Us" />
          </a>
        </ListItem>
        <ListItem>
          <a href="#become-a-contributor">
            <ListItemText primary="Become a Contributor" />
          </a>
        </ListItem>

        <Divider />

        <ListSubheader component="div" id="nested-list-subheader">
          ABOUT
        </ListSubheader>
        <ListItem>
          <a href="#civic-platform">
            <ListItemText primary="Civic Platform" />
          </a>
        </ListItem>
        <ListItem>
          <a href="#civic-software-foundation">
            <ListItemText primary="Civic Software Foundation" />
          </a>
        </ListItem>

        <Divider />

        <ListItem>
          <a>
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
          <img src={hamburgerMenu} alt="Open or close menu" />
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
