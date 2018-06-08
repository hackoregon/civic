import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class AffordableRentalUnitsDwindling extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Affordable Rental Units are Dwindling">
        <Placeholder issue="56"/>
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default AffordableRentalUnitsDwindling;
