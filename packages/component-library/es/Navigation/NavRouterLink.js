var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n  & > a {\n    color: rgba(255, 255, 255, 0.65);\n    flex: 1;\n    display: block;\n    font-family: \'Rubik\', sans-serif;\n    font-size: 1.25rem;\n    border: none;\n    font-weight: 500;\n    text-transform: uppercase;\n    text-decoration: none;\n    padding: 1rem;\n    text-align: center;\n\n    &:focus, &:hover, &:active {\n      color: rgba(255, 255, 255, 0.85);\n    }\n\n    &:hover {\n      text-decoration: none;\n    }\n  }\n'], ['\n  & > a {\n    color: rgba(255, 255, 255, 0.65);\n    flex: 1;\n    display: block;\n    font-family: \'Rubik\', sans-serif;\n    font-size: 1.25rem;\n    border: none;\n    font-weight: 500;\n    text-transform: uppercase;\n    text-decoration: none;\n    padding: 1rem;\n    text-align: center;\n\n    &:focus, &:hover, &:active {\n      color: rgba(255, 255, 255, 0.85);\n    }\n\n    &:hover {\n      text-decoration: none;\n    }\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { css } from 'emotion';

var linkClass = css(_templateObject);

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
    { className: linkClass, style: _extends({}, boxStyle) },
    React.createElement(
      Link,
      { className: 'nav-item', to: pathTo },
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