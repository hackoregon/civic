import React from 'react';
import PropTypes from 'prop-types';

import { dollars, numeric } from '@hackoregon/component-library/src/utils/formatters';

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
      subtitle="Spending reported to ORSTAR by category"
      dataValueFormatter={numeric}
      height={300}
      minimalist
    />
  );
};

SpendingBreakdown.propTypes = propTypes;
SpendingBreakdown.defaultProps = defaultProps;

export default SpendingBreakdown;
