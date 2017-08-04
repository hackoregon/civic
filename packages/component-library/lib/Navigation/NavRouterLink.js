'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _isClient = require('../utils/isClient');

var _isClient2 = _interopRequireDefault(_isClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavRouterLink = function NavRouterLink(_ref) {
  var path = _ref.path,
      customStyles = _ref.customStyles,
      name = _ref.name;

  if (_isClient2.default) require('./NavRouterLink.css');
  var boxStyle = customStyles ? customStyles.box : null;
  var linkStyle = customStyles ? customStyles.link : null;
  var pathTo = path || '/' + name.toLowerCase();
  return _react2.default.createElement(
    'li',
    { className: 'NavRouterLink', style: _extends({ display: 'block' }, boxStyle) },
    _react2.default.createElement(
      _reactRouter.Link,
      { to: pathTo },
      _react2.default.createElement(
        'span',
        { style: _extends({}, linkStyle) },
        name
      )
    )
  );
};

NavRouterLink.propTypes = {
  name: _react.PropTypes.string,
  path: _react.PropTypes.string,
  customStyles: _react.PropTypes.object
};

exports.default = NavRouterLink;