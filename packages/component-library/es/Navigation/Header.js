import React, { PropTypes } from 'react';
import Nav from './Nav';
import Logo from '../Logo/Logo';
import isClient from '../utils/isClient';

var styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(34,15,37,1)',
    padding: '1rem',
    zIndex: '1'
  },

  logo: {
    margin: '1rem 0 0 4rem',
    fontSize: '2rem',
    flex: '1 1 100%'
  }

};
var Header = function Header(_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === undefined ? 'Civic' : _ref$title,
      children = _ref.children,
      menu = _ref.menu;

  if (isClient) require('./Header.css');
  return React.createElement(
    'nav',
    { style: styles.header },
    React.createElement(
      'div',
      { style: styles.logo },
      React.createElement(Logo, { alt: title })
    ),
    React.createElement(Nav, { menu: menu }),
    children
  );
};

Header.displayName = 'Header';
Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

export default Header;