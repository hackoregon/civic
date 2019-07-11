import React from "react";
import PropTypes from "prop-types";

const SliderTooltip = ({ value }) => (
  <div className="slider-tooltip-container panel panel-default">
    <div className="panel-body">
      <ul className="list-inline">
        <li>
          <span className="hour">$ {value.toFixed(2)}</span> /hour
        </li>
        <li>
          <span className="day">$ {value * 8}</span> /day
        </li>
        <li>
          <span className="week">$ {Math.round(value * 8 * 5)}</span> /week
        </li>
        <li>
          <span className="month">$ {value * 8 * 22}</span> /month
        </li>
        <li>
          <span className="year">$ {value * 8 * 22 * 12}</span> /year
        </li>
      </ul>
    </div>
  </div>
);

SliderTooltip.propTypes = {
  value: PropTypes.number
};

export default SliderTooltip;
