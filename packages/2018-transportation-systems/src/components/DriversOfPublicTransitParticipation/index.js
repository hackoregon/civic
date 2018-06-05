import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class DriversOfPublicTransitParticipation extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Drivers of Public Transit Participation">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default DriversOfPublicTransitParticipation;
