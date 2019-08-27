/* TODO: Fix linting errors */

import { Component } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import shortid from "shortid";
import NavSubMenu from "./NavSubMenu";
import NavLink from "./NavRouterLink";
import Icon from "../Icon/Icon";

const defaultMenu = [
  {
    name: "Collections",
    path: "/",
    nestedMenu: [
      { name: "Disaster Resilience", path: "/cities/portland/disaster" },
      { name: "Housing Affordability", path: "/cities/portland/housing" },
      { name: "Local Elections", path: "/cities/portland/elections" },
      {
        name: "Neighborhood Development",
        path: "/cities/portland/neighborhood"
      },
      {
        name: "Transportation Systems",
        path: "/cities/portland/transportation"
      }
    ]
  },
  {
    name: "Sandbox",
    path: "/sandbox"
  }
];

const navClass = css`
  position: relative;
  min-width: 320px;

  & ul {
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: center;

    & > li {
      flex: 1 1 100%;

      & span i {
        margin-left: 10px;
      }
    }
  }

  & .nav-item {
    color: white;
    flex: 1;
    display: block;
    font-family: "Rubik", sans-serif;
    font-size: 1.25rem;
    border: none;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1rem;
    text-align: center;

    &:hover {
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
    }
  }

  @media (max-width: 640px) {
    position: absolute;
    z-index: 10001;
    height: 100%;
    width: 100%;
    margin: 0 !important;
    padding: 0 !important;
    top: 0;
    left: 0;
    background-color: rgb(34, 15, 37);

    & ul {
      display: block;
      position: relative;
      margin: 0;
      padding-top: 80px;

      & > li {
        color: #fff;
        display: block;
        text-align: center;
        text-decoration: none;
        transition: all 0.25s ease-in-out;
        margin: 0;
        padding: 0;
        flex: none;
      }
    }
  }
`;

const exClass = css`
  display: none;
  position: absolute;
  right: 0;
  width: auto;
  z-index: 99999;

  @media (max-width: 640px) {
    display: block;
    color: rgba(255, 255, 255, 0.65);
    border: none;
    font-family: "Rubik", sans-serif;
    font-size: 1.25rem;
    font-weight: 500;
    padding: 2rem;
  }
`;

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      menuActive: false,
      items: []
    };
  }

  handleClick = (name, menu, e) => {
    e.preventDefault();
    const items = menu;

    this.setState(prevState => ({ menuActive: !prevState.menuActive, items }));
  };

  render() {
    const {
      menu = defaultMenu,
      toggleNestedMenu = this.handleClick,
      toggleSubNav
    } = this.props;
    const { menuActive, items } = this.state;
    /* eslint-disable jsx-a11y/anchor-is-valid */
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    return (
      <div css={navClass}>
        <a css={exClass}>
          <Icon
            key="nav-ex"
            className="fa fa-times"
            handleClick={toggleSubNav}
          />
        </a>
        <ul>
          {menu.map(item =>
            item.nestedMenu ? (
              <li
                key={shortid.generate()}
                onClick={e => toggleNestedMenu(item.name, item.nestedMenu, e)}
              >
                <a className="nav-item">
                  {item.name}
                  <Icon className="fa fa-angle-down" />
                </a>
              </li>
            ) : (
              <NavLink
                key={shortid.generate()}
                name={item.name}
                path={item.path}
              />
            )
          )}
        </ul>
        <NavSubMenu isVisible={menuActive} items={items} />
      </div>
    );
    /* eslint-enable jsx-a11y/anchor-is-valid */
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  }
}

Nav.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, path: PropTypes.string })
  ),
  toggleNestedMenu: PropTypes.func,
  toggleSubNav: PropTypes.func
};

export default Nav;
