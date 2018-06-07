import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class RealTimeInformationOnPoliticalCampaigns extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Real-Time Information on Political Campaigns">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default RealTimeInformationOnPoliticalCampaigns;
