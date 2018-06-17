import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class YouAndYourNeighbors extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="You and Your Neighbors in the Earthquake"
        slug="you-and-your-neighbors-in-the-earthquake"
      >
        <Placeholder issue="153" />
      </CivicStoryCard>
    );
  }
}

YouAndYourNeighbors.displayName = 'YouAndYourNeighbors';

// Connect this to the redux store when necessary
export default YouAndYourNeighbors;
