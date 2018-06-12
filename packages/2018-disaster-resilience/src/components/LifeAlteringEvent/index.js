import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class LifeAlteringEvent extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="A Life-Altering Event for Portlanders"
        slug="life-altering-event"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

LifeAlteringEvent.displayName = 'LifeAlteringEvent';

// Connect this to the redux store when necessary
export default LifeAlteringEvent;
