var _templateObject = _taggedTemplateLiteral(['\n  display: ', ';\n  margin: ', ';\n  padding: 6px;\n  flex-wrap: nowrap;\n  align-items: center;\n  justify-content: space-between;\n  transition: ', ';\n  font-size: 1em;\n  font-family: "Rubik", sans-serif;\n  font-weight: 500;\n  color: ', ';\n  background: #FFF;\n  cursor: pointer;\n  border: 2px solid ', ';\n\n  i {\n    margin-right: 12px;\n  }\n\n  span {\n    flex-wrap: nowrap;\n    transition: ', ';\n  }\n\n  &:hover {\n    background-color: ', ';\n    color: #FFF;\n  }\n\n  &:focus {\n    outline: none;\n  }\n'], ['\n  display: ', ';\n  margin: ', ';\n  padding: 6px;\n  flex-wrap: nowrap;\n  align-items: center;\n  justify-content: space-between;\n  transition: ', ';\n  font-size: 1em;\n  font-family: "Rubik", sans-serif;\n  font-weight: 500;\n  color: ', ';\n  background: #FFF;\n  cursor: pointer;\n  border: 2px solid ', ';\n\n  i {\n    margin-right: 12px;\n  }\n\n  span {\n    flex-wrap: nowrap;\n    transition: ', ';\n  }\n\n  &:hover {\n    background-color: ', ';\n    color: #FFF;\n  }\n\n  &:focus {\n    outline: none;\n  }\n']);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { css } from 'emotion';

var accentColor = '#DC4556';
var commonTransition = 'all .2s ease-in-out';
var buttonClass = function buttonClass(props) {
  return css(_templateObject, props.display || 'block', props.margin, commonTransition, accentColor, accentColor, commonTransition, accentColor);
};

var Button = function Button(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick,
      props = _objectWithoutProperties(_ref, ['children', 'onClick']);

  return React.createElement(
    'button',
    { className: buttonClass(props), onClick: onClick },
    children
  );
};

Button.displayName = 'Button';

Button.propTypes = {
  children: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default Button;