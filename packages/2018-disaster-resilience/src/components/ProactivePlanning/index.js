import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ProactivePlanning extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Proactive Planning for City-Wide Resilience"
        slug="proactive-planning-for-city-wide-resilience"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default ProactivePlanning;
