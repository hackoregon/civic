import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import AduDistributionsVisualization from "./AduDistributionsVisualization";

const AduDistributionsMeta = (/* data */) => ({
  title: "Card #6: Adu Distributions (TODO: Make a real title)",
  slug: "adu-distributions",
  introText: <p>INTRO TEXT: TBD</p>,
  visualization: AduDistributionsVisualization, // data, isLoading are passed to this as props
  additionalText: <p>ADDITIONAL TEXT: TBD</p>,
  shareText: "TODO: Add share text!",
  tags: ["Housing", "Portland", "Oregon", "Chart", "Map"],
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
  metadata: null, // no metadata
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

export default AduDistributionsMeta;
