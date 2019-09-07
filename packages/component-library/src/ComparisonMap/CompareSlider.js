import React from "react";
import { func, number } from "prop-types";
import MaterialSlider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";

const ComparisonMapSlider = withStyles({
  root: {
    padding: 0, // Hide the slider bar
    height: 0 // Hide the slider bar
  },
  thumb: {
    zIndex: 1,
    height: 40,
    width: 40,
    backgroundColor: "white",
    marginTop: -40, // Set to the same as the height
    marginLeft: -20, // Set to 1/2 the width
    boxShadow: "gray 0px 0px 3px 1px",
    "&:hover,&$active": {
      boxShadow: "gray 0px 0px 4px 2px"
    },
    "& .arrow-left": {
      width: 0,
      height: 0,
      marginRight: "12px",
      borderTop: "7px solid transparent",
      borderBottom: "7px solid transparent",
      borderRight: "7px solid lightgray"
    },
    "& .arrow-right": {
      width: 0,
      height: 0,
      borderTop: "7px solid transparent",
      borderBottom: "7px solid transparent",
      borderLeft: "7px solid lightgray"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    display: "none", // Hide the slider bar
    height: 0
  },
  rail: {
    display: "none", // Hide the slider bar
    height: 0
  }
})(MaterialSlider);

const ThumbComponent = props => {
  return (
    <span {...props}>
      <span className="arrow-left" />
      <span className="arrow-right" />
    </span>
  );
};

const CompareSlider = ({ min, max, onChange, step, value, ...rest }) => {
  return (
    <ComparisonMapSlider
      ThumbComponent={ThumbComponent}
      aria-label="airbnb slider"
      min={min}
      max={max}
      step={step}
      value={value}
      label="test"
      onChange={(e, newValue) => onChange(newValue)}
      {...rest}
    />
  );
};

CompareSlider.propTypes = {
  max: number.isRequired,
  min: number.isRequired,
  onChange: func.isRequired,
  step: number,
  value: number.isRequired
};

CompareSlider.defaultProps = {
  step: 1
};

export default CompareSlider;
