import React from "react";
import PropTypes from "prop-types";
import "rc-slider/assets/index.css";
import SliderTooltip from "./SliderTooltip";
import RcSlider from "./RcSlider";
import "./SliderBox.css";

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
  value: PropTypes.number,
  onChange: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number
};

export default Slider;
