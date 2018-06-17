import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class IsPartyAffiliationRelevant extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Is Party Affiliation Relevant?"
        slug="is-party-affiliation-relevant"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

IsPartyAffiliationRelevant.displayName = 'IsPartyAffiliationRelevant';

// Connect this to the redux store when necessary
export default IsPartyAffiliationRelevant;
