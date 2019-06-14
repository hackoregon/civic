import React from "react";
import { string, number, arrayOf, oneOfType, shape } from "prop-types";
import { css } from "emotion";
import { get } from "lodash";
import window from "global/window";

const tooltip = css`
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  position: absolute;
  padding: 4px;
  margin: 8px;
  background: rgba(0, 0, 0, 0.75);
  color: #ffffff;
  max-width: 250px;
  z-index: 9;
  pointer-events: none;
`;

const MapTooltip = props => {
  const { tooltipData } = props;
  const { x } = tooltipData;
  const { y } = tooltipData;

  const xPosition =
    x < get(window, "innerWidth", 1000) * 0.66
      ? x
      : x - get(window, "innerWidth", 1000) * 0.1;
  const yPostition = y < 375 ? y : y - 50;

  const tooltipContent = tooltipData.content.map(obj => {
    const value = obj.value ? obj.value : "No Data Available";
    return (
      <div key={`${obj.name}-${value}`}>
        {`${obj.name}: ${value.toLocaleString()}`}
      </div>
    );
  });

  return (
    <div
      className={tooltip}
      style={{
        left: xPosition,
        top: yPostition
      }}
    >
      {tooltipContent}
    </div>
  );
};

MapTooltip.propTypes = {
  tooltipData: shape({
    x: number,
    y: number,
    content: arrayOf(
      shape({
        name: string,
        value: oneOfType([number, string])
      })
    )
  })
};

export default MapTooltip;
