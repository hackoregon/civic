'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('rc-slider/assets/index.css');

var _SliderTooltip = require('./SliderTooltip');

var _SliderTooltip2 = _interopRequireDefault(_SliderTooltip);

var _RcSlider = require('./RcSlider');

var _RcSlider2 = _interopRequireDefault(_RcSlider);

require('./SliderBox.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Slider = function Slider(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      min = _ref.min,
      max = _ref.max;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_RcSlider2.default, { tipformatter: null, min: min, max: max, value: value, onChange: onChange }),
    _react2.default.createElement(_SliderTooltip2.default, { value: value })
  );
};

Slider.propTypes = {
  value: _react2.default.PropTypes.number,
  onChange: _react2.default.PropTypes.func,
  max: _react2.default.PropTypes.number,
  min: _react2.default.PropTypes.number
};

exports.default = Slider;