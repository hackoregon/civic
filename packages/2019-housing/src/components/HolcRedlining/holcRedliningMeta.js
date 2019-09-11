import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import HolcRedliningVisualization from "./HolcRedliningVisualization";

const HolcRedliningMeta = (/* data */) => ({
  title: "Card #8: HOLC Redlining Map",
  slug: "holc-redlining",
  introText: (
    <p>
      There have historically been institutional barriers to PoC trying to
      secure housing. One clear example of this with readily available data is
      the federal Home Owners’ Loan Corporation’s grades of neighborhoods. These
      grades were used to establish a lending risk framework; a key factor in
      these were the racial composition of neighborhoods. We’ve connected the
      Portland data for this to our Sandbox, to make it easy to compare the
      historical boundaries and grades to the current landscape of how the city
      has grown.
    </p>
  ),
  visualization: HolcRedliningVisualization, // data, isLoading are passed to this as props
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
  metadataQA: "mapping_inequality_redlining_in_new_deal_america",
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

export default HolcRedliningMeta;
