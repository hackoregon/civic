import React from 'react';
import Nav from '../Navigation/Nav';
import './Header.css';

const Header = ({ title = 'Civic', children }) => (
  <nav className={'Header'}>
    <div className="title OpenSans font-bold">
      {title}
    </div>
    <Nav />
    { children }
  </nav>
);

export default Header;