import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

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
    primaryName,
    primaryField,
    secondaryName,
    secondaryField,
    isHex,
  } = props;

  const xPosition =
    x < window.innerWidth * 0.66 ? x : x - window.innerWidth * 0.1;
  const yPostition = y < 375 ? y : y - 50;

  return (
    <div
      className={tooltip}
      style={{
        left: xPosition,
        top: yPostition,
      }}
    >
      {primaryName ? (
        <div>
          {primaryName}: {tooltipInfo.properties[primaryField]}
        </div>
      ) : null}
      {secondaryName ? (
        <div>
          {secondaryName}: {tooltipInfo.properties[secondaryField]}
        </div>
      ) : null}
      {isHex ? (
        <div>
          <div>elevation: {tooltipInfo.elevationValue}</div>
          <div>coordinates: {tooltipInfo.centroid.join(', ')}</div>
        </div>
      ) : null}
    </div>
  );
};

MapTooltip.propTypes = {
  tooltipInfo: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  primaryName: PropTypes.string,
  primaryField: PropTypes.string,
  secondaryName: PropTypes.string,
  secondaryField: PropTypes.string,
};

export default MapTooltip;
