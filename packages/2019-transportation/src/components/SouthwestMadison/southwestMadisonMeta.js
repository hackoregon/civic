import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import SouthwestMadisonVisualization from "./SouthwestMadisonVisualization";
import ComparisonMapAdditionalText from "../ComparisonMapAdditionalText";

const SouthwestMadisonMeta = (/* data */) => ({
  title: "Hawthorne Bridge - Eastbound Approach",
  slug: "southwest-madison",
  introText: (
    <p>
      Modest changes to public transit infrastructure can lead to significant
      improvements in service quality, which is a key factor in encouraging
      ridership. By visualizing granular, historical congestion data, we can
      better understand the impacts of these changes on service performance.
    </p>
  ),
  visualization: SouthwestMadisonVisualization, // data, isLoading are passed to this as props
  additionalText: <ComparisonMapAdditionalText />,
  shareText: "",
  tags: ["Transportation", "Portland", "Oregon", "Map", "Chart"],
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

export default SouthwestMadisonMeta;
