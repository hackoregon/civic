import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class AffordableRentalUnitsDwindling extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Affordable Rental Units are Dwindling"
        slug="affordable-rental-units-are-dwindling"
      >
        <Placeholder issue="56"/>
      </CivicStoryCard>
    );
  }
}

AffordableRentalUnitsDwindling.displayName = 'AffordableRentalUnitsDwindling';

// Connect this to the redux store when necessary
export default AffordableRentalUnitsDwindling;
