import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class IsPartyAffiliationRelevant extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard title="Is Party Affiliation Relevant?">
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

// Connect this to the redux store when necessary
export default IsPartyAffiliationRelevant;
