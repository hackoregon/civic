import React from 'react';
import 'rc-slider/assets/index.css';
import SliderTooltip from './SliderTooltip';
import RcSlider from './RcSlider';
import './SliderBox.css';

const Slider = ({ value, onChange, min, max }) => (
  <div>
    <RcSlider
      tipformatter={null}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
    <SliderTooltip value={value} />
  </div>
);

Slider.propTypes = {
  value: React.PropTypes.number,
  onChange: React.PropTypes.func,
  max: React.PropTypes.number,
  min: React.PropTypes.number,
};

export default Slider;
