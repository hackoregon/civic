import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class AffordabilityInAComplexHousingMarket extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="The Challenge of Affordability in a Complex Housing Market"
        slug="affordability-in-a-complex-housing-market"
      >
        <Placeholder issue="212" />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default AffordabilityInAComplexHousingMarket;
