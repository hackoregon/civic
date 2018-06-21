import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class ClassSizeAndQuality extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Classroom Experience"
        slug="class-size-and-quality"
      >
        <p>
        Teacher experience and classroom size impact a student’s learning experience. 
        Below you can see how these two factors change over time in Portland Public Schools.
        </p>
        <Placeholder issue="227"/>
      </CivicStoryCard>
    );
  }
}

ClassSizeAndQuality.displayName = 'ClassSizeAndQuality';

// Connect this to the redux store when necessary
export default ClassSizeAndQuality;
