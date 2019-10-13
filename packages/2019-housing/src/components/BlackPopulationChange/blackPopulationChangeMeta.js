import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import BlackPopulationChangeVisualization from "./BlackPopulationChangeVisualization";

const BlackPopulationChangeMeta = (/* data */) => ({
  title: "Portland’s Black Population Displaced throughout Region",
  slug: "black-population-change",
  introText: (
    <p>
      Portland has historically had few neighborhoods with proportionally large
      shares of Black residents, and this trend has grown more pronounced over
      time. The small handful of census tracts with significant proportions of
      Black residents nearly vanished in the past 30 years.
    </p>
  ),
  visualization: BlackPopulationChangeVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <p>
      {`"Portland residents face a complex and multi-faceted problem. Housing costs
      are increasing, and new housing production has not kept pace with
      population growth or provided housing for families across different income
      levels. The cost of housing alone does not explain some of the challenges
      that many residents have experienced. The character of some neighborhoods
      is changing rapidly, and some communities are seeing eroding social
      cohesion as they are pushed out from increasing rents… [T]he process of
      gentrification and involuntary displacement... happens when an
      under-valued neighborhood becomes desirable, which leads to increasing
      property values and demographic change. These changes force existing
      residents and businesses out of a neighborhood because they cannot afford
      to compete in the changing market or [because of] the inability for the
      neighborhood to meet their cultural needs… Gentrification and displacement
      disproportionately impact communities of color... The list of tools and
      practices that have been used to inhibit the prosperity of people of color
      is lengthy: Jim Crow laws, racialized mortgage-lending practices,
      restrictive covenants and deeds, public works projects condemning entire
      Black neighborhoods, and zoning rules that reinforce segregation are only
      a few to be named."`}
      <p>
        Quote from:{" "}
        <a href="https://www.portlandoregon.gov/bps/article/700970">
          2018 GENTRIFICATION AND DISPLACEMENT NEIGHBORHOOD TYPOLOGY ASSESSMENT
          KEY FINDINGS AND METHODOLOGY REPORT OCTOBER, 2018
        </a>
      </p>
    </p>
  ),
  shareText:
    "Gentrification and displacement disproportionately impact communities of color. The small handful of census tracts with significant proportions of Black residents nearly vanished in the past 30 years.",
  tags: [
    "Housing",
    "Race",
    "Map",
    "Portland",
    "Oregon",
    "Gentrification",
    "displacement",
    "race",
    "Black",
    "demographic change"
  ],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>
          This card’s population and demographic data is taken from the Harvard
          Joint Center for Housing Studies Neighborhood Change Database.
        </p>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p>ADD DETAILS HERE</p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata:
    "Harvard Joint Center for Housing Studies Neighborhood Change Database", // TODO, not sure which meta
  resources: [
    {
      heading: "Organizations",
      items: [
        {
          link: "https://www.portlandoregon.gov/bps/article/700970",
          description:
            "2018 Gentrification and Displacement Neighborhood Typology Assessment: Key Findings and Methodology Report"
        },
        {
          link: "https://www.jchs.harvard.edu/state-nations-housing-2019",
          description:
            "2019 State of the Nation’s Housing Report from Harvard’s Joint Center for Housing Studies"
        },
        {
          link:
            "http://kingneighborhood.org/wp-content/uploads/2015/03/BLEEDING-ALBINA_-A-HISTORY-OF-COMMUNITY-DISINVESTMENT-1940%E2%80%932000.pdf",
          description:
            "Bleeding Albina: A History of Community Disinvestment, 1940-2000"
        },
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
