import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class VotersOnTheMove extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Voters on the Move">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default VotersOnTheMove;
