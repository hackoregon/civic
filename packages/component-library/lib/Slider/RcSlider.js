'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RcSlider = function RcSlider(_ref) {
  var min = _ref.min,
      max = _ref.max,
      value = _ref.value,
      onChange = _ref.onChange;
  return _react2.default.createElement(_rcSlider2.default, {
    className: 'slider',
    min: min,
    max: max,
    step: 0.25,
    value: value,
    onChange: onChange,
    tipTransitionName: 'zoom-down'
  });
};

exports.default = RcSlider;