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
    tooltipData,
  } = props;

  console.log('\nCivicSandbox Tooltip:\n', props);

  const x = tooltipData.x;
  const y = tooltipData.y;

  const xPosition = x < window.innerWidth * 0.66 ? x : x - (window.innerWidth * 0.1);
  const yPostition = y < 375  ? y : y - 50;

  const keyValuePairs = Object.entries(tooltipData.content);

  const tooltipContent = keyValuePairs.map((d, index) => {
    return (
      <div key={index}>
        {d[0] + ': ' + d[1].toLocaleString()}
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
  tooltipData: PropTypes.object,
};

export default MapTooltip;
