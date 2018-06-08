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

const MapTooltip = (props) => {
  const {
    tooltipInfo,
    x,
    y,
  } = props;

  const xPosition = x < window.innerWidth * 0.66 ? x : x - (window.innerWidth * 0.1);
  const yPostition = y < 375  ? y : y - 50;

  const keyValuePairs = Object.entries(tooltipInfo.properties);

  const tooltipContent = keyValuePairs.map((d, i) => {
    const nameSplit = d[0].split("_");
    const name = nameSplit.reduce((acc, cur, i) => {
      const capitalize = cur.charAt(0).toUpperCase() + cur.slice(1);
      return acc + " " + capitalize;
    }, "");

    return (
      <div key={i}>
        {name + ': ' + d[1]}
      </div>
    );
  });

  return (
    <div
      className={tooltip}
      style={{
        left: xPosition,
        top: yPostition,
      }}
    >
      { tooltipContent }
    </div>
  );
};

MapTooltip.propTypes = {
  tooltipInfo: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default MapTooltip;
