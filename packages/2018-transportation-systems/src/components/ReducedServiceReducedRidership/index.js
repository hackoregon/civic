import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ReducedServiceReducedRidership extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Reduced Service, Reduced Ridership"
        slug="reduced-service-reduced-ridership"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

ReducedServiceReducedRidership.displayName = 'ReducedServiceReducedRidership';

// Connect this to the redux store when necessary
export default ReducedServiceReducedRidership;
