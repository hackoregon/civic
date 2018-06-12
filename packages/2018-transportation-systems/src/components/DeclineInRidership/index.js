import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class DeclineInRidership extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Decline in Ridership"
        slug="decline-in-ridership"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default DeclineInRidership;
