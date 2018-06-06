import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class WhatDoesAffordabilityMean extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="What Does Affordability Mean?">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default WhatDoesAffordabilityMean;
