import React from 'react';
import { Link } from 'react-router';
import styles from './Nav.css';

const pathOrName = (p, n) => p || `/${n.toLowerCase()}`;

const NavSubMenu = ({ items, isVisible }) => (
  <div className={`${styles.nestedMenu} ${isVisible ? styles.visible : styles.hidden}`}>
    {items.map((item, index) => (
      <Link key={index} to={pathOrName(item.path, item.name)} >
        <span className="nested-menu-link">{item.name}</span>
      </Link>
    ))
    }
  </div>
);

NavSubMenu.displayName = 'NavSubMenu';
NavSubMenu.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({})),
  isVisible: React.PropTypes.bool,
};

export default NavSubMenu;
