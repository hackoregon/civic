import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ClassSizeAndQuality extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Class Size and Quality">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default ClassSizeAndQuality;
