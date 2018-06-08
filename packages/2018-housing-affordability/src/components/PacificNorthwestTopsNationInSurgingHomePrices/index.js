import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class PacificNorthwestTopsNationInSurgingHomePrices extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Pacific Northwest Tops the Nation in Surging Home Prices">
        <Placeholder issue="58" />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default PacificNorthwestTopsNationInSurgingHomePrices;
