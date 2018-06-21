import React from 'react';
import PropTypes from 'prop-types';

import { PieChart } from '@hackoregon/component-library';

const propTypes = {
  contributors: PropTypes.array,
};

const defaultProps = {
  contributors: [],
};

const ContributorBreakdown = ({ contributors }) => {
  const data = contributors.map(c => ({
    x: c.donor_category,
    y: c.sum,
  }));

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <PieChart
        data={data}
        title="Contributor breakdown"
        subtitle="Breakdown of contributors..."
        innerRadius={20}
        height={400}
      />
    </div>
  );
};

ContributorBreakdown.propTypes = propTypes;
ContributorBreakdown.defaultProps = defaultProps;

export default ContributorBreakdown;
