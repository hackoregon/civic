import React from "react";

import { CivicStoryCard, Placeholder } from "@hackoregon/component-library";

export class IncreasingSocialCapital extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Increasing Social Capital Leads to Increased Resilience"
        slug="increasing-social-capital"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

IncreasingSocialCapital.displayName = "IncreasingSocialCapital";

// Connect this to the redux store when necessary
export default IncreasingSocialCapital;
