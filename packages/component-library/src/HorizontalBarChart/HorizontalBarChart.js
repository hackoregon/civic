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
import { chartEvents } from '../utils/chartHelpers';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const HorizontalBarChart = ({ data, sortOrder, dataValue, dataLabel, domain, title, subtitle, xLabel, yLabel, xNumberFormatter }) => {

  const axisLabelStyle = {
    fontFamily: "'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif",
    fontSize: '14px',
    fontWeight: 'bold',
  };

  const barData =
    sortOrder && sortOrder.length
      ? data
      : data.map((d, index) => {
        return { ...d, defaultSort: index + 1 };
      });

  const sortOrderKey =
    sortOrder && sortOrder.length
      ? sortOrder
      : 'defaultSort';

  return (
    <ChartContainer title={title} subtitle={subtitle}>
      <VictoryChart
        domain={domain}
        padding={{ left: 115, right: 50, bottom: 50, top: 70 }}
        domainPadding={0}
        theme={CivicVictoryTheme.civic}
      >
        <VictoryAxis
          dependentAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={barData.map(a => a[sortOrderKey])}
          tickFormat={barData.map(a => a[dataLabel])}
          title="Y Axis"
        />
        <VictoryAxis
          // tickFormat specifies how ticks should be displayed
          orientation="top"
          tickFormat={xNumberFormatter}
          title="X Axis"
        />
        <VictoryPortal>
          <VictoryLabel
            style={axisLabelStyle}
            text={yLabel}
            textAnchor="middle"
            title="Y Axis Label"
            verticalAnchor="end"
            x={50}
            y={65}
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
            y={85}
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
          data={barData.map(d => ({ sortOrder: d[sortOrderKey], dataValue: d[dataValue], label: `${d[dataLabel]}: ${xNumberFormatter(d[dataValue])}` }))}
          title="Horizontal Bar Chart"
          x="sortOrder"
          y="dataValue"
          events={chartEvents}
        />
      </VictoryChart>
    </ChartContainer>
  );
};

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  ),
  sortOrder: PropTypes.string,
  dataValue: PropTypes.string,
  dataLabel: PropTypes.string,
  domain: PropTypes.objectOf(PropTypes.array),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  xNumberFormatter: PropTypes.func,
};

HorizontalBarChart.defaultProps = {
  data: null,
  sortOrder: null,
  dataValue: 'x',
  dataLabel: 'y',
  domain: null,
  title: null,
  subtitle: null,
  xLabel: "X",
  yLabel: "Y",
  xNumberFormatter: numeric,
};

export default HorizontalBarChart;
