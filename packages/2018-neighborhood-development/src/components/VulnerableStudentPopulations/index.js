import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class VulnerableStudentPopulations extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Vulnerable Student Populations">
        <Placeholder issue="228"/>
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default VulnerableStudentPopulations;
