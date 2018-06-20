import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class RentBurdenedHouseholds extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Rent Burdened Households"
        slug="rent-burdened-households"
      >
        <p>A household is severely burdened when its monthly
           rent exceeds 50% of monthly income. In 2015, 24% of all 
           households in the Portland region were severely burdened, up 8
           percentage points from 2014. Nationally, Portland ranks 50 out of 
           100 in terms of cost burdened renters </p>
        <Placeholder issue = "194"/>
      </CivicStoryCard>
    );
  }
}

RentBurdenedHouseholds.displayName = 'RentBurdenedHouseholds';

// Connect this to the redux store when necessary
export default RentBurdenedHouseholds;
