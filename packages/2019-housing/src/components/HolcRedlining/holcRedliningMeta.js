import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import HolcRedliningVisualization from "./HolcRedliningVisualization";

const HolcRedliningMeta = (/* data */) => ({
  title:
    "Redlining: Institutional Housing Discrimination against People of Color",
  slug: "holc-redlining",
  introText: (
    <p>
      Redlining was a mortgage lending practice beginning in the 1930s whereby
      banks would not secure home loans in areas with higher concentrations of
      people of color. The outcome was that people of color were severely
      hindered in accessing homeownership opportunities.
    </p>
  ),
  visualization: HolcRedliningVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <section>
      <p>
        There have historically been institutional barriers to people of color
        trying to secure housing. One clear example of this with readily
        available data is the government-sponsored Home Owners’ Loan
        Corporation’s (HOLC) grades of neighborhoods. These grades were used to
        establish a lending risk framework.
      </p>
      <p>
        Redlining got its name because literal red lines were drawn on a map,
        which corresponded to neighborhoods with a grade of “hazardous.” The
        principal reason a “hazardous” grade was because of higher
        concentrations of immigrants and people of color. Banks were forbidden
        to lend to homes in these areas. This led to segregation of communities
        and neighborhoods in Portland and throughout the country. And moreover,
        this institutionalized lending practice created an immense barrier to
        accessing homeownership for people of color.
      </p>
      <p>
        We’ve connected the Portland HOLC data from 1938 to our Sandbox to make
        it easy to compare the historical boundaries and grades to the current
        landscape of how the city has grown.
      </p>
    </section>
  ),
  shareText:
    "The principal reason a “hazardous” grade was because of higher concentrations of immigrants and people of color.",
  tags: ["Housing", "Portland", "Oregon", "Map", "Race", "Redlining", "HOLC"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>NA</p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: "Mapping Inequality: Redlining in New Deal America",
  metadataQA: "mapping_inequality_redlining_in_new_deal_america",
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
  authors: "demo"
});

export default HolcRedliningMeta;
