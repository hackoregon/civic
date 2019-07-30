import React from "react";

import { CivicStoryCard, Placeholder } from "@hackoregon/component-library";

export class DiveDeeperIntoNeighborhoodData extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Dive Deeper into Neighborhood Data"
        slug="dive-deeper-into-neighborhood-data"
      >
        <Placeholder>
          <h1>Sandbox Card</h1>
          <p>Do not worry about this one</p>
        </Placeholder>
      </CivicStoryCard>
    );
  }
}

DiveDeeperIntoNeighborhoodData.displayName = "DiveDeeperIntoNeighborhoodData";

// Connect this to the redux store when necessary
export default DiveDeeperIntoNeighborhoodData;
