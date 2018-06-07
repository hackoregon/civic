import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class BuildingBoomInPortland extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="A Building Boom in Portland">
        <Placeholder issue="166" />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default BuildingBoomInPortland;
