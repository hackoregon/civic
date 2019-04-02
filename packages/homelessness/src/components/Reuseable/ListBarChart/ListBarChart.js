import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalBarChart } from '@hackoregon/component-library';

const ListBarChart = ({data}) => (
  <HorizontalBarChart data={data} />
);

ListBarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ListBarChart;
