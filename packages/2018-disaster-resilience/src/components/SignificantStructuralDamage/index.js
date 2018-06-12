import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class SignificantStructuralDamage extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Significant Structural Damage"
        slug="significant-structural-damage"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default SignificantStructuralDamage;
