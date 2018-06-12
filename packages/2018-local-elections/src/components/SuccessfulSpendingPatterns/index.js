import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class SuccessfulSpendingPatterns extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Successful Spending Patterns">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default SuccessfulSpendingPatterns;
