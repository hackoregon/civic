import React, { PropTypes } from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart
} from 'victory';

const HorizontalBarChart = ({ data, dataKey, dataValue, dataKeyLabel, dataValueLabel }) =>
  <VictoryChart
    domainPadding={20}
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
      tickFormat={(x) => (`$${x / 1000}k`)}
    />
    <VictoryBar
      data={data.map(a => ({ dataKey: a[dataKey], dataValue: a[dataValue] }))}
      x={'dataKey'}
      y={'dataValue'}
    />
  </VictoryChart>

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKey: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataKeyLabel: PropTypes.string,
  dataValueLabel: PropTypes.string,
};

// HorizontalBarChart.defaultProps = {
//   dataKeyLabel: props.dataKey,
//   dataValueLabel: props.dataValue
// }

export default HorizontalBarChart;
