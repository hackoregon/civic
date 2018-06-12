import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ExploreAgeDemographics extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Explore Age Demographics of Portland Neighborhoods"
        slug="explore-age-demographics"
      >
        <Placeholder>
          <h1>Sandbox Card</h1>
          <p>Don't worry about this one</p>
        </Placeholder>
      </CivicStoryCard>
    );
  }
}

ExploreAgeDemographics.displayName = 'ExploreAgeDemographics';

// Connect this to the redux store when necessary
export default ExploreAgeDemographics;
