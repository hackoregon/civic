/* eslint-disable no-nested-ternary */
import { string, number, arrayOf, oneOfType, shape } from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { format } from "d3";
import { get } from "lodash";
import shortid from "shortid";
import window from "global/window";
import civicFormat from "../utils/civicFormat";

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

  const yPositionOffset = 40;
  const yPostition = y < 375 ? y + yPositionOffset : y - yPositionOffset * 3;

  const percentageFormat = format(".1%");
  const sandboxPercentFormat = p =>
    p < 1 && p > 0 ? percentageFormat(p) : `${p.toFixed(1)}%`;
  const sandboxDecimalFormat = format(".2n");
  const sandboxMoneyFormat = d => `$${civicFormat.numericShort(d)}`;

  const tooltipContent = tooltipData.content.map(t => {
    const formatType = t.format;

    const formattedValue =
      t.value && formatType === "percentage"
        ? sandboxPercentFormat(t.value)
        : t.value && formatType === "dollars"
        ? sandboxMoneyFormat(t.value)
        : t.value && formatType === "decimal"
        ? sandboxDecimalFormat(t.value)
        : t.value && formatType && civicFormat[formatType]
        ? civicFormat[formatType](t.value)
        : t.value
        ? t.value
        : "No Data Available";

    return (
      <div key={shortid.generate()}>{`${t.label}: ${formattedValue}`}</div>
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
        label: string,
        value: oneOfType([number, string])
      })
    )
  })
};

export default MapTooltip;
