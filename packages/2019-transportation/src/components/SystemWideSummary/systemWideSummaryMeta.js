import React from "react";
import { Collapsable } from "@hackoregon/component-library";
import { isLoaded } from "reduxful";

import SystemWideSummaryVisualization from "./SystemWideSummaryVisualization";

const SystemWideSummaryMeta = data => ({
  title: "System Wide Summary",
  slug: "system-wide-summary",
  introText: (
    <p>
      {isLoaded(data.busSystemWideSummary)
        ? `This chart is generated from ${data.busSystemWideSummary.value.results
            .reduce((acc, result) => acc + result.total_ons, 0)
            .toLocaleString()} total onboarding events and ${data.busSystemWideSummary.value.results
            .reduce((acc, result) => acc + result.total_offs, 0)
            .toLocaleString()} total offboarding events. Morning rush hour peaks just before 8:00 a.m., while the evening rush hour peaks from about 3:30 p.m. to about 5:30 p.m. Identifying these peak hours gives us the ability to focus on local and system-wide trends that affect the most people.`
        : null}
    </p>
  ),
  visualization: SystemWideSummaryVisualization, // data, isLoading are passed to this as props
  additionalText: <p />,
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

export default SystemWideSummaryMeta;
