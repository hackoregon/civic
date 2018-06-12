import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class HistoricalChangesToBusService extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Historical Changes to Bus Service"
        slug="historical-changes-to-bus-service"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default HistoricalChangesToBusService;
