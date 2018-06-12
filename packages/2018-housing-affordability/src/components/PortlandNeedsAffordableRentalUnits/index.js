import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class PortlandNeedsAffordableRentalUnits extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Portland Needs Affordable Rental Units">
        <Placeholder issue="55" />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default PortlandNeedsAffordableRentalUnits;
