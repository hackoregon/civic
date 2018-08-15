import React from 'react';
import { string, number, arrayOf, objectOf, oneOfType, shape} from 'prop-types';
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
  const x = tooltipData.x;
  const y = tooltipData.y;

  const xPosition = x < window.innerWidth * 0.66 ? x : x - (window.innerWidth * 0.1);
  const yPostition = y < 375 ? y : y - 50;

  const tooltipContent = tooltipData.content.map((obj, index) => {
    return (
      <div key={index}>
        {`${obj.name}: ${obj.value.toLocaleString()}`}
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
  tooltipData: objectOf(
    shape({
      x: number,
      y: number,
      content: arrayOf(
        shape({
          name: string,
          value: oneOfType([number, string]),
        })
      ),
    })
  ),
};

export default MapTooltip;
