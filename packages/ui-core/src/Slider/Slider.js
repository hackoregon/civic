/* eslint-disable import/prefer-default-export */
import React from "react";
import { bool, func, node, number } from "prop-types";
import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";

import "./slider.css";

const SliderWithTooltip = RcSlider.createSliderWithTooltip(RcSlider);
const Range = RcSlider.createSliderWithTooltip(RcSlider.Range);

/** A numeric slider using RcSlider under the hood, with options for a single value or a range of values */
export const Slider = ({
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

Slider.SliderWithRange = props => (
  <span className="civic-slider-container">
    <Range {...props} />
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

Slider.displayName = "Slider";
Slider.SliderWithTooltip.displayName = "Slider.SliderWithTooltip";
Slider.SliderWithRange.displayName = "Slider.SliderWithRange";
