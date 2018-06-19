import React from 'react';
import PropTypes from 'prop-types';

import { PieChart } from '@hackoregon/component-library';

const propTypes = {
  contributors: PropTypes.array,
};

const defaultProps = {
  contributors: [],
};

class ContributorBreakdown extends React.Component {
  render() {
    const data = this.props.contributors.map(c => ({
      x: c.donor_category,
      y: c.sum,
    }));

    return (
      <PieChart
        data={data}
        title="Contributor breakdown"
        subtitle="Breakdown of contributors..."
        innerRadius={150}
      />
    );
  }
}

ContributorBreakdown.propTypes = propTypes;
ContributorBreakdown.defaultProps = defaultProps;

export default ContributorBreakdown;
