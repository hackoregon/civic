/* TODO: Fix linting errors */
/* eslint-disable */

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import { css } from 'emotion';

const visibleClass = css`
  visibility: visible;
  opacity: 1;
  margin-top: 10px;
`;

const hiddenClass = css`
  visibility: hidden;
  opacity: 0;
`;

const nestedMenuClass = css`
  & a {
    color: rgba(255, 255, 255, 0.65);
    flex: 1;
    display: block;
    font-family: 'Rubik', sans-serif;
    font-size: 1.25rem;
    border: none;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1rem;
    text-align: center;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
  }

  @media (min-width: 641px) {
    position: absolute;
    z-index: 999;
    margin-top: 0;
    width: 200px;
    background-color: #fff;
    padding: 20px;
    transition: all 0.5s cubic-bezier(0.42, 0, 0.14, 1);

    &::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -24px;
      border-width: 12px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }

    & a {
      color: rgb(238, 73, 92);
      padding: 5px 0;
      text-align: left;
      font-size: 16px;
      flex: 1;
      display: block;
      font-family: 'Rubik', sans-serif;
      text-transform: uppercase;
      text-decoration: none;
      border: none;
    }
  }
`;

const pathOrName = (p, n) => p || `/${n.toLowerCase()}`;

const NavSubMenu = ({ items, isVisible }) => (
  <div
    className={`${nestedMenuClass} ${isVisible ? visibleClass : hiddenClass}`}
  >
    {items.map((item, index) => (
      <Link key={index} to={pathOrName(item.path, item.name)}>
        <span className="nested-menu-link">{item.name}</span>
      </Link>
    ))}
  </div>
);

NavSubMenu.displayName = 'NavSubMenu';
NavSubMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  isVisible: PropTypes.bool,
};

export default NavSubMenu;
