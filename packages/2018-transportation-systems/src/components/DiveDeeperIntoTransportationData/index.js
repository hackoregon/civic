import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class DiveDeeperIntoTransportationData extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Dive Deeper into Transportation Data">
        <Placeholder>
          <h1>Sandbox Card</h1>
          <p>Don't worry about this one</p>
        </Placeholder>
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default DiveDeeperIntoTransportationData;
