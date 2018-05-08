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

import ChartHeader from './ChartHeader';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const ScatterPlot = ({
  data,
  dataSeries,
  domain,
  style,
  subtitle,
  title,
  xLabel,
  yLabel,
}) => {
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

  const axisLabelStyle = {
    fontFamily: "'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif",
    fontSize: '14px',
    fontWeight: 'bold',
  };

  const CustomFlyout = flyoutProps => {
    const { datum, x, y } = flyoutProps;

    return (
      <g
        transform={`translate(${x}, ${y - 10})`}
        style={{ backgroundColor: 'red' }}
      >
        <rect
          x={0 - 75}
          y={0 - 20}
          width="150px"
          height="30px"
          fill="lightgray"
        />
        <text textAnchor="middle">
          {`${xLabel}: ${datum.x} ${yLabel}: ${datum.y}`}
        </text>
      </g>
    );
  };

  // Set the style based on the dataSeries index
  const defaultStyle = {
    data: {
      fill: d => {
        const idx = dataSeries.findIndex(series => series === d.series);
        return CivicVictoryTheme.civic.group.colorScale[idx];
      },
    },
  };

  const legend = dataSeries.map(series => ({ name: series }));

  return (
    <div>
      <ChartHeader
        title={title}
        subtitle={subtitle}
        theme={CivicVictoryTheme.civic}
        legendData={legend}
      />
      <VictoryChart domain={chartDomain} theme={CivicVictoryTheme.civic}>
        <VictoryAxis
          style={{ grid: { stroke: 'none' } }}
          animate={{ onEnter: { duration: 500 } }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            // Don't render the top y-axis grid line
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
          title="Y Axis Label"
          textAnchor="middle"
          verticalAnchor="end"
          x={50}
          y={45}
          style={axisLabelStyle}
          text={yLabel}
        />
        <VictoryLabel
          title="X Axis Label"
          textAnchor="end"
          verticalAnchor="end"
          x={600}
          y={295}
          style={axisLabelStyle}
          text={xLabel}
        />
        {/* TODO: Pull this into it's own component */}
        <VictoryScatter
          name="scatter"
          style={style || defaultStyle}
          size={4}
          data={data}
          labels={() => ''}
          labelComponent={
            <VictoryTooltip
              x={325}
              y={50}
              flyoutComponent={<CustomFlyout style={{ background: 'red' }} />}
            />
          }
          animate={{ onEnter: { duration: 500 } }}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: 'labels',
                      mutation: () => ({ active: true }),
                      callback: () => {
                        // TODO: Trigger legend change
                        console.log('tooltip callback');
                      },
                    },
                  ];
                },
              },
            },
          ]}
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
  subtitle: PropTypes.string,
  title: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
};

ScatterPlot.defaultProps = {
  data: null,
  domain: null,
  style: null,
  subtitle: null,
  title: null,
  xLabel: null,
  yLabel: null,
};

export default ScatterPlot;
