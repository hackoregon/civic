import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class WhoCanAffordToBuyAHome extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Who Can Afford to Buy a Home in America?">
        <Placeholder issue="57" />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default WhoCanAffordToBuyAHome;
