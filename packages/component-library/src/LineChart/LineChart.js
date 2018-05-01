import React from 'react';
import {
  VictoryChart,
  VictoryLine,
} from 'victory';

const LineChart = ({ data, dataKey }) => (
  <VictoryChart
    domainPadding={20}
  >
    <VictoryLine
      data={ data }
    />
  </VictoryChart>
);

export default LineChart;
