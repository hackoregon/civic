import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import HousingDisplacementVisualization from "./HousingDisplacementVisualization";

const HousingDisplacementMeta = (/* data */) => ({
  title:
    "Historically Black Portland Neighborhoods Lost 12,000 Black Residents Since 1990",
  slug: "housing-displacement",
  introText: (
    <p>
      As many of Portland’s neighborhoods have gentrified, neighborhoods that
      were historically Black have seen decreases in Black populations. The
      Black population in the Portland region has proportionally decreased over
      time, demonstrating that the people displaced in these neighborhoods have
      not stayed within the Portland MSA.
    </p>
  ),
  visualization: HousingDisplacementVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <p>
      Using Census data from Harvard’s Neighborhood Change Database (NCDB) this
      analysis shows the demographic trends in population change across the
      Portland region as a whole (top left) and in historically Black
      neighborhoods (bottom left). The neighborhoods considered “historically
      Black” can be seen on the map (on the bottom right). The tracts included
      in that definition can be modified using the slider above the map - which
      change the threshold for inclusion based on the percent of the tract
      population that was Black in the 1990 Census.
    </p>
  ),
  shareText:
    "Historically Black Portland Neighborhoods Lost 12,000 Black Residents Since 1990",
  tags: ["Housing", "Race", "Portland", "Oregon", "Chart"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>
          This analysis aggregates tract-level population data by race from NCDB
          across the 4-county Portland region (Multnomah, Washington, Clackamas
          and Clark, WA); and across a subset of tracts in this case defined by
          those have 1990 black populations shares above an adjustable threshold
          - ranging from 10% to 60%.
        </p>
      </Collapsable.Section>
    </Collapsable>
  ),
  context: <div>Context here</div>,
  metadata: null,
  metadataQA: null,
  resources: [
    {
      heading: "Organizations",
      items: [
        {
          link:
            "http://kingneighborhood.org/wp-content/uploads/2015/03/BLEEDING-ALBINA_-A-HISTORY-OF-COMMUNITY-DISINVESTMENT-1940%E2%80%932000.pdf",
          description:
            "Gibson, Karen. (2007). Bleeding Albina: A History of Community Disinvestment, 1940-2000."
        },
        {
          link: "http://racebox.org/",
          description:
            "RaceBox - see how race and ethnicity has been asked on the Decennial census since 1790"
        },
        {
          link:
            "https://www.pewsocialtrends.org/interactives/multiracial-timeline/",
          description:
            "Pew Research Center - see a historical timeline of race categories defined by the census since 1790"
        },
        {
          link: "https://www.census.gov/topics/population/race/about.html",
          description: "Official Census race category definitions"
        },
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

export default HousingDisplacementMeta;
