import React, { PropTypes } from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
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

  const barchartWrapper = css`
    margin: 0 auto;
    max-width: 900px;
    width: 100%;
  `;

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
    console.log('flyoutProps', flyoutProps);
    const newY = y - 25;
    // const newY = orientation === 'top' ? y - 25 : y + 25;
    return (
      <g>
        <circle cx={x} cy={newY} r="20" stroke="tomato" fill="none" />
        <circle cx={x} cy={newY} r="25" stroke="orange" fill="none" />
        <circle cx={x} cy={newY} r="30" stroke="gold" fill="none" />
      </g>
    );
  };

  return (
    <div>
      {title ? <span className={titleStyle}>{title}</span> : null}
      {subtitle ? <span className={subtitleStyle}>{subtitle}</span> : null}
      {/* <div className={barchartWrapper}>
        <VictoryChart domain={chartDomain} theme={CivicVictoryTheme.civic}>
          <VictoryScatter style={style} size={5} data={data} />
        </VictoryChart>
      </div> */}
      <VictoryChart domain={chartDomain} theme={CivicVictoryTheme.civic}>
        <VictoryAxis
          style={{ grid: { stroke: 'none' } }}
          animate={{ onEnter: { duration: 500 } }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            grid: {
              stroke: t => (t < chartDomain.y[1] ? 'lightgray' : 'none'),
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
        <VictoryScatter
          style={style}
          size={5}
          data={data}
          labels={datum => `${xLabel}: ${datum.x} ${yLabel}: ${datum.y}`}
          labelComponent={
            <VictoryTooltip x={325} y={50} flyoutComponent={<CustomFlyout />} />
          }
          animate={{ onEnter: { duration: 500 } }}
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
