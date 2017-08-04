import React from 'react';
import 'rc-slider/assets/index.css';
import SliderTooltip from './SliderTooltip';
import RcSlider from './RcSlider';
import './SliderBox.css';

var Slider = function Slider(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      min = _ref.min,
      max = _ref.max;
  return React.createElement(
    'div',
    null,
    React.createElement(RcSlider, { tipformatter: null, min: min, max: max, value: value, onChange: onChange }),
    React.createElement(SliderTooltip, { value: value })
  );
};

Slider.propTypes = {
  value: React.PropTypes.number,
  onChange: React.PropTypes.func,
  max: React.PropTypes.number,
  min: React.PropTypes.number
};

export default Slider;