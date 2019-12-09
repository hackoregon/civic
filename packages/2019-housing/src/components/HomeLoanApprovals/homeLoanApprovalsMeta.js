import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import HomeLoanApprovalsVisualization from "./HomeLoanApprovalsVisualization";

const HomeLoanApprovalsMeta = (/* data */) => ({
  title: "Geography and Racial Demographics of Home Loan Approvals",
  slug: "home-loan-approvals",
  introText: (
    <p>
      Portland is among the whitest major cities in the nation. But communities
      of color live all over the region, and some areas have higher
      homeownership rates for people of color. Using data on home loans, we
      explore the geography of where people of color are securing loans and
      consider the implications it has for a changing Portland.
    </p>
  ),
  visualization: HomeLoanApprovalsVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <section>
      <p>
        Homeownership is a major step toward economic security. We’ve documented
        in other story cards how communities of color have faced challenges to
        accessing homeownership due to institutional racism in housing,
        education and employment. These barriers have created racial disparities
        in homeownership rates and levels of household income. Despite these
        barriers, nearly 100,000 mortgages went to people of color in the
        Portland region between 2013 and 2017 (about 14% of all mortgages).
      </p>
      <p>
        This card uses data from the Home Mortgage Disclosure Act (HMDA), which
        includes information on almost every mortgage and refinancing
        application dating back decades. Each record in the HMDA dataset
        contains demographic information on the applicant; information about the
        loan; and geographic information on the census tract where the home was
        located.
      </p>
      <p>
        The maps here allow us to explore the changing racial demographics and
        geography of where home loans are being issued by comparing the outcome
        to the existing population characteristics of each census tract. The
        maps show location quotients (LQ). A location quotient is simply the
        share of loans to each race divided by the share of households or
        homeowners of that race in each census tract.
      </p>
      <p>
        The first map looks at the proportion of loans in each tract given to a
        particular racial or ethnic group, compared to the proportion of the
        tract’s households that is made up from that group. For example, the
        share of loans that went to Black households in Tract 41.01 (St. Johns)
        was 1.8% (about 8 loans). But the share of households that are Black in
        St. Johns is 8.9%. The LQ for this tract is thus 1.8% / 8.9% = 0.22. We
        interpret this as <strong>not represented</strong> in home mortgage
        activity.
      </p>
      <p>
        Orange tracts are those where the selected race is under-represented in
        home loans—in other words, where the proportion of loans given to that
        group was lower than that group’s share of the tract’s population. White
        means the proportions of loans given to that group was roughly similar
        to the groups population share. Green means the proportion of loans
        given to that group was higher than the group’s population share.
      </p>
      <p>
        In most of Portland, many communities of color are still
        under-represented in terms new home loans they are acquiring. But in
        some neighborhoods, especially historically whiter areas further from
        the city center, that isn’t necessarily the case.
      </p>
      <p>
        This second map is a slightly different comparison. Rather than
        comparing proportions of loans given to population baselines, it
        compares proportions of loans to proportions of existing home-owners.
        This shows where homeownership of specific demographics is increasing or
        decreasing as compared to historic levels.
      </p>
    </section>
  ),
  shareText: null,
  tags: ["Housing", "Portland", "Oregon", "Mortgage", "Maps", "Loans", "Race"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>
          This analysis relied on the Home Mortgage Disclosure Act (HMDA) data
          for 2013 to 2017. This dataset is maintained by the Consumer Finance
          Protection Bureau (CFPB). We downloaded each year of data from CFPB
          for both Oregon and Washington and filtered to those within the
          7-county metro area.
        </p>
        <p>
          Next, we filtered for successful home loans to get a working universe
          of loans. This universe of loans excludes loan denials, refinancing,
          loans that went to applicants who did not intend to live in the home
          (not owner-occupied), and other qualifying factors.
        </p>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p>
          Then we grouped and summarized by tract and race, after recoding race
          variables to be more inclusive. This means that a person who
          identifies as Hispanic and White and Black would be counted three
          times in the dataset—however, since we are looking at shares and not
          totals, this is not an issue for this purpose.
        </p>
        <p>
          To compare the loan demographics to existing demographics, we
          downloaded ACS 2013-2017 5-year estimates for homeowners by race using
          the tidycensus package. We then joined the HMDA summarized data by
          race to the ACS homeownership data by race. Next we calculated
          location quotients (LQ). The formula for the two maps are below:
        </p>
        <p>
          <strong>TBD: Add map equation images</strong>
        </p>
        <p>
          Lastly, we categorized the LQs into five breakpoints and assigned an
          interpretation of those categories. For example, a tract with a LQ of
          less than 0.5 was considered “not representative” of the typical
          racial makeup we would have expected to see given existing racial
          composition of residents.
        </p>
        <p>
          GitHub scripts:
          <ul>
            <li>
              https://github.com/hackoregon/2019-housing-data-science/blob/master/rscripts/SC2_homeownership_by_race.R
            </li>
            <li>
              https://github.com/hackoregon/2019-housing-data-science/blob/master/rscripts/race_tenure_cleanup_20190819v1955.R
            </li>
          </ul>
        </p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: "Home Mortgage Disclosure Act (HMDA)",
  metadataQA: "hmda",
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

export default HomeLoanApprovalsMeta;
