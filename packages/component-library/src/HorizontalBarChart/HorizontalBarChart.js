import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryTooltip,
} from 'victory';

import ChartContainer from '../ChartContainer';
import { dollars, numeric } from '../utils/formatters';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const chartEvents = [
  {
    target: 'data',
    eventHandlers: {
      onMouseOver: () => {
        return [
          {
            target: 'data',
            mutation: () => ({ style: { fill: 'tomato', width: 40 } }),
          }, {
            target: 'labels',
            mutation: () => ({ active: true }),
          },
        ];
      },
      onMouseOut: () => {
        return [
          {
            target: 'data',
            mutation: () => { },
          }, {
            target: 'labels',
            mutation: () => ({ active: false }),
          },
        ];
      },
    },
  },
];

const HorizontalBarChart = ({ data, dataKey, dataValue, dataKeyLabel, domain, title, subtitle, xLabel, yLabel }) => {

  const axisLabelStyle = {
    fontFamily: "'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif",
    fontSize: '14px',
    fontWeight: 'bold',
  };

  return (
    <ChartContainer title={title} subtitle={subtitle}>
      <VictoryChart
        padding={{ left: 115, right: 50, bottom: 50, top: 50 }}
        domainPadding={20}
        animate={{ duration: 300 }}
        theme={CivicVictoryTheme.civic}
      >
        <VictoryAxis
          dependentAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={data.map(a => a[dataKey])}
          tickFormat={data.map(a => a[dataKeyLabel])}
        />
        <VictoryAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={x => dollars(numeric(x))}
        />
        <VictoryPortal>
          <VictoryLabel
            style={axisLabelStyle}
            text={yLabel}
            textAnchor="middle"
            title="Y Axis Label"
            verticalAnchor="end"
            x={50}
            y={45}
          />
        </VictoryPortal>
        <VictoryPortal>
          <VictoryLabel
            style={axisLabelStyle}
            text={xLabel}
            textAnchor="end"
            title="X Axis Label"
            verticalAnchor="end"
            x={600}
            y={295}
          />
        </VictoryPortal>
        <VictoryBar
          horizontal
          labelComponent={
            <VictoryTooltip
              x={325}
              y={0}
              orientation="bottom"
              pointerLength={0}
              cornerRadius={0}
            />
          }
          data={data.map(a => ({ dataKey: a[dataKey], dataValue: a[dataValue], label: `${a[dataKeyLabel]}: ${numeric(a[dataValue])}` }))}
          x="dataKey"
          y="dataValue"
          events={chartEvents}
        />
      </VictoryChart>
    </ChartContainer>
  );
};

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKey: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataKeyLabel: PropTypes.string,
  domain: PropTypes.objectOf(PropTypes.array),  
  title: PropTypes.string,
  subtitle: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string
};

export default HorizontalBarChart;
