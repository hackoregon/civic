import { string, number, arrayOf, oneOfType, shape } from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { get } from "lodash";
import shortid from "shortid";
import window from "global/window";

const tooltip = css`
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  position: absolute;
  padding: 0 10px 0 5px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  max-width: 275px;
  z-index: 9;
  pointer-events: none;
`;

const MapTooltip = props => {
  const { tooltipData } = props;
  const { x } = tooltipData;
  const { y } = tooltipData;

  const xPositionOffset = 25;
  const xPosition =
    x < get(window, "innerWidth", 1000) * 0.66
      ? x + xPositionOffset
      : x - xPositionOffset * 3;

  const yPositionOffset = 45;
  const yPostition = y < 375 ? y + yPositionOffset : y - yPositionOffset * 4;

  const tooltipContent = tooltipData.content.map(obj => {
    const value = obj.value ? obj.value : "No Data Available";
    return (
      <div key={shortid.generate()}>
        {`${obj.name}: ${value.toLocaleString()}`}
      </div>
    );
  });

  return (
    <div
      css={tooltip}
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
