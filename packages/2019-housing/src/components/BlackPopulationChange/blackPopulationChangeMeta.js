import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import BlackPopulationChangeVisualization from "./BlackPopulationChangeVisualization";

const BlackPopulationChangeMeta = (/* data */) => ({
  title: "Card #4: Black Population Share Change Over Time",
  slug: "black-population-change",
  introText: (
    <p>
      Portland has historically had very few neighborhoods with proportionally
      large shares of black residents, and this trend has grown more pronounced
      over time. The small handful of census tracts with significant proportions
      of black residents have all but vanished in the past 30 years.
    </p>
  ),
  visualization: BlackPopulationChangeVisualization, // data, isLoading are passed to this as props
  additionalText: <p>ADDITIONAL TEXT: TBD</p>,
  shareText: "TODO: Add share text!",
  tags: ["Housing", "Race", "Map", "Portland"],
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
  metadata: (
    <Collapsable>
      <Collapsable.Section>
        <p>METADATA: TBD</p>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p>ADD DETAILS HERE</p>
      </Collapsable.Section>
    </Collapsable>
  ),
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
  authors: [
    "https://civicsoftwarefoundation.org/static/human-grid-test-4c90bfc3f316f5d4e104320cb98c43c8.png",
    "https://civicsoftwarefoundation.org/static/human-grid-test2-ea1849501456af341647068243fc72bb.png"
  ]
});

export default BlackPopulationChangeMeta;
