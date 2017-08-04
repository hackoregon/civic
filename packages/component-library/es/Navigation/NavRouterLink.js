var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import isClient from '../utils/isClient';

var NavRouterLink = function NavRouterLink(_ref) {
  var path = _ref.path,
      customStyles = _ref.customStyles,
      name = _ref.name;

  if (isClient) require('./NavRouterLink.css');
  var boxStyle = customStyles ? customStyles.box : null;
  var linkStyle = customStyles ? customStyles.link : null;
  var pathTo = path || '/' + name.toLowerCase();
  return React.createElement(
    'li',
    { className: 'NavRouterLink', style: _extends({ display: 'block' }, boxStyle) },
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