import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class WhoCanAffordToBuyAHome extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Who Can Afford to Buy a Home in America?"
        slug="who-can-afford-to-buy-a-home"
      >
        <Placeholder issue="57" />
      </CivicStoryCard>
    );
  }
}

WhoCanAffordToBuyAHome.displayName = 'WhoCanAffordToBuyAHome';

// Connect this to the redux store when necessary
export default WhoCanAffordToBuyAHome;
