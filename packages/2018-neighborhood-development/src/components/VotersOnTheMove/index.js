import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class VotersOnTheMove extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Voters on the Move"
        slug="voters-on-the-move"
      >
      <p>Not considering when people are moving into or out of Portland, 
        this chart looks at the distance from the city center that people 
        are moving, broken up by age group. 
      </p>
        <Placeholder issue="201"/>
      <p>Age is calculated at the time of relocation. Portland city center 
        is defined as the center of burnside bridge. Change in distance from Portland
        city center is calculated by taking the displacement from the individual’s previous
        address. The scatter plot shows when people relocate from their previous address, 
        the direction and the distance moved either toward or away from the city center.
      </p>
      </CivicStoryCard>
    );
  }
}

VotersOnTheMove.displayName = 'VotersOnTheMove';

// Connect this to the redux store when necessary
export default VotersOnTheMove;
