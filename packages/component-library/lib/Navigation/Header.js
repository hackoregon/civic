'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _Logo = require('../Logo/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _isClient = require('../utils/isClient');

var _isClient2 = _interopRequireDefault(_isClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(34,15,37,1)',
    padding: '1rem',
    zIndex: '1'
  },

  logo: {
    margin: '1rem 0 0 4rem',
    fontSize: '2rem',
    flex: '1 1 100%'
  }

};
var Header = function Header(_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === undefined ? 'Civic' : _ref$title,
      children = _ref.children,
      menu = _ref.menu;

  if (_isClient2.default) require('./Header.css');
  return _react2.default.createElement(
    'nav',
    { style: styles.header },
    _react2.default.createElement(
      'div',
      { style: styles.logo },
      _react2.default.createElement(_Logo2.default, { alt: title })
    ),
    _react2.default.createElement(_Nav2.default, { menu: menu }),
    children
  );
};

Header.displayName = 'Header';
Header.propTypes = {
  title: _react.PropTypes.string,
  children: _react.PropTypes.node
};

exports.default = Header;