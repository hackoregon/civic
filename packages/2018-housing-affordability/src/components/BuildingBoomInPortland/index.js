import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class BuildingBoomInPortland extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="A Building Boom in Portland"
        slug="building-boom-in-portland"
      >
        <p>The Portland Metro Area is experiencing a building boom as evidenced by building 
          permits for new construction and ADUs. </p>
    
          <Placeholder issue="166" />
      </CivicStoryCard>
    );
  }
}

BuildingBoomInPortland.displayName = 'BuildingBoomInPortland';

// Connect this to the redux store when necessary
export default BuildingBoomInPortland;
