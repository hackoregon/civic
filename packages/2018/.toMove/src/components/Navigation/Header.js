import { Component } from "react";
import { Link } from "react-router";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import { Logo } from "@hackoregon/ui-brand";
import { BrandColors } from "@hackoregon/ui-themes";
import Nav from "./Nav";
import Icon from "../Icon/Icon";
import { ICONS } from "../styleConstants";

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

  togglesNestedMenu = () => {
    const { menuActive } = this.state;
    this.setState({ menuActive: !menuActive });
  };

  render() {
    const { children, menu, title, overlay, logoType } = this.props;
    const { menuActive, nestedMenu } = this.state;

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
          <div css={navClass} className={menuActive ? "active" : "inactive"}>
            <Nav
              menu={menu}
              toggleSubNav={this.togglesNestedMenu}
              showNestedMenu={nestedMenu}
              togglesNestedMenu={this.togglesNestedMenu}
            />

            {children}
          </div>
          <button type="button" css={burgerClass}>
            <Icon
              key="nav-burger"
              className={ICONS.hamburger}
              handleClick={this.togglesNestedMenu}
            />
          </button>
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
