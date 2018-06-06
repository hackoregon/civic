import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class AffordabilityInAComplexHousingMarket extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="The Challenge of Affordability in a Complex Housing Market">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default AffordabilityInAComplexHousingMarket;
