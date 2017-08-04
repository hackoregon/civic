import React, { PropTypes } from 'react';
import NavLink from './NavRouterLink';
import isClient from '../utils/isClient';

var defaultMenu = [{ name: 'Collections', path: '/collections' }, { name: 'Explore', path: '/explore' }, { name: 'About', path: '/about' }];

var Nav = function Nav(_ref) {
  var _ref$menu = _ref.menu,
      menu = _ref$menu === undefined ? defaultMenu : _ref$menu;

  if (isClient) require('./Nav.css');
  return React.createElement(
    'ul',
    { style: { display: 'flex', width: '100%', listStyle: 'none', padding: '1rem', flex: '1 1 100%' } },
    menu.map(function (item, idx) {
      return React.createElement(NavLink, { customStyles: { flex: '1 1 100%' }, key: idx, name: item.name, path: item.path });
    })
  );
};

Nav.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, path: PropTypes.string }))
};

export default Nav;