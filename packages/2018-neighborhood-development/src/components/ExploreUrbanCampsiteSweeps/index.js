import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ExploreUrbanCampsiteSweeps extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Explore Urban Campsite Sweeps by Neighborhood"
        slug="explore-urban-campsite-sweeps"
      >
        <Placeholder>
          <h1>Sandbox Card</h1>
          <p>Don't worry about this one</p>
        </Placeholder>
      </CivicStoryCard>
    );
  }
}

ExploreUrbanCampsiteSweeps.displayName = 'ExploreUrbanCampsiteSweeps';

// Connect this to the redux store when necessary
export default ExploreUrbanCampsiteSweeps;
