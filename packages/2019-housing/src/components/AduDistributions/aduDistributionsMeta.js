import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import AduDistributionsVisualization from "./AduDistributionsVisualization";

const AduDistributionsMeta = (/* data */) => ({
  title: "Concentration of ADUs in Portland’s Neighborhoods",
  slug: "adu-distributions",
  introText:
    "Where are ADUs being built, and how is that reflected in area incomes?",
  visualization: AduDistributionsVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <section>
      <p>
        ADU construction is an example of greater housing diversity, allowing
        homeowners to build or add on to their homes and create smaller, more
        affordable units. Portland is a national leader in ADU construction,
        with the{" "}
        <a href="https://www.jchs.harvard.edu/state-nations-housing-2019">
          2019 State of the Nation’s Housing Report from Harvard’s Joint Center
          for Housing Studies
        </a>{" "}
        calling Portland a frontrunner in these efforts, issuing permits for
        over 3,200 ADUs in 2008–2018.
      </p>
      <p>
        However, access to capital needed to build these structures is often
        referenced as as the biggest obstacle to construction currently. The{" "}
        <a href="https://www.oregon.gov/deq/FilterDocs/ADU-surveyinterpret.pdf">
          2013 Oregon DEQ survey
        </a>{" "}
        of ADU owners “suggests the biggest barrier is financial” for property
        owners who have constructed ADUs. That survey reports the “majority of
        respondents having paid in cash or with a home equity line of credit.”
        While the greater number of small square-footage units in the city does
        create more affordable options, those property owners who already have
        considerable capital have greater access to the long-term gains
        resulting from development.
      </p>
    </section>
  ),
  shareText:
    "Portland is a national leader in ADU construction, with the 2019 State of the Nation’s Housing Report from Harvard’s Joint Center for Housing Studies calling Portland a frontrunner in these efforts, issuing permits for over 3,200 ADUs in 2008–2018.",
  tags: ["Housing", "Portland", "Oregon", "Chart", "Map", "Permits", "ADUs"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>
          This card’s heat map uses permit data taken directly from the City of
          Portland’s PortlandMaps. All publicly available permits were used.
        </p>
        <p>
          This card’s scatter plot uses median household income, by census
          tract, from the Harvard Joint Center for Housing Studies Neighborhood
          Change Database. The City of Portland’s permits were aggregated up to
          a census tract level for comparison.
        </p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: (
    <ul>
      <li>
        City of Portland Residential Building Permits Harvard Joint Center for
      </li>
      <li>Housing Studies Neighborhood Change Database</li>
    </ul>
  ), // no metadata
  resources: [
    {
      heading: "Organizations",
      items: [
        {
          link:
            "https://www.portlandmaps.com/advanced/?action=permits#advanced",
          description: "PortlandMaps Permit Search Tool"
        },
        {
          link: "https://www.oregon.gov/deq/FilterDocs/ADU-surveyinterpret.pdf",
          description: "2013 Oregon DEQ survey"
        },
        {
          link: "https://www.jchs.harvard.edu/state-nations-housing-2019",
          description:
            "2019 State of the Nation’s Housing Report from Harvard’s Joint Center for Housing Studies"
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
  authors: "demo"
});

export default AduDistributionsMeta;
