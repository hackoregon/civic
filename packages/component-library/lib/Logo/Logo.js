'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isClient = require('../utils/isClient');

var _isClient2 = _interopRequireDefault(_isClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  height: '80px',
  width: 'auto'
};

var Logo = function Logo(_ref) {
  var alt = _ref.alt;
  return _isClient2.default && _react2.default.createElement('img', { style: styles, src: require('../../assets/civic-logo-animated-invert.svg'), alt: alt });
};

Logo.displayName = 'Logo';
Logo.propTypes = {
  alt: _react.PropTypes.string
};

exports.default = Logo;