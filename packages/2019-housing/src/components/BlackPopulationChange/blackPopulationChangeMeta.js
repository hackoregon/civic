import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import BlackPopulationChangeVisualization from "./BlackPopulationChangeVisualization";

const BlackPopulationChangeMeta = (/* data */) => ({
  title: "Black Population Share Change Over Time",
  slug: "black-population-change",
  introText: (
    <p>
      Portland has historically had very few neighborhoods with proportionally
      large shares of Black residents, and this trend has grown more pronounced
      over time. The small handful of census tracts with significant proportions
      of Black residents have all but vanished in the past 30 years.
    </p>
  ),
  visualization: BlackPopulationChangeVisualization, // data, isLoading are passed to this as props
  additionalText: <p>ADDITIONAL TEXT: TBD</p>,
  shareText: "TODO: Add share text!",
  tags: ["Housing", "Race", "Map", "Portland", "Oregon"],
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
  metadata: null, // TODO, not sure which meta
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

export default BlackPopulationChangeMeta;
