import React, { Fragment } from 'react';
import { css } from 'emotion';
import {
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryCursorContainer,
  VictoryLabel,
  VictoryLegend,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiTooltip,
} from 'victory';

const ChartHeader = props => {
  const { theme, title, subtitle, legendData } = props;

  const titleStyle = css`
    display: block;
    font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 21px;
    font-weight: bold;
    text-align: center;
    margin: 0;
  `;

  const subtitleStyle = css`
    display: block;
    font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 14px;
    text-align: center;
    margin: 0;
  `;

  const legendStyle = css`
    font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0 -40px 0;
  `;

  const CustomLegend = ({ data }) => {
    return (
      data.length && (
        <legend className={legendStyle}>
          {data.map((group, idx) => (
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
                  fill={theme.group.colorScale[idx]}
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
        </legend>
      )
    );
  };

  return (
    <span>
      {title && <span className={titleStyle}>{title}</span>}
      {subtitle && <span className={subtitleStyle}>{subtitle}</span>}
      <CustomLegend data={legendData} />
      {/* <VictoryLegend
        {...theme.legend}
        title="banana"
        height={50}
        // x={650 / 2 - 450 / 2}
        containerComponent={
          // Center the Legend
          <VictoryContainer
            style={{
              width: 'fit-content',
              margin: '0 auto',
            }}
          />
        }
        // width="auto"
        centerTitle
        orientation="horizontal"
        symbolSpacer={7}
        gutter={15}
        data={legendData}
        style={{
          border: { stroke: 'black' },
          margin: '0 auto',
          labels: {
            fontSize: 14,
            fontWeight: 'bold',
            fontFamily:
              "'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif",
          },
        }}
      /> */}
    </span>
  );
};

export default ChartHeader;
