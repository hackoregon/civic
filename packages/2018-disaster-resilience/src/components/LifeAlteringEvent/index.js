import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class LifeAlteringEvent extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="A Life-Altering Event for Portlanders"
        slug="life-altering-event"
      >
        <p>A 9.0 Cascadia Subduction Zone earthquake will be a life-altering for Portlanders. 
          Should the earthquake happen at 2am, most Portlanders would be home and in bed, one of
           the safest places to be during an earthquake; should it occur at 2p, many residents would 
           be at work where collapsed unreinforced masonry buildings would drastically increase fatalities. 
           Ground shaking and related effects, building structure types, and building occupancy, all impact 
           the model used to estimate the impact on the city, by neighborhood.
        </p>
        
        <Placeholder issue="154" />
        <p>The below table presents estimated outcomes based on the selected neighborhood, split
          by time of earthquake (2a v 2p): Fatalities, Injuries, Displaced Population, and damage in dollars. 
        </p>
      </CivicStoryCard>
    );
  }
}

LifeAlteringEvent.displayName = 'LifeAlteringEvent';

// Connect this to the redux store when necessary
export default LifeAlteringEvent;
