import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class OutraisingYourOpponent extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Outraising Your Opponent">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default OutraisingYourOpponent;
