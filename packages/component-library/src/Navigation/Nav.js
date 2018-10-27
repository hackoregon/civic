import React, { Component } from 'react';
import { css } from 'emotion';
import NavSubMenu from './NavSubMenu';
import NavLink from './NavRouterLink';
import Icon from '../Icon/Icon';
import PropTypes from 'prop-types';

const defaultMenu = [
  {
    name: 'Collections',
    path: '/',
    nestedMenu: [
      { name: 'Disaster Resilience', path: '/cities/portland/disaster' },
      { name: 'Housing Affordability', path: '/cities/portland/housing' },
      { name: 'Local Elections', path: '/cities/portland/elections' },
      { name: 'Neighborhood Development', path: '/cities/portland/neighborhood' },
      { name: 'Transportation Systems', path: '/cities/portland/transportation' },
    ],
  },
  {
    name: 'Sandbox',
    path: '/sandbox',
  },
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
    font-family: 'Rubik', sans-serif;
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
    z-index: 1;
    height: 100%;
    width: 100%;
    margin: 0 !important;
    padding: 0 !important;
    top: 0;
    left: 0;
    background-color: rgb(34, 15, 37);

    & ul {
      display: block;position: relative;
      margin: 0;
      padding-top: 80px;

      & > li {
        color: #FFF;
        display: block;
        text-align: center;
        text-decoration: none;
        transition: all .25s ease-in-out;
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
    right: 1rem;
    width: auto;
    z-index: 99999;

    @media (max-width: 640px) {
      display: block;
      color: rgba(255, 255, 255, 0.65);
      border: none;
      font-family: 'Rubik', sans-serif;
      font-size: 1.25rem;
      font-weight: 500;
      padding: 1rem;
    }
`;

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      menuActive: false,
      items: [],
    };
  }

  handleClick = (name, menu, e) => {
    e.preventDefault();
    const items = menu;

    this.setState(() => ({ menuActive: !this.state.menuActive, items }));
  }

  render() {
    const { menu = defaultMenu, toggleNestedMenu = this.handleClick } = this.props;
    return (
      <div className={navClass}>
        <a className={exClass}><Icon key="nav-ex" className={'fa fa-times'} handleClick={this.props.toggleSubNav} /></a>
        <ul>
          {menu.map((item, idx) =>
            (item.nestedMenu
              ? <li key={idx} onClick={e => toggleNestedMenu(item.name, item.nestedMenu, e)}><a className={'nav-item'}>{item.name}<Icon className={'fa fa-angle-down'}></Icon></a></li> // eslint-disable-line
              : <NavLink
                key={idx}
                name={item.name}
                path={item.path}
              />
            ))
          }
        </ul>
        <NavSubMenu isVisible={this.state.menuActive} items={this.state.items} />
      </div>
    );
  }
    }

Nav.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, path: PropTypes.string })),
  toggleNestedMenu: PropTypes.func,
  toggleSubNav: PropTypes.func,
};

export default Nav;
