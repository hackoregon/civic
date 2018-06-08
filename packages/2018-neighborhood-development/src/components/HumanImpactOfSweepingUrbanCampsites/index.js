import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class HumanImpactOfSweepingUrbanCampsites extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Human Impact of Sweeing Urban Campites">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default HumanImpactOfSweepingUrbanCampsites;
