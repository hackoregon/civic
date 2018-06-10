import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class NeighborhoodsThroughTheAges extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Neighborhoods Through the Ages">
        <Placeholder issue="192"/>
        <Placeholder issue="201"/>
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default NeighborhoodsThroughTheAges;
