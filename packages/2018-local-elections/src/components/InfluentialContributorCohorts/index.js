import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class InfluentialContributorCohorts extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Influential Contributor Cohorts"
        slug="influential-contributor-cohorts"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

InfluentialContributorCohorts.displayName = 'InfluentialContributorCohorts';

// Connect this to the redux store when necessary
export default InfluentialContributorCohorts;
