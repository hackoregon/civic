import React from 'react';
import ReactSlider from 'rc-slider';

var RcSlider = function RcSlider(_ref) {
  var min = _ref.min,
      max = _ref.max,
      value = _ref.value,
      onChange = _ref.onChange;
  return React.createElement(ReactSlider, {
    className: 'slider',
    min: min,
    max: max,
    step: 0.25,
    value: value,
    onChange: onChange,
    tipTransitionName: 'zoom-down'
  });
};

export default RcSlider;