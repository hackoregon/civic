import React from 'react';
import PropTypes from 'prop-types';

import { dollars } from '@hackoregon/component-library/src/utils/formatters';

import { HorizontalBarChart } from '@hackoregon/component-library';

const propTypes = {
  spending: PropTypes.array,
  loading: PropTypes.bool,
};

const defaultProps = {
  spending: [],
};

const SpendingBreakdown = ({ spending, loading }) => {
  const data = spending.map(c => ({
    y: c.spending_category,
    x: parseInt(c.sum),
  }));

  return (
    <HorizontalBarChart
      loading={loading}
      data={data}
      xLabel="Category"
      yLabel="Spending"
      title="Spending breakdown"
      subtitle="Breakdown of spending..."
      dataValueFormatter={dollars}
      height={400}
    />
  );
};

SpendingBreakdown.propTypes = propTypes;
SpendingBreakdown.defaultProps = defaultProps;

export default SpendingBreakdown;
