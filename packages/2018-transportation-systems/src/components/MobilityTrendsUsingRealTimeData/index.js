import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class MobilityTrendsUsingRealTimeData extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Mobility Trends Using Real-Time Data"
        slug="mobility-trends-using-real-time-data"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

MobilityTrendsUsingRealTimeData.displayName = 'MobilityTrendsUsingRealTimeData';

// Connect this to the redux store when necessary
export default MobilityTrendsUsingRealTimeData;
