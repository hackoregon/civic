import React, { PropTypes } from 'react';
import {
  VictoryScatter,
  VictoryChart,
  VictoryLine,
  VictoryAxis,
} from 'victory';

import ChartContainer from '../ChartContainer';
import { numeric } from '../utils/formatters';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const LineChart = ({
  title,
  subtitle,
  data,
  xLabel,
  dataKey,
  dataValue,
  dataKeyLabel,
}) => (
  <ChartContainer title={title} subtitle={subtitle}>
    <VictoryChart
      padding={{ left: 75, right: 50, bottom: 50, top: 50 }}
      domainPadding={20}
      animate={{ duration: 300 }}
      theme={CivicVictoryTheme.civic}
    >
      <VictoryAxis
        label={xLabel}
        tickValues={data.map(d => d[dataKey])}
        tickFormat={data.map(d => d[dataKeyLabel])}
      />
      <VictoryAxis
        dependentAxis
        tickValues={data.map(d => d[dataValue])}
        tickFormat={data.map(d => numeric(d[dataValue]))}
      />
      <VictoryLine
        data={data.map(d => ({ dataKey: d[dataKey], dataValue: d[dataValue] }))}
        x="dataKey"
        y="dataValue"
      />
      <VictoryScatter
        data={data.map(d => ({ dataKey: d[dataKey], dataValue: d[dataValue] }))}
        x="dataKey"
        y="dataValue"
      />
    </VictoryChart>
  </ChartContainer>
);

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xLabel: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataKeyLabel: PropTypes.string,
};

LineChart.defaultProps = {
  data: [],
};

export default LineChart;
