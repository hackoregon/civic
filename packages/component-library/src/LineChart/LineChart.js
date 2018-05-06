import React, { PropTypes } from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from 'victory';

const LineChart = ({
  data,
  xLabel,
  yLabel,
  dataKey,
  dataValue,
  dataKeyLabel,
  categories,
}) => (
  <VictoryChart
    domainPadding={20}
    theme={VictoryTheme.material}
  >
    <VictoryAxis
      label={xLabel}
      tickValues={data.map(d => d[dataKey])}
    />
    <VictoryAxis
      dependentAxis
      label={yLabel}
      tickValues={data.map(d => d[dataValue])}
    />
    <VictoryLine
      data={data.map(d => ({ dataKey: d[dataKey], dataValue: d[dataValue] }))}
      categories={{ x: categories }}
      x="dataKey"
      y="dataValue"
    />
  </VictoryChart>
);

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataKeyLabel: PropTypes.string,
  dataValueLabel: PropTypes.string,
};

LineChart.defaultProps = {
  data: [],
};

export default LineChart;
