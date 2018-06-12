import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class MeasuringThePowerOfGrassroots extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Measuring the Power of Grassroots">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default MeasuringThePowerOfGrassroots;
