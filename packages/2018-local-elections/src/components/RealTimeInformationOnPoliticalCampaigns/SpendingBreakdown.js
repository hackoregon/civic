import React from "react";
import PropTypes from "prop-types";

import { HorizontalBarChart } from "@hackoregon/component-library";
import { civicFormat } from "@hackoregon/component-library/dist/utils";

const propTypes = {
  spending: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool
};

const defaultProps = {
  spending: []
};

const SpendingBreakdown = ({ spending, loading }) => {
  const data = spending.map(c => ({
    y: c.spending_category,
    x: parseInt(c.sum, 10)
  }));

  return (
    <HorizontalBarChart
      loading={loading}
      data={data}
      xLabel="Category"
      yLabel="Spending"
      title="Spending breakdown"
      subtitle="Spending reported to ORESTAR by category"
      dataValueFormatter={civicFormat.numeric}
      height={300}
      minimalist
    />
  );
};

SpendingBreakdown.propTypes = propTypes;
SpendingBreakdown.defaultProps = defaultProps;

export default SpendingBreakdown;
