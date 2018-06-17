import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ViolentShakingAndGroundDeformation extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Violent Shaking and Ground Deformation"
        slug="violent-shaking-and-ground-deformation"
      >
        <Placeholder issue="217" />
      </CivicStoryCard>
    );
  }
}

ViolentShakingAndGroundDeformation.displayName = 'ViolentShakingAndGroundDeformation';

// Connect this to the redux store when necessary
export default ViolentShakingAndGroundDeformation;
