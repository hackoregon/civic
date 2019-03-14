import React from 'react';
import PropTypes from 'prop-types';
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

RcSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default RcSlider;
