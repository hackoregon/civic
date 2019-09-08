import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
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
  const {
    tooltipInfo,
    x,
    y,
    formatPrimaryField,
    formatSecondaryField,
    primaryName,
    primaryField,
    secondaryName,
    secondaryField,
    isHex
  } = props;

  const xPosition =
    x < get(window, "innerWidth", 1000) * 0.66
      ? x
      : x - get(window, "innerWidth", 1000) * 0.1;
  const yPostition = y < 375 ? y : y - 50;

  const getProperty = (property, formatFunction) => {
    if (formatFunction) {
      return formatFunction(property);
    }
    return property;
  };

  return (
    <div
      css={tooltip}
      style={{
        left: xPosition,
        top: yPostition
      }}
    >
      {primaryName && (
        <div>
          {`${primaryName}: ${getProperty(
            tooltipInfo.properties[primaryField],
            formatPrimaryField
          )}`}
        </div>
      )}
      {secondaryName && (
        <div>
          {`${secondaryName}: ${getProperty(
            tooltipInfo.properties[secondaryField],
            formatSecondaryField
          )}`}
        </div>
      )}
      {isHex && (
        <div>
          <div>elevation: {tooltipInfo.elevationValue}</div>
          <div>coordinates: {tooltipInfo.centroid.join(", ")}</div>
        </div>
      )}
    </div>
  );
};

MapTooltip.propTypes = {
  tooltipInfo: PropTypes.shape({}),
  x: PropTypes.number,
  y: PropTypes.number,
  formatPrimaryField: PropTypes.func,
  formatSecondaryField: PropTypes.func,
  primaryName: PropTypes.string,
  primaryField: PropTypes.string,
  secondaryName: PropTypes.string,
  secondaryField: PropTypes.string,
  isHex: PropTypes.bool
};

MapTooltip.defaultProps = {
  formatPrimaryField: null,
  formatSecondaryField: null
};

export default MapTooltip;
