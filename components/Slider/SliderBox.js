import React from 'react';
import SliderTooltip from './SliderTooltip';
import Slider from './Slider';
import 'rc-slider/assets/index.css';
import './SliderBox.css';

const SliderBox = ({ value, onChange, min, max }) => (
  <div>
    <Slider tipformatter={null} min={min} max={max} value={value} onChange={onChange} />
    <SliderTooltip value={value} />
  </div>
);


export default SliderBox;
