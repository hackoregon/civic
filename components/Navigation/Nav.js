import React from 'react';
import NavLink from './NavRouterLink';
import './Nav.css';

const defaultMenu = ['Collections', 'Explore', 'About'];

const Nav = ({ menu = defaultMenu }) => (
  <ul style={{ display: 'flex', width: '100%', listStyle: 'none', flex: '1 1 100%' }}>
    {menu.map((item, idx) => <NavLink style={{ flex: '1 1 100%' }} key={idx} name={item} />)}
  </ul>
);

export default Nav;