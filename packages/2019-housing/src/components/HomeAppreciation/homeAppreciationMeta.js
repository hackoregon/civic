import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import HomeAppreciationVisualization from "./HomeAppreciationVisualization";

const HomeAppreciationMeta = (/* data */) => ({
  title: "Home Ownership, Race, and Appreciation",
  slug: "home-appreciation",
  introText: null,
  visualization: HomeAppreciationVisualization, // data, isLoading are passed to this as props
  additionalText: <p>ADDITIONAL TEXT: TBD</p>,
  shareText: "TODO: Add share text!",
  tags: ["Housing", "Portland", "Oregon", "Map"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>ANALYSIS: TBD</p>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p>ADD DETAILS HERE</p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: null,
  metadataQA: "hmda",
  resources: [
    {
      heading: "Organizations",
      items: [
        { link: "http://www.hackoregon.org", description: "Hack Oregon" },
        {
          link: "https://www.civicsoftwarefoundation.org",
          description: "Civic Software Foundation"
        },
        { link: "https://www.civicplatform.org", description: "Civic Platform" }
      ]
    }
  ],
  // authors likely an array of keys in the future
  authors: []
});

export default HomeAppreciationMeta;
