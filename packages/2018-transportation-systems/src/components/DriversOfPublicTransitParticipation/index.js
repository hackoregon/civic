import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class DriversOfPublicTransitParticipation extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Drivers of Public Transit Participation"
        slug="drivers-of-public-transit-participation"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default DriversOfPublicTransitParticipation;
