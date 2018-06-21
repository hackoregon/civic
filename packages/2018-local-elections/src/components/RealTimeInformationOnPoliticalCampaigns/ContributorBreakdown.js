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
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <PieChart
          data={data}
          title="Contributor breakdown"
          subtitle="Breakdown of contributors..."
          innerRadius={20}
          width={200}
          height={200}
        />
      </div>
    );
  }
}

ContributorBreakdown.propTypes = propTypes;
ContributorBreakdown.defaultProps = defaultProps;

export default ContributorBreakdown;
