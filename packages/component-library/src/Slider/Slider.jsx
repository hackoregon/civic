import React from "react";
import { bool, func, node, number } from "prop-types";
import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";

import "./slider.css";

const SliderWithTooltip = RcSlider.createSliderWithTooltip(RcSlider);

const Slider = ({
  min,
  max,
  onChange,
  showTooltip,
  step,
  dots,
  tipFormatter,
  value,
  SliderComponent,
  ...rest
}) => {
  return (
    <span className="civic-slider-container">
      <SliderComponent
        dots={dots}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </span>
  );
};

Slider.SliderWithTooltip = props => (
  <span className="civic-slider-container">
    <SliderWithTooltip {...props} />
  </span>
);

Slider.propTypes = {
  max: number.isRequired,
  min: number.isRequired,
  onChange: func.isRequired,
  showTooltip: bool,
  step: number,
  dots: bool, // step markers
  tipFormatter: func,
  value: number.isRequired,
  SliderComponent: node
};

Slider.defaultProps = {
  showTooltip: false,
  step: 1,
  dots: false,
  tipFormatter: null,
  SliderComponent: RcSlider
};

export default Slider;
