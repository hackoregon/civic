import React from 'react';
import PropTypes from 'prop-types';

import { PieChart } from '@hackoregon/component-library';

// This base can be adjusted to scale up or down the chart and legend
const proportionBase = 400;

// These multipliers can be adjusted to modify the individual
const chartProportions = {
  chartWidth: proportionBase * 1,
  chartHeight: proportionBase * 1,
};

const ErPieChart = ({ data, dataValue, dataLabel }) => (
      <PieChart
        data={data}
        dataValue={dataValue}
        dataLabel={dataLabel}
        width={chartProportions.chartWidth}
        height={chartProportions.chartHeight}
      />
);

ErPieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  dataValue: PropTypes.string,
  dataLabel: PropTypes.string,
}

export default ErPieChart;
