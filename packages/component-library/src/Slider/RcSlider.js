import React from 'react';
import ReactSlider from 'rc-slider';

const RcSlider = ({ min, max, value, onChange }) => (
  <ReactSlider
    className="slider"
    min={min}
    max={max}
    step={0.25}
    value={value}
    onChange={onChange}
    tipTransitionName="zoom-down"
  />
);

export default RcSlider;
