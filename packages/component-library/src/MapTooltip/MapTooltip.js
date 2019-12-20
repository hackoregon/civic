import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { get } from "lodash";
import window from "global/window";

const MapTooltip = props => {
  const {
    x,
    y,
    formatPrimaryField,
    formatSecondaryField,
    isHex,
    isScreenGrid,
    primaryName,
    primaryField,
    secondaryName,
    secondaryField,
    tooltipDataArray,
    tooltipInfo,
    wide
  } = props;

  const tooltip = css`
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14px;
    position: absolute;
    padding: 4px;
    margin: 8px;
    background: rgba(0, 0, 0, 0.75);
    color: #ffffff;
    // max-width: 250px;
    max-width: ${wide ? "400px" : "250px"};
    z-index: 9;
    pointer-events: none;
  `;

  const xPosition =
    x < get(window, "innerWidth", 1000) * 0.66
      ? x
      : x - get(window, "innerWidth", 1000) * 0.1;
  const yPosition = y < 375 ? y : y - 50;

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
        top: yPosition
      }}
    >
      {primaryName && (
        <div>
          <strong>{`${primaryName}: `}</strong>
          {getProperty(
            tooltipInfo.properties[primaryField],
            formatPrimaryField
          )}
        </div>
      )}
      {secondaryName && (
        <div>
          <strong>{`${secondaryName}: `}</strong>
          {getProperty(
            tooltipInfo.properties[secondaryField],
            formatSecondaryField
          )}
        </div>
      )}
      {!isScreenGrid &&
        tooltipDataArray.map(el => (
          <div key={el.name}>
            <strong>{`${el.name}: `}</strong>
            {getProperty(tooltipInfo.properties[el.field], el.formatField)}
          </div>
        ))}
      {isScreenGrid &&
        tooltipDataArray.map(el => (
          <div key={el.name}>
            <strong>{`${el.name}: `}</strong>
            {!el.totalField &&
              getProperty(tooltipInfo[el.field], el.formatField)}
            {el.totalField &&
              getProperty(
                tooltipInfo[el.field] / tooltipInfo[el.totalField],
                el.formatField
              )}
          </div>
        ))}
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
  tooltipDataArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      totalField: PropTypes.string,
      formatField: PropTypes.func
    })
  ),
  isHex: PropTypes.bool,
  isScreenGrid: PropTypes.bool,
  wide: PropTypes.bool
};

MapTooltip.defaultProps = {
  formatPrimaryField: null,
  formatSecondaryField: null,
  tooltipDataArray: [],
  wide: false
};

export default MapTooltip;
