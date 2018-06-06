import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class NeighborhoodsThroughTheAges extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Neighborhoods Through the Ages">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default NeighborhoodsThroughTheAges;
