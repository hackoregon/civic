/* TODO: Fix linting errors */
/* eslint-disable */

import { Component } from "react";
import { Link } from "react-router";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import Nav from "./Nav";
import Logo from "../Logo/Logo";
import Icon from "../Icon/Icon";
import { ICONS } from "../styleConstants";
import { BrandColors } from "../_Themes/index";

const containerClass = css`
  width: 100%;
  min-width: 320px;
`;

const overlayContainerClass = css`
  ${containerClass};
  position: fixed;
  z-index: 100;
`;

const headerClass = css`
  background-color: ${BrandColors.heroPurple.hex};
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 320px;
  margin: 0 auto;
  padding: 0;
`;

const overlayHeaderClass = css`
  ${headerClass};
  background-color: transparent;
`;

const navClass = css`
  margin: 0 30px 0 0;
  display: block;

  @media (max-width: 640px) {
    &.active {
      display: block;
    }

    &.inactive {
      display: none;
    }
  }
`;

const logoClass = css`
  margin: 12px 24px;
  flex: 2;
`;

const logoLinkClass = css`
  border: none;
  opacity: 1;
  transition: none;
`;

const burgerClass = css`
  a& {
    display: none;
    padding: 2rem;
    border: none;
    padding-right: 0;
    margin-right: 2rem;

    @media (max-width: 640px) {
      display: block;
    }
  }
`;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuActive: false
    };
  }

  togglesNestedMenu = () =>
    this.setState({ menuActive: !this.state.menuActive });

  render() {
    const { children, menu, title, overlay, logoType } = this.props;
    return (
      <header
        css={overlay ? overlayContainerClass : containerClass}
        id="site-header"
      >
        <nav
          css={overlay ? overlayHeaderClass : headerClass}
          style={{ backgroundColor: BrandColors.heroPurple.hex }}
        >
          <div css={logoClass}>
            <Link css={logoLinkClass} to="/">
              <Logo type={logoType} alt={title} />
            </Link>
          </div>
          <div
            css={navClass}
            className={this.state.menuActive ? "active" : "inactive"}
          >
            <Nav
              menu={menu}
              toggleSubNav={this.togglesNestedMenu}
              showNestedMenu={this.state.nestedMenu}
              togglesNestedMenu={this.togglesNestedMenu}
            />

            {children}
          </div>
          <a css={burgerClass}>
            <Icon
              key="nav-burger"
              className={ICONS.hamburger}
              handleClick={this.togglesNestedMenu}
            />
          </a>
        </nav>
      </header>
    );
  }
}

Header.displayName = "Header";
Header.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  children: PropTypes.node,
  overlay: PropTypes.bool,
  logoType: PropTypes.string
};

Header.defaultProps = {
  logoType: "standardLogoAnimatedInverted"
};

export default Header;
