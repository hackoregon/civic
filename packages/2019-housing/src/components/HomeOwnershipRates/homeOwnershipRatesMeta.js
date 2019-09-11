import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import HomeOwnershipRatesVisualization from "./HomeOwnershipRatesVisualization";

const HomeOwnershipRatesMeta = (/* data */) => ({
  title:
    "Card #5: Population Demographics and Home Ownership Rates  (Over Time?)",
  slug: "home-ownership-rates",
  introText: (
    <p>
      There is a long & storied history of how residents of color have been
      disadvantaged or denied access to homeownership. The realities of this are
      clear - the areas of Portland with larger proportions black residents have
      markedly lower rates of homeownership.
    </p>
  ),
  visualization: HomeOwnershipRatesVisualization, // data, isLoading are passed to this as props
  additionalText: <p>ADDITIONAL TEXT: TBD</p>,
  shareText: "TODO: Add share text!",
  tags: ["Housing", "Race", "Portland", "Oregon", "Chart"],
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
  metadata: null, // TODO
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

export default HomeOwnershipRatesMeta;
