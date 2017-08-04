import React, { PropTypes } from 'react';
import Nav from './Nav';
import Logo from '../Logo/Logo';
import isClient from '../utils/isClient';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(34,15,37,1)',
    padding: '1rem',
    zIndex: '1',
  },

  logo: {
    margin: '1rem 0 0 4rem',
    fontSize: '2rem',
    flex: '1 1 100%',
  },

};
const Header = ({ title = 'Civic', children, menu }) => {
  if (isClient) require('./Header.css');
  return (
    <nav style={styles.header}>
      <div style={styles.logo}>

        <Logo alt={title} />
      </div>
      <Nav menu={menu} />
      { children }
    </nav>
  );
};

Header.displayName = 'Header';
Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Header;