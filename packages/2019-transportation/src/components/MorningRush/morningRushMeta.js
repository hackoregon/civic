import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import MorningRushVisualization from "./MorningRushVisualization";

const MorningRushMeta = (/* data */) => ({
  title: "Morning Rush",
  slug: "morning-rush",
  introText: (
    <p>
      This map displays every bus stop in the in the TriMet system. Stops where
      buses are consistently late are marked in red, while bus stops that
      usually have on-time arrivals are marked in blue.
    </p>
  ),
  visualization: MorningRushVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <p>
      The data here is messy and full of outliers. While putting together this
      map we found <strong>median</strong> delay times of up to{" "}
      <strong>an hour and a half!</strong> Some stops have small sample sizes
      that can exaggerate instances of long delays.
    </p>
  ),
  shareText: "",
  tags: ["Transportation", "Bus", "Portland"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p />
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p />
        <p />
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: null,
  metadataQA: "toads",
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
  authors: "demo"
});

export default MorningRushMeta;
