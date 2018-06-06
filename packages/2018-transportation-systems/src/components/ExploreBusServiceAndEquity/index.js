import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ExploreBusServiceAndEquity extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Explore Bus Service and Equity">
        <Placeholder>
          <h1>Sandbox Card</h1>
          <p>Don't worry about this one</p>
        </Placeholder>
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default ExploreBusServiceAndEquity;
