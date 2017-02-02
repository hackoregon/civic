import React from 'react';
import Nav from '../Navigation/Nav';
import Logo from '../Logo/Logo';
import './Header.css';

const Header = ({ title = 'Civic', children }) => (
  <nav className={'Header'}>
    <div className="logo">
      <Logo />
    </div>
    <Nav />
    { children }
  </nav>
);

export default Header;