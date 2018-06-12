import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class MagnitudeOfUrbanCampsiteSweeps extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Magnitude of Urban Campsite Sweeps in Portland">
        <Placeholder issue="85"/>
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default MagnitudeOfUrbanCampsiteSweeps;
