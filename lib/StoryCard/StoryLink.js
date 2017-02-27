'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

require('./StoryLink.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoryLink = function StoryLink(_ref) {
  var children = _ref.children,
      icon = _ref.icon,
      route = _ref.route,
      action = _ref.action;
  return _react2.default.createElement(
    'div',
    { className: 'StoryLink' },
    route ? _react2.default.createElement(
      _reactRouter.Link,
      { to: route },
      _react2.default.createElement('i', { className: icon }),
      _react2.default.createElement(
        'span',
        null,
        children
      )
    ) : _react2.default.createElement(
      'a',
      { tabIndex: '0', onClick: action },
      _react2.default.createElement('i', { className: icon }),
      _react2.default.createElement(
        'span',
        null,
        children
      )
    )
  );
};

StoryLink.displayName = 'StoryLink';
StoryLink.propTypes = {
  action: _react.PropTypes.func,
  children: _react.PropTypes.node,
  icon: _react.PropTypes.string,
  route: _react.PropTypes.string
};

exports.default = StoryLink;