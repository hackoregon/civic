import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class UnderstandingStaffCuts extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Understanding Staff Cuts in Portland Public Schools">
        <Placeholder issue="201" />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default UnderstandingStaffCuts;
