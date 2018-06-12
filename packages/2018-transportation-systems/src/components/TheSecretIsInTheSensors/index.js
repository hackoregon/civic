import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class TheSecretIsInTheSensors extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="The Secret is in the Sensors"
        slug="the-secret-is-in-the-sensors"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

TheSecretIsInTheSensors.displayName = 'TheSecretIsInTheSensors';

// Connect this to the redux store when necessary
export default TheSecretIsInTheSensors;
