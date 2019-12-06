import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import SoutheastHawthorneVisualization from "./SoutheastHawthorneVisualization";
import ComparisonMapAdditionalText from "../ComparisonMapAdditionalText";

const SoutheastHawthorneMeta = (/* data */) => ({
  title: "Hawthorne Bridge - Westbound Approach",
  slug: "southeast-hawthorne",
  introText: (
    <p>
      Modest changes to public transit infrastructure can lead to significant
      improvements in service quality, which is a key factor in encouraging
      ridership. By visualizing granular, historical congestion data, we can
      better understand the impacts of these changes on service performance.
    </p>
  ),
  visualization: SoutheastHawthorneVisualization, // data, isLoading are passed to this as props
  additionalText: <ComparisonMapAdditionalText />,
  shareText: "",
  tags: ["Transportation", "Portland", "Map", "Chart"],
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
  metadata: (
    <Collapsable>
      <Collapsable.Section>
        <p />
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p />
      </Collapsable.Section>
    </Collapsable>
  ),
  resources: [
    {
      heading: "Organizations",
      items: [
        { link: "https://www.hackoregon.org", description: "Hack Oregon" },
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

export default SoutheastHawthorneMeta;
