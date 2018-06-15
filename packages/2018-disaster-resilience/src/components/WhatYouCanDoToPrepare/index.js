import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';
import Quiz from './Quiz';

export class WhatYouCanDoToPrepare extends React.Component {


  componentDidMount() {
    // initialize data here
      // load question
  }

  render() {
    return (
      <CivicStoryCard
        title="What You Can Do to Prepare for an Earthquake"
        slug="what-you-can-do-to-prepare-for-an-earthquake"
      >
        <Quiz />
      </CivicStoryCard>
    );
  }
}

WhatYouCanDoToPrepare.displayName = 'WhatYouCanDoToPrepare';

// Connect this to the redux store when necessary
export default WhatYouCanDoToPrepare;
