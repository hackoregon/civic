import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class HowMuchDoesMoneyMatterInElections extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="How Much Does Money Really Matter in Elections?">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default HowMuchDoesMoneyMatterInElections;
