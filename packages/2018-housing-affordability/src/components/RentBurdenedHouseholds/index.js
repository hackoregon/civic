import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class RentBurdenedHouseholds extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Rent Burdened Households">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default RentBurdenedHouseholds;
