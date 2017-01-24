'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Swatch = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactcss = require('reactcss');

var _reactcss2 = _interopRequireDefault(_reactcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Swatch = exports.Swatch = function Swatch(_ref) {
  var color = _ref.color,
      style = _ref.style,
      onClick = _ref.onClick,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? color : _ref$title;

  var styles = (0, _reactcss2.default)({
    'default': {
      swatch: {
        background: color,
        height: '100%',
        width: '100%',
        cursor: 'pointer'
      }
    },
    'custom': {
      swatch: style
    }
  }, 'custom');

  var handleClick = function handleClick(e) {
    return onClick(color, e);
  };

  return _react2.default.createElement('div', { style: styles.swatch, onClick: handleClick, title: title });
};

exports.default = Swatch;