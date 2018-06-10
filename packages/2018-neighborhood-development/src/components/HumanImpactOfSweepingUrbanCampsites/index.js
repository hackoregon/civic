import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class HumanImpactOfSweepingUrbanCampsites extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Human Impact of Sweeping Urban Campsites">
        <Placeholder issue="100"/>
        <Placeholder issue="102"/>
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default HumanImpactOfSweepingUrbanCampsites;
