/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";

const toggleStyle = css`
  display: flex;
  align-items: center;
  .switch {
    position: relative;
    width: 50px;
    height: 25px;
    outline: none;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 35px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 25px;
    width: 25px;
    left: 4px;
    bottom: 0px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
  input:checked + .slider {
    background-color: darkOrange;
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(18px);
    -ms-transform: translateX(18px);
    transform: translateX(18px);
  }
`;

const SandboxToggleSwitch = props => {
  const { name, checked, onChange, label, mapType } = props;

  const decodeMapType =
    mapType === "PolygonPlotMap"
      ? "Polygons"
      : mapType === "SmallPolygonMap"
      ? "Polygons"
      : mapType === "ScatterPlotMap"
      ? "Points"
      : mapType === "PathMap"
      ? "Lines"
      : mapType === "IconMap"
      ? "Icons"
      : mapType === "ScreenGridMap"
      ? "Squares"
      : "";

  return (
    <div className={toggleStyle}>
      {/* eslint-disable-next-line */}
      <label className="switch">
        <input
          type="checkbox"
          name={name}
          value={checked}
          checked={checked}
          onChange={onChange}
        />
        <div className="slider" />
      </label>
      <div style={{ paddingLeft: "2.5%" }}>{`${label} - ${decodeMapType}`}</div>
    </div>
  );
};

SandboxToggleSwitch.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  mapType: PropTypes.string
};

export default SandboxToggleSwitch;
