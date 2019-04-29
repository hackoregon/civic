/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";

const containerStyle = css`
  display: flex;
  align-items: center;
`;

const toggleStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  height: 25px;
  outline: none;
`;

const sliderStyle = css`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 35px;
  width: 50px;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
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

  input:checked + & {
    background-color: darkOrange;
  }

  input:checked + &:before {
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
    <div className={containerStyle}>
      {/* eslint-disable-next-line */}
      <label className={toggleStyle} htmlFor={`slide-input-${label}`}>
        <input
          id={`slide-input-${label}`}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <div className={sliderStyle} />
        <div style={{ marginLeft: "40px" }}>
          {`${label} - ${decodeMapType}`}
        </div>
      </label>
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
