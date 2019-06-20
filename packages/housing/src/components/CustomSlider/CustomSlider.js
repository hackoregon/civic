import React from "react";
import PropTypes from "prop-types";
import { Slider } from "@hackoregon/component-library";
import SliderTooltip from "./SliderTooltip";

import "./SliderBox.css";

const CustomSlider = ({ value, onChange, min, max }) => (
  <div>
    <Slider
      className="custom-slider"
      min={min}
      max={max}
      onChange={onChange}
      step={0.25}
      value={value}
    />
    <SliderTooltip value={value} />
  </div>
);

CustomSlider.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number
};

export default CustomSlider;
