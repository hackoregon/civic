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
  showStepMarkers,
  step,
  value,
  SliderComponent
}) => {
  return (
    <span className="civic-slider-container">
      <SliderComponent
        dots={showStepMarkers}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
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
  showStepMarkers: bool,
  step: number,
  value: number.isRequired,
  SliderComponent: node
};

Slider.defaultProps = {
  showStepMarkers: false,
  step: 1,
  SliderComponent: RcSlider
};

export default Slider;
