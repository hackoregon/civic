import React, { PropTypes } from 'react';
import { css } from 'emotion';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const SimpleLegend = ({ legendData }) => {
  const legendStyle = css`
    font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0 0 0;

    @media (max-width: 640px) {
      text-align: left;
    }
  `;

  if (legendData.length) {
    return (
      <div className={legendStyle}>
        {legendData.map((group, idx) => (
          <span
            key={group.name}
            className={css`
              margin-left: 10px;
            `}
          >
            <svg viewBox="0 0 10 10" width="10px">
              <circle
                cx="5"
                cy="5"
                r="5"
                fill={CivicVictoryTheme.civic.group.colorScale[idx]}
              />
            </svg>
            <span
              className={css`
                margin-left: 5px;
              `}
            >
              {group.name}
            </span>
          </span>
        ))}
      </div>
    );
  }
  return null;
};

SimpleLegend.propTypes = {
  legendData: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
};

SimpleLegend.defaultProps = {
  legendData: null,
};

export default SimpleLegend;
