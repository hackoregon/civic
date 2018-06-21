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
        <p>During the Recession, we saw a Nationwide decrease in the number of 
          busses on the roads. This drop in Service Availability was an Operational
          Reality for many Transit Organizations, and the possible consequences for 
          Ridership are only recently being considered. In this CIVIC Platform Sandbox
          feature, we show how Ridership and Transit Frequency have changed in Portland 
          between 2009 and 2017.
        </p>
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

HistoricalChangesToBusService.displayName = 'HistoricalChangesToBusService';

// Connect this to the redux store when necessary
export default HistoricalChangesToBusService;
