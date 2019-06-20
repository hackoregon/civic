import React from "react";

import { CivicStoryCard, Placeholder } from "@hackoregon/component-library";

export class DiveDeeperIntoTransportationData extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Dive Deeper into Transportation Data"
        slug="dive-deeper-into-transportation-data"
      >
        <Placeholder>
          <h1>Sandbox Card</h1>
          <p>Do not worry about this one</p>
        </Placeholder>
      </CivicStoryCard>
    );
  }
}

DiveDeeperIntoTransportationData.displayName =
  "DiveDeeperIntoTransportationData";

// Connect this to the redux store when necessary
export default DiveDeeperIntoTransportationData;
