import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class StudentEnrollmentTrends extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Student Enrollment Trends">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default StudentEnrollmentTrends;
