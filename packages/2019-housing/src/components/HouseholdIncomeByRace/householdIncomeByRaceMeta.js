import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import HouseholdIncomeByRaceVisualization from "./HouseholdIncomeByRaceVisualization";

const HouseholdIncomeByRaceMeta = (/* data */) => ({
  title: "Households of Color Earn Substantially Less than White Households",
  slug: "household-income-by-race",
  introText: (
    <p>
      Household income is often reported in aggregate, but it can also be
      reported by race. We look at median household income by race since 1990 to
      see the disparities and how they have changed in the Portland region.
    </p>
  ),
  visualization: HouseholdIncomeByRaceVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <section>
      <p>
        Incomes for White households and Asian households are substantially
        higher than for Black, Native American and Latino households. The gap
        between these two sets of racial categories has increased since 1990,
        where White and Asian household earnings have ticked up while Black and
        Native American household earnings have stagnated or decreased. In 2017,
        White households earned about $70,000 at the median, while Black
        households earned about $37,000.
      </p>
      <p>
        This structural problem poses significant barriers to accessing
        homeownership for communities of color. Not only does it take a longer
        time to save for a down payment on a home loan (if saving money is even
        feasible), but it is harder for these households to afford the mortgage
        for the average priced home. As cheaper home purchasing options dry up,
        there are few places left where communities of color are able to afford
        purchasing a home.
      </p>
    </section>
  ),
  shareText: "Black households earn half of White households in Portland",
  tags: ["Housing", "Race", "Chart", "Portland", "Oregon"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <h2>Household income</h2>
        <p>
          Household income reports the total money income of all members 15 or
          older in a household. The ACS and Census forms ask for income reported
          in the previous year, so 1990 is actually 1989 income data, for
          example. The race of the household is determined by the race of the
          head of household, or “person number 1” on the Census or ACS form.
          Here, we use the race categories as determined by the Census Bureau
          (see link). Race categories for income are “inclusive,” meaning, for
          example, if the head of household identifies as White, Black and
          Latino, their household income would be included in three separate
          calculations for determining household income by race.
        </p>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <h2>Race</h2>
        <p>
          Starting in 2000, the Asian/Pacific Islander category was split into
          two race categories: Asian or Asian-American; and Native Hawaiian or
          Pacific Islander. Since this visualization looks back to 1990 when
          these race categories were combined, we continued the aggregation to
          facilitate better comparability over time. In reality, Native Hawaiian
          and Pacific Islander household income is considerably lower than Asian
          or Asian-American household income. Also starting in 2000, household
          income by ethnicity (Hispanic or Latino) became available.
        </p>
        <p>
          More information on how the Census defines concepts like “household”
          or “income” can be explored through their{" "}
          <a href="https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2017_ACSSubjectDefinitions.pdf?#">
            Subject Definitions
          </a>
          document.
        </p>
        <h2>Estimating the median</h2>
        <p>
          We estimated the median by examining distribution data of household
          income. Since the way the Portland MSA is defined has changed over
          time, we could not use the Census-reported median household income for
          the “metropolitan statistical area” geography. Instead, we aggregated
          household income by race for all seven counties of the region for each
          Census year or ACS period. Next we estimated the median using a Pareto
          median interpolation method based on household counts at various
          income categories.
        </p>
        <h2>Adjusting for inflation</h2>
        <p>
          Finally, we adjusted for inflation using the Consumer Price Index
          research series (CPI-U-RS-All). To find the adjustment coefficient for
          each year, we took the CPI for the target year (2018) and divided it
          by each CPI of the reference year (1990, 2000, 2010 and 2017). These
          adjustment coefficients were then multiplied by the income dollar
          amounts. For example, 2018 CPI was 369.8 and 1990 CPI was 197.9, so
          the adjustment coefficient was 369.8 / 197.9 = 1.869. This coefficient
          was applied to the unadjusted median household income values for 1990
          to find the final adjusted value.
        </p>
        <h2>Code</h2>
        <p>
          https://github.com/hackoregon/2019-housing-data-science/blob/master/rscripts/get_historic_income_by_race_1990t2017.R
        </p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: null,
  metadataQA: "median_household_income_by_race_1990_to_2017",
  resources: [
    {
      heading: "Organizations",
      items: [
        {
          link:
            "https://www.pewsocialtrends.org/2018/07/12/appendix-a-income-distributions-of-whites-blacks-hispanics-and-asians-in-the-u-s-1970-and-2016/",
          description: "Pew Research Center - Income distributions by race"
        },
        {
          link:
            "https://usa.ipums.org/usa-action/variables/HHINCOME#description_section",
          description: "Succinct definition of household income"
        },
        {
          link:
            "https://web.archive.org/web/20060825221627/http://www.sipp.census.gov/sipp/sourceac/S%26A01_20060323_Long%28S%26A-3%29.pdf",
          description:
            "Parento median interpolation method which is used by the census bureau for economical data"
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

export default HouseholdIncomeByRaceMeta;
