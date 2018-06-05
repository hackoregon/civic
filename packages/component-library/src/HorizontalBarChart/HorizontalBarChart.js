import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTooltip,
} from 'victory';

import ChartContainer from '../ChartContainer';
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

const HorizontalBarChart = ({
  data,
  dataKey,
  dataValue,
  dataKeyLabel,
  title,
  subtitle,
  horizontalFormatter,
  labelFormatter,
}) => {
  const yFormatter = x => horizontalFormatter(x[dataValue]);
  const defaultLabelFormatter = labelFormatter || (x => `${x[dataKeyLabel]}: ${yFormatter(x)}`);
  const formattedData = data.map(x => ({
    x: x[dataKeyLabel],
    y: x[dataValue],
    label: defaultLabelFormatter(x),
  })).reverse();
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
        />
        <VictoryAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={horizontalFormatter}
        />
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
          data={formattedData}
          events={chartEvents}
        />
      </VictoryChart>
    </ChartContainer>
  )
};

HorizontalBarChart.defaultProps = {
  horizontalFormatter: x => x,
};

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKey: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataKeyLabel: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  horizontalFormatter: PropTypes.func,
};

export default HorizontalBarChart;
