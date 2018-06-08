import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class MeasuringMarketValueOfHomesInPortland extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Measuring Market Value of Homes in Portland">
        <Placeholder issue="215" />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default MeasuringMarketValueOfHomesInPortland;
