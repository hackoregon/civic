import React from "react";

import { CivicStoryCard, Placeholder } from "@hackoregon/component-library";

export class ExploreBusServiceAndEquity extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Explore Bus Service and Equity"
        slug="explore-bus-service-and-equity"
      >
        <Placeholder>
          <h1>Sandbox Card</h1>
          <p>Do not worry about this one</p>
        </Placeholder>
      </CivicStoryCard>
    );
  }
}

ExploreBusServiceAndEquity.displayName = "ExploreBusServiceAndEquity";

// Connect this to the redux store when necessary
export default ExploreBusServiceAndEquity;
