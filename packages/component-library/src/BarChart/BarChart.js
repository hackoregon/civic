import React, { PropTypes } from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
} from 'victory';

import ChartContainer from '../ChartContainer';
import { dollars, numeric } from '../utils/formatters';
import { assign } from "lodash";
import { css } from 'emotion';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const BarChart = ({ data, dataKey, dataValue, dataKeyLabel, title, subtitle }) =>
  <ChartContainer title={title} subtitle={subtitle}>
    <VictoryChart
      padding={{ left: 75, right: 50, bottom: 50, top: 50 }}
      domainPadding={20}
      animate={{ duration: 300 }}
      theme={CivicVictoryTheme.civic}
    >
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickValues={data.map(a => a[dataKey])}
        tickFormat={data.map(a => a[dataKeyLabel])}
      />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={x => dollars(numeric(x))}
      />
      <VictoryBar
        data={data.map(a => ({ dataKey: a[dataKey], dataValue: a[dataValue] }))}
        x={'dataKey'}
        y={'dataValue'}
      />
    </VictoryChart>
  </ChartContainer>;

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKey: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataKeyLabel: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default BarChart;
