'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _ButtonStyles = require('./Button.styles.css');

var _ButtonStyles2 = _interopRequireDefault(_ButtonStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _bind2.default.bind(_ButtonStyles2.default);

var className = cx({ base: true });

var Button = function Button(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    { className: className, onClick: onClick },
    children
  );
};

Button.displayName = 'Button';

Button.propTypes = {
  children: _react2.default.PropTypes.string,
  onClick: _react2.default.PropTypes.func
};

exports.default = Button;