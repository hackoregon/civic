var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './NavRouterLink.css';

var pathOrName = function pathOrName(p, n) {
  return p || '/' + n.toLowerCase();
};

var NavRouterLink = function NavRouterLink(_ref) {
  var path = _ref.path,
      customStyles = _ref.customStyles,
      name = _ref.name;

  var boxStyle = customStyles ? customStyles.box : null;
  var linkStyle = customStyles ? customStyles.link : null;
  var pathTo = pathOrName(path, name);

  return React.createElement(
    'li',
    { className: styles.NavRouterLink, style: _extends({}, boxStyle) },
    React.createElement(
      Link,
      { to: pathTo },
      React.createElement(
        'span',
        { style: _extends({}, linkStyle) },
        name
      )
    )
  );
};

NavRouterLink.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  customStyles: PropTypes.object
};

export default NavRouterLink;