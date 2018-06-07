import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class IncreasingVolumeOfMoney extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="The Increasing Volume of Money in Oregon Elections">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default IncreasingVolumeOfMoney;
