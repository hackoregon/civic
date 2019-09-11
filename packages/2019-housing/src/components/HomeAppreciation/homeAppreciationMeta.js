import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import HomeAppreciationVisualization from "./HomeAppreciationVisualization";

const HomeAppreciationMeta = (/* data */) => ({
  title:
    "Racial Gap in Homeownership Rates Means Lost Wealth for Portlanders of Color",
  slug: "home-appreciation",
  introText:
    "Homeownership plays a key role in economic prosperity. But not all households are on a path to prosperity, particularly due to the gap in homeownership rates for different race categories.",
  visualization: HomeAppreciationVisualization, // data, isLoading are passed to this as props
  additionalText: (
    <section>
      <p>
        This card explores the racial gap in access to homeownership. It also
        looks at how much homes have appreciated in value across the city.
      </p>
      <h2>
        Homeownership is a key source of economic prosperity that households of
        color disproportionately lack
      </h2>
      <p>
        Homeownership has been a primary wealth generation mechanism for
        middle-class families in the United States since World War II. But for
        the 68,000 households of color in the Portland region who rent their
        home, accessing homeownership requires overcoming institutional barriers
        and historical housing discrimination. As an outcome of these barriers,
        Black households own their home at about half the rate of White
        households in the city of Portland—a rate that has been declining since
        2000.
      </p>
      <h2>Racial wealth gap widens as home values appreciate</h2>
      <p>
        If homeownership is a wealth-generation mechanism, then wealth increases
        as home values appreciate. Without parity in homeownership rates for
        households of color, the racial wealth gap widens as home values
        appreciate. This means White households are becoming wealthier much
        faster than household of color.
      </p>
      <p>
        Using Metro’s taxlot data, we have an ability to quantify per-house
        appreciate in much more detail than traditional methods, which focus on
        neighborhood averages and ignore additions/major remodels. Our analysis
        relies on same-properties sales over time without substantial change in
        sq footage and without multiple sales. This is visualized over time, and
        then spatially for median per house appreciation across Portland from
        ~1990 through 2017.
      </p>
    </section>
  ),
  shareText:
    "For the 68,000 households of color in the Portland region who rent their home, accessing homeownership requires overcoming institutional barriers and historical housing discrimination.",
  tags: [
    "Housing",
    "Portland",
    "Oregon",
    "Map",
    "Homeownership",
    "race",
    "wealth",
    "disparities",
    "home values",
    "appreciation"
  ],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <section>
          <h2>Portland 1990 homeownership rates by race</h2>
          <p>
            Historic data (1990, 2000, 2010) on homeownership rates by race came
            from the National Historic Geographic Information Systems (NHGIS)
            platform. More recent data came from the 2013-2017 American
            Community Survey (ACS) 5-year estimates. Together, these data
            sources include the number of households in race categories and
            their housing tenure (i.e., rent vs own) at the census tract level.
            Civic volunteers summarized and recoded the data and then uploaded
            the summary table to the database (`race_by_tenure_1990t2017`).
          </p>
          <ul>
            <li>
              https://github.com/hackoregon/2019-housing-data-science/blob/master/rscripts/race_tenure_cleanup_20190819v1955.R
            </li>
            <li>
              https://github.com/hackoregon/2019-housing-data-science/blob/master/rscripts/load_race_by_tenure_1990t2017.R
            </li>
          </ul>
          <p>
            Civic volunteers summarized the tract-level table to find the
            statistics just for Portland after filtering for tracts that are
            primarily in Portland. This summary lists the total households by
            race as well as the ownership share of each total.
          </p>
          <ul>
            <li>
              https://github.com/hackoregon/2019-housing-data-science/blob/master/rscripts/tract_home_ownership_rates_by_race_1990.R
            </li>
          </ul>
        </section>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <section>
          <h2>Taxlot data cleaning</h2>
          <p>
            Before calculating same-property appreciation, historical taxlot
            snapshots from Metro’s Regional Land Information System (RLIS) data
            had to be cleaned and normalized over time. This script takes the
            raw taxlot data from Multnomah County and transforms it in various
            ways to make it more useful for longitudinal analysis. Specifically
            we took these steps:
          </p>
          <ol>
            <li>
              Appended Census Block Federal Information Processing Standards
              (FIPS) codes to each taxlot record.
            </li>
            <li>Standardized the projection</li>
            <li>
              Standardized the taxlot ID format, which changed multiple times
              between 1997 and 2017
            </li>
            <li>Pulled out home sales into own set of tables</li>
          </ol>
          <p>
            The specific home sales table that our per-house same-property
            appreciation estimates rely on is a summary table
            (`taxlots.home_sales_prev_sale`). For each new home sale recorded in
            the city of Portland from 1997 through 2017, the table lists key
            information for the new sale and the most recent previous sale of
            the same house. We limit to the city of Portland because the early
            years of the data only have Portland taxlots in the dataset.
          </p>
          <h2>Per-house, same-property, inflation-adjusted appreciation</h2>
          <p>
            Our analysis looks at property appreciation rates in Portland since
            around 1990. We wanted to avoid including in our analysis homes that
            had major additions. To achieve this, we filtered our data to houses
            where the building area did not change more than 10% between sales.
            A change greater than 10% might imply an addition, major renovation,
            or rebuild.
          </p>
          <p>
            To calculate same-property appreciation between any two points in
            time, we look at houses that were sold at the first point in time
            and houses sold at the second point in time and subtract the
            original sale price (in 2018 dollars) from the subsequent sale price
            (in 2018 dollars) of each house. For example, say a home sold in
            1989 for $50,000, and again it sold in 2001 for $180,000. The
            appreciation value between these time periods is thus $180,000 -
            $50,000 = $130,000. We then take the median and interquartile range
            (25th and 75th percentiles) of appreciation values for the houses in
            the dataset for a given year.
          </p>
          <p>
            Since we are looking at appreciation from about 1990 through the
            present, we start with homes sold between 1987 and 1993 (both to
            increase sample size and to avoid short-term increases or dips in
            housing prices), and then look at the per-house, same-property
            median and interquartile appreciation for houses next sold each year
            from 1997-2017.
          </p>
          <p>
            For each year on the plot we included only houses that were sold in
            that year and that had a most recent previous sale date between 1987
            and 1993. We chose not to include houses that had been sold in
            between to filter out appreciation associated with house flipping.
            This decision is aimed at calculate a conservative same-property
            appreciation estimate avoiding at least some of the
            appreciation-boosting activities that often skew same-property
            appreciation estimates.
          </p>
          <p>
            The script that generates this analysis{" "}
            <a href="https://github.com/hackoregon/2019-housing-data-science/blob/master/rscripts/home_appreciation_cards.R">
              is here.
            </a>
          </p>
          <h2>Kriging</h2>
          <p>
            To look at the spatial variation in appreciation between ~1990 and
            ~2017, we take the houses sold between 1987 and 1993 and next sold
            2016-2017 in Portland. These homes must meet the same criteria as
            those above (i.e., no intervening sales between initial sale and
            final sale and building square footage changing no more than 10%
            between sales). With the coordinates of these houses and the
            appreciation amount for each sale we use a modeling approach called
            Kriging that produces an estimate of both same-house appreciation
            values and a variance at each point on the grid. The relevant code
            can be found in{" "}
            <a href="https://github.com/hackoregon/2019-housing-data-science/blob/master/rscripts/home_appreciation_kriging.R">
              this script
            </a>
            .
          </p>
        </section>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: (
    <ul>
      <li>Metro RLIS taxlot dataset</li>
      <li>National Historical Geographic Information Systems (NHGIS)</li>
    </ul>
  ),
  metadataQA: "hmda",
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
          link: "https://cran.r-project.org/web/packages/geoR/geoR.pdf",
          description: "GeoR library R manual"
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
  authors: "demo"
});

export default HomeAppreciationMeta;
