import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class TheShapeOfANeighborhood extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="The Shape of a Neighborhood">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default TheShapeOfANeighborhood;
