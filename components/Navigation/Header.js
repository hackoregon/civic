import React, { PropTypes } from 'react';
import Nav from './Nav';
import Logo from '../Logo/Logo';
import './Header.css';

const Header = ({ title = 'Civic', children }) => (
  <nav className={'Header'}>
    <div className="logo">
      <Logo alt={title} />
    </div>
    <Nav />
    { children }
  </nav>
);

Header.displayName = 'Header';
Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Header;