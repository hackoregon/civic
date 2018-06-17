import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ExploreHousingPolicyImplementation extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Explore Housing Policy Implementation in the Portland Metro Area"
        slug="explore-housing-policy-implementation"
      >
        <Placeholder issue="106" />
      </CivicStoryCard>
    );
  }
}

ExploreHousingPolicyImplementation.displayName = 'ExploreHousingPolicyImplementation';

// Connect this to the redux store when necessary
export default ExploreHousingPolicyImplementation;
