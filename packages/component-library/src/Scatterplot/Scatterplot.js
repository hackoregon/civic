import React, { PropTypes } from 'react';
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
import { css } from 'emotion';

import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const ScatterPlot = ({ data, domain, style, title }) => {
  const xValues = data.map(value => value.x);
  const yValues = data.map(value => value.y);

  const chartDomain = domain || {
    x: [
      Math.min(...xValues) < 0 ? Math.min(...xValues) : 0,
      Math.max(...xValues),
    ],
    y: [
      Math.min(...yValues) < 0 ? Math.min(...yValues) : 0,
      Math.max(...yValues),
    ],
  };

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

  const axisLabelStyle = {
    fontFamily: "'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif",
    fontSize: '14px',
    fontWeight: 'bold',
  };

  const subtitle = 'This is a description.';
  const xLabel = 'X Label';
  const yLabel = 'Y Label';

  const CustomFlyout = flyoutProps => {
    const { datum, x, y, orientation } = flyoutProps;
    console.log('🐋🐋', CivicVictoryTheme.civic.legend);
    const newY = y - 25;
    // const newY = orientation === 'top' ? y - 25 : y + 25;
    return (
      <g transform={`translate(${x}, ${y})`} style={{ backgroundColor: 'red' }}>
        <text textAnchor="middle">test</text>
        <rect
          x={x}
          y={y}
          width="50px"
          height="50px"
          stroke="tomato"
          fill="red"
        />
        <circle r="25" stroke="orange" fill="none" />
        <circle r="30" stroke="gold" fill="none" />
      </g>
    );
  };

  const CustomLegend = data => {
    const test = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    return (
      <legend className={legendStyle}>
        {test.map((group, idx) => (
          <span
            key={group}
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
              {group}
            </span>
          </span>
        ))}
      </legend>
    );
  };

  return (
    <div>
      {title ? <span className={titleStyle}>{title}</span> : null}
      {subtitle ? <span className={subtitleStyle}>{subtitle}</span> : null}
      <CustomLegend />

      <VictoryChart domain={chartDomain} theme={CivicVictoryTheme.civic}>
        {/* <VictoryLegend
          {...CivicVictoryTheme.civic.legend}
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
          data={[
            { name: 'One' },
            { name: 'Two' },
            { name: 'Three' },
            { name: 'Three' },
          ]}
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
        <VictoryAxis
          style={{ grid: { stroke: 'none' } }}
          animate={{ onEnter: { duration: 500 } }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            grid: {
              ...CivicVictoryTheme.civic.axis.style.grid,
              stroke: t =>
                t < chartDomain.y[1]
                  ? CivicVictoryTheme.civic.axis.style.grid.stroke
                  : 'none',
            },
          }}
          labelComponent={<VictoryLabel text="banana" />}
          animate={{ onEnter: { duration: 500 } }}
        />
        <VictoryLabel
          title="X Axis Label"
          textAnchor="middle"
          verticalAnchor="end"
          x={50}
          y={45}
          style={axisLabelStyle}
          text={xLabel}
        />
        <VictoryLabel
          title="Y Axis Label"
          textAnchor="end"
          verticalAnchor="end"
          x={600}
          y={295}
          style={axisLabelStyle}
          text={yLabel}
        />
        {/* TODO: Pull this into it's own component */}
        <VictoryScatter
          style={style}
          size={4}
          data={data}
          labels={datum => `${xLabel}: ${datum.x} ${yLabel}: ${datum.y}`}
          labelComponent={
            <VictoryTooltip
              x={325}
              y={50}
              flyoutComponent={<CustomFlyout style={{ background: 'red' }} />}
            />
          }
          animate={{ onEnter: { duration: 500 }, onLoad: { duration: 500 } }}
          // categories={{ x: ['x name', 'y name'] }}
        />
      </VictoryChart>
    </div>
  );
};

ScatterPlot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  ),
  domain: PropTypes.objectOf(PropTypes.array),
  style: PropTypes.objectOf(PropTypes.object),
  title: PropTypes.string,
};

ScatterPlot.defaultProps = {
  data: null,
  domain: null,
  style: { data: { fill: d => d.fill } },
  title: null,
};

export default ScatterPlot;
