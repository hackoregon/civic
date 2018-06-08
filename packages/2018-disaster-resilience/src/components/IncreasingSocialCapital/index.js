import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class IncreasingSocialCapital extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Increasing Social Capital Leads to Increased Resilience">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default IncreasingSocialCapital;
