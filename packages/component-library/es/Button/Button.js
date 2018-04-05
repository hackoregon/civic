var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  padding: 6px;\n  flex-wrap: nowrap;\n  align-items: center;\n  justify-content: space-between;\n  transition: ', ';\n  font-size: 1em;\n  font-weight: 600;\n  color: ', ';\n  background: #FFF;\n  cursor: pointer;\n  border: 2px solid ', ';\n\n  i {\n    margin-right: 12px;\n  }\n\n  span {\n    flex-wrap: nowrap;\n    transition: ', ';\n  }\n\n  &:hover {\n    background-color: ', ';\n    color: #FFF;\n  }\n\n  &:focus {\n    outline: none;\n  }\n'], ['\n  display: flex;\n  padding: 6px;\n  flex-wrap: nowrap;\n  align-items: center;\n  justify-content: space-between;\n  transition: ', ';\n  font-size: 1em;\n  font-weight: 600;\n  color: ', ';\n  background: #FFF;\n  cursor: pointer;\n  border: 2px solid ', ';\n\n  i {\n    margin-right: 12px;\n  }\n\n  span {\n    flex-wrap: nowrap;\n    transition: ', ';\n  }\n\n  &:hover {\n    background-color: ', ';\n    color: #FFF;\n  }\n\n  &:focus {\n    outline: none;\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { css } from 'emotion';

var accentColor = 'rgb(238, 73, 80)';
var commonTransition = 'all .2s ease-in-out';
var buttonClass = css(_templateObject, commonTransition, accentColor, accentColor, commonTransition, accentColor);

var Button = function Button(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick;
  return React.createElement(
    'button',
    { className: buttonClass, onClick: onClick },
    children
  );
};

Button.displayName = 'Button';

Button.propTypes = {
  children: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default Button;