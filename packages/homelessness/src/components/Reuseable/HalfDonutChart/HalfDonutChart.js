import React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from '@hackoregon/component-library';
import { css } from 'emotion';

const HalfDonutChart = ({dataSets, legend}) => (
  <PieChart />
);

HalfDonutChart.propTypes = {
  dataSets: PropTypes.array.isRequired,
  legend: PropTypes.boolean,
};

HalfDonutChart.defaultProps = {
  legend: true,
};

export default HalfDonutChart;
