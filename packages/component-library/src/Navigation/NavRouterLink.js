import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './NavRouterLink.css';

const pathOrName = (p, n) => p || `/${n.toLowerCase()}`;

const NavRouterLink = ({ path, customStyles, name }) => {
  const boxStyle = customStyles ? customStyles.box : null;
  const linkStyle = customStyles ? customStyles.link : null;
  const pathTo = pathOrName(path, name);

  return (
    <li className={styles.NavRouterLink} style={{ ...boxStyle }} >
      <Link to={pathTo} >
        <span style={{ ...linkStyle }}>{name}</span>
      </Link>

    </li>
  );
};

NavRouterLink.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  customStyles: PropTypes.object,
};

export default NavRouterLink;
