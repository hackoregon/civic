import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import './NavRouterLink.css';

const NavRouterLink = ({ routeTo, customStyles, name }) => {
  const boxStyle = customStyles ? customStyles.box : null;
  const linkStyle = customStyles ? customStyles.link : null;
  const route = routeTo || `/${name.toLowerCase()}`;
  return (<li className={'NavRouterLink'} style={{ ...boxStyle }} >
    <Link to={route} >
      <span style={{ ...linkStyle }}>{name}</span>
    </Link>
  </li>
  );
};

NavRouterLink.propTypes = {
  name: PropTypes.string,
  routeTo: PropTypes.string,
  customStyles: PropTypes.object,
};

export default NavRouterLink;
