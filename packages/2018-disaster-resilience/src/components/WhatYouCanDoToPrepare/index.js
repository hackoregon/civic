import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class WhatYouCanDoToPrepare extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="What You Can Do to Prepare for an Earthquake"
        slug="what-you-can-do-to-prepare-for-an-earthquake"
      >
        <p>Earthquakes can be scary and often accompanied by fear, anxiety and loss. 
          Having a family plan, knowing your neighbors and preparing a 3-day evacuation 
          kit are examples of advance preparations that can help lessen the impact. Take 
          this quiz to create a personalized list of next steps to prepare for a disaster.  
        </p>
        <Placeholder issue="185" />
      </CivicStoryCard>
    );
  }
}

WhatYouCanDoToPrepare.displayName = 'WhatYouCanDoToPrepare';

// Connect this to the redux store when necessary
export default WhatYouCanDoToPrepare;
