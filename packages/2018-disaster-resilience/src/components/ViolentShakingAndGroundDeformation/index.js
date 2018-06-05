import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ViolentShakingAndGroundDeformation extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Violent Shaking and Ground Deformation">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default ViolentShakingAndGroundDeformation;
