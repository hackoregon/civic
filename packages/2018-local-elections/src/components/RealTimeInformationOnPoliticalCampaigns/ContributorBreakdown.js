import React from "react";
import PropTypes from "prop-types";

import { PieChart } from "@hackoregon/component-library";

const propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool
};

const defaultProps = {
  contributors: []
};

const ContributorBreakdown = ({ contributors, loading }) => {
  const data = contributors.map(c => ({
    x: c.donor_category,
    y: c.sum
  }));

  return (
    <PieChart
      loading={loading}
      data={data}
      title="Contributor breakdown"
      subtitle="Contributions reported to ORESTAR by category"
      innerRadius={50}
      height={400}
    />
  );
};

ContributorBreakdown.propTypes = propTypes;
ContributorBreakdown.defaultProps = defaultProps;

export default ContributorBreakdown;
