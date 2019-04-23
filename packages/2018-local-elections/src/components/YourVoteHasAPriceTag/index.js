import React from "react";

import { CivicStoryCard, Placeholder } from "@hackoregon/component-library";

export class YourVoteHasAPriceTag extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Your Vote has a Price Tag"
        slug="your-vote-has-a-price-tag"
      >
        <Placeholder />
      </CivicStoryCard>
    );
  }
}

YourVoteHasAPriceTag.displayName = "YourVoteHasAPriceTag";

// Connect this to the redux store when necessary
export default YourVoteHasAPriceTag;
