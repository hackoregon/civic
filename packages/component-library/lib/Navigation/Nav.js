'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavRouterLink = require('./NavRouterLink');

var _NavRouterLink2 = _interopRequireDefault(_NavRouterLink);

var _isClient = require('../utils/isClient');

var _isClient2 = _interopRequireDefault(_isClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultMenu = [{ name: 'Collections', path: '/collections' }, { name: 'Explore', path: '/explore' }, { name: 'About', path: '/about' }];

var Nav = function Nav(_ref) {
  var _ref$menu = _ref.menu,
      menu = _ref$menu === undefined ? defaultMenu : _ref$menu;

  if (_isClient2.default) require('./Nav.css');
  return _react2.default.createElement(
    'ul',
    { style: { display: 'flex', width: '100%', listStyle: 'none', padding: '1rem', flex: '1 1 100%' } },
    menu.map(function (item, idx) {
      return _react2.default.createElement(_NavRouterLink2.default, { customStyles: { flex: '1 1 100%' }, key: idx, name: item.name, path: item.path });
    })
  );
};

Nav.propTypes = {
  menu: _react.PropTypes.arrayOf(_react.PropTypes.shape({ name: _react.PropTypes.string, path: _react.PropTypes.string }))
};

exports.default = Nav;