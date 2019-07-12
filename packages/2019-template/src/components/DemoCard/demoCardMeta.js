import React, { Fragment } from "react";
import { Collapsable } from "@hackoregon/component-library";

import DemoCardVisualization from "./DemoCardVisualization";

const demoCardMeta = (/* data */) => ({
  title: "Transit Ridership, Gentrification, and Displacement",
  slug: "demo-card",
  introText: (
    <p>
      Gentrification and displacement drive changes in transit ridership.
      Understanding these changes at the different stages of the gentrification
      process can help inform investments in equitable mobility.
    </p>
  ),
  visualization: DemoCardVisualization,
  additionalText: (
    <Fragment>
      <p>
        TriMet, the transit agency serving the Portland, OR, metro area, has
        seen recent declines in bus ridership, similar to other agencies across
        the country. TriMet has{" "}
        <a href="http://transitcenter.org/2017/11/14/in-portland-economic-displacement-may-be-a-driver-of-transit-ridership-loss/">
          cited
        </a>{" "}
        economic displacement as a main driver of ridership loss. Portland is
        one of the most{" "}
        <a href="http://www.oregonlive.com/hg/index.ssf/2017/02/portland_gentrification_4_real.html">
          rapidly gentrifying cities
        </a>{" "}
        in the US.
      </p>
      <p>
        Gentrification and displacement disproportionately impact communities of
        color. The list of tools and practices that have been used to inhibit
        the prosperity of people of color is lengthy: Jim Crow laws, racialized
        mortgage-lending practices, restrictive covenants and deeds, public
        works projects condemning entire Black neighborhoods, and zoning rules
        that reinforce segregation are only a few to be named.
      </p>
    </Fragment>
  ),
  shareText:
    "TriMet has cited economic displacement as a main driver of ridership loss",
  tags: [
    "Transportation",
    "Housing",
    "Gentrification",
    "Transit",
    "Portland",
    "Demo"
  ],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>
          <em>
            Note: This analysis is for demonstration purposes only and should
            not be used to inform decision-making.
          </em>
        </p>
        <h3>Methodology Summary</h3>
        <p>
          This analysis uses quarterly ridership statistics produced by TriMet
          to calculate an average daily ridership for each bus line. Census
          tracts were divided into different gentrification categories based on
          a gentrification typology described below. Bus lines were categorized
          based on the gentrification typology of the census tracts that they
          pass through.
        </p>
        <h3>Gentrification and Displacement Methodology</h3>
        <p>
          The gentrification typologies of this analysis were developed by Dr.
          Lisa Bates (2013), with some modifications. If bus lines passed
          through at least 3 census tracts in mid-stage or late-stage
          gentrification, they were included.
        </p>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <h4>EARLY-STAGE GENTRIFICATION</h4>
        <p>
          These neighborhoods are not yet gentrifying or are showing early signs
          that they could be gentrifying.
        </p>
        <p>
          <em>Susceptible: </em>These neighborhoods have higher shares of
          vulnerable populations but have not yet experienced demographic
          changes. Their housing market is low or moderate, but they are
          adjacent to tracts whose values are already high or are increasing
          rapidly.
        </p>
        <p>
          <em>Early: Type 1: </em>These neighborhoods have higher shares of
          vulnerable populations but have not yet experienced demographic
          changes. Their housing market is still low or moderate but has
          experienced high appreciation since 2008 (or 2012 for rents).
        </p>
        <p>
          <em>Early: Type 2: </em>These neighborhoods have higher shares of
          vulnerable populations but have experienced demographic changes
          whereby they are losing vulnerable populations proportionally. Their
          housing market is low or moderate, but they are adjacent to tracts
          whose values are already high or are increasing rapidly.
        </p>
        <h4>MID-STAGE GENTRIFICATION</h4>
        <p>
          <em>Dynamic: </em>These neighborhoods are currently undergoing
          gentrification. They have higher shares of vulnerable populations but
          have experienced demographic changes by losing vulnerable populations
          proportionally. Their housing market is still low or moderate but has
          experienced high appreciation since 2008 (or 2012 for rents).
        </p>
        <h4>LATE-STAGE GENTRIFICATION</h4>
        <p>
          These neighborhoods have mostly gentrified but vulnerable populations
          may still reside in there. The housing market has completely shifted
          from low or moderate to high value.
        </p>
        <p>
          <em>Late: Type 1: </em>These neighborhoods have higher shares of
          vulnerable populations but have experienced demographic changes by
          losing vulnerable populations proportionally. Their housing market
          used to be low or moderate in 2000 but has appreciated rapidly since,
          and now values are high.
        </p>
        <p>
          <em>Late: Type 2: </em>A new typology in 2018, these neighborhoods no
          longer have high shares of vulnerable populations like they used to in
          2000 or in 2006-10. They have experienced demographic changes by
          losing their once-high share of vulnerable populations. Their housing
          market is still low or moderate but has experienced high appreciation
          since 2008 (or 2012 for rents).
        </p>
        <p>
          <em>Continued Loss: </em>These neighborhoods no longer have high
          shares of vulnerable populations like they used to in 2000 or in
          2006-10. The share of white people is growing and/or the share of
          people with a four-year degree is growing. Their housing market used
          to be low or moderate in 2000 but has appreciated rapidly since, and
          now values are high.
        </p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: (
    <p>
      <em>
        Note: This dataset documentation is for demonstration purposes only and
        is not peer-reviewed.
      </em>
    </p>
  ),
  metadataQA: [
    { section: "Dataset Name and History" },
    {
      question: "What is the full dataset name?",
      answer: "TOAD (Transit Operations Analytics Data)"
    },
    {
      question: "What was the original purpose of this dataset?",
      answer: "Tracking transit ridership and operations for reporting purposes"
    },
    {
      question:
        "How was this dataset originally used? Be specific, and address impact",
      answer:
        "TriMet produces ridership statistics at regular, 3-month intervals with this data"
    },
    {
      question: "What funding is dependent on the results of this dataset?",
      answer: "TriMet's operating budget"
    },
    {
      question: "What analysis was initially performed on this dataset?",
      answer: "Possibly one-off analyses, but data is mostly raw"
    },
    {
      question:
        "What organization funded the creation or maintenance of this dataset?",
      answer: "TriMet/Metro"
    },
    {
      question: "What type of legal entity is the funding organization?",
      answer: "Government Agency"
    },
    {
      question:
        "How is the funding organization funded? If a corporation, what is their business model?",
      answer: "State/local/regional budget allocations"
    },
    {
      question:
        "Do any other organizations fund the creation or maintenance of this dataset?",
      answer: "No"
    },
    {
      question:
        "What organization funded the creation or maintenance of this dataset?",
      answer: ""
    },
    {
      question: "What type of legal entity is the funding organization?",
      answer: ""
    },
    {
      question:
        "How is the funding organization funded? If a corporation, what is their business model?",
      answer: ""
    },
    {
      question:
        "Do any other organizations fund the creation or maintenance of this dataset?",
      answer: ""
    },
    {
      question:
        "What organization funded the creation or maintenance of this dataset?",
      answer: ""
    },
    {
      question: "What type of legal entity is the funding organization?",
      answer: ""
    },
    {
      question:
        "How is the funding organization funded? If a corporation, what is their business model?",
      answer: ""
    },
    {
      section: "Dataset Use"
    },
    {
      question: "What is this dataset primarily used for?",
      answer: "Producing ridership statistics at 3-month intervals"
    },
    {
      question: "What shouldn't this dataset be used for?",
      answer: "Undermining transit agencies"
    },
    {
      question: "Is this dataset used for any additional purposes?",
      answer: "Yes"
    },
    {
      question: "What is this dataset additionally used for?",
      answer:
        "Occasional one-off analyses, regarding delays & other service-impacting events"
    },
    {
      question: "Is this dataset used for any additional purposes?",
      answer: "Yes"
    },
    {
      question: "What is this dataset additionally used for?",
      answer: "Supplementing GTFS real-time data feed"
    },
    { section: "External Data Sources" },
    {
      question: "Does this data set rely on other data sources?",
      answer: "No"
    },
    { question: "What is this dataset additionally used for?", answer: "" },
    {
      question: "What external sources does this dataset rely on?",
      answer: ""
    },
    {
      question: "How often are the external data sources updated?",
      answer: ""
    },
    {
      question:
        "How often is this dataset updated to reflect updates to the external data sources?",
      answer: ""
    },
    { question: "What organization holds this dataset?", answer: "" },
    { question: "Does this data set rely on other data sources?", answer: "" },
    { question: "What is this dataset additionally used for?", answer: "" },
    {
      question: "What external sources does this dataset rely on?",
      answer: ""
    },
    {
      question: "How often are the external data sources updated?",
      answer: ""
    },
    {
      question:
        "How often is this dataset updated to reflect updates to the external data sources?",
      answer: ""
    },
    { question: "What organization holds this dataset?", answer: "" },
    { question: "Does this data set rely on other data sources?", answer: "" },
    { question: "What is this dataset additionally used for?", answer: "" },
    {
      question: "What external sources does this dataset rely on?",
      answer: ""
    },
    {
      question: "How often are the external data sources updated?",
      answer: ""
    },
    {
      question:
        "How often is this dataset updated to reflect updates to the external data sources?",
      answer: ""
    },
    { question: "What organization holds this dataset?", answer: "" },
    { section: "Data Collection and Preprocessing - Before CIVIC" },
    {
      question:
        "Has the data collection and preprocessing been documented by the creators of the dataset?",
      answer: "Yes"
    },
    {
      question: "Link to methods documentation from dataset creator",
      answer:
        "https://docs.google.com/document/d/12znFFgAF4bcUm79rnDyOKn91xyuv4ub0xw9U-L2SxP8"
    },
    {
      question: "How was the data collected?",
      answer: "Streamed from sensors on vehicles"
    },
    {
      question:
        "If the data was captured automatically, who processed and analyzed the data?",
      answer: "Miles J. Crumley"
    },
    {
      question: "If people collected the data, who collected the data?",
      answer: "N/A"
    },
    { question: "How were those individuals compensated?", answer: "" },
    {
      question:
        "Is there collected information missing from the dataset and why? Was anything explicitly excluded?",
      answer: "Unknown"
    },
    {
      question:
        "What important information wasn't collected? Is it representative?",
      answer: "Unknown"
    },
    { question: "What data validation has been performed?", answer: "" },
    { question: "Who performed the data validation?", answer: "" },
    {
      question: "Is the dataset a sample of instances from a larger set?",
      answer: "Yes"
    },
    { question: "What was the sampling methodology?", answer: "Date range" },
    { section: "Data Quality" },
    { question: "Are there known data quality issues?", answer: "Yes" },
    {
      question: "What are the known data quality issues?",
      answer: "GPS reliability"
    },
    { section: "Data Related to People" },
    {
      question:
        "Does this dataset relate to people, i.e. is it based on a survey, census, or other population study?",
      answer: "No"
    },
    {
      question:
        "Were the people in the dataset informed about the data collection?",
      answer: ""
    },
    {
      question:
        "How were the people in the dataset informed about the data collection?",
      answer: ""
    },
    {
      question:
        "Did the people in the dataset explicitly consent to the data collection?",
      answer: ""
    },
    {
      question:
        "How did the people in the dataset explicitly consent to the data collection?",
      answer: ""
    },
    {
      question:
        "Were the people in the dataset informed about what the dataset would be used for?",
      answer: ""
    },
    {
      question:
        "How were the people in the dataset informed about what the dataset would be used for?",
      answer: ""
    },
    {
      question:
        "Were the people in the dataset provided with any mechanism to revoke their consent in the future or for certain uses?",
      answer: ""
    },
    {
      question:
        "What mechanism was provided for people in the dataset to revoke their consent?",
      answer: ""
    },
    {
      question: "Could this dataset expose people to harm or legal action?",
      answer: ""
    },
    {
      question:
        "What ways could this dataset expose people to harm or legal action?",
      answer: ""
    },
    {
      question:
        "Were privacy guarantees provided to the people in this dataset?",
      answer: ""
    },
    {
      question:
        "What privacy guarantees were provided? How are those privacy guarantees ensured?",
      answer: ""
    },
    {
      question:
        "How representative is this dataset of the population it claims to study? In what ways might this dataset be misrepresentative?",
      answer: ""
    },
    {
      section: "Legal and Ethical Considerations"
    },
    {
      question: "What data protection standards does this dataset comply with?",
      answer: ""
    },
    {
      question:
        "Does the dataset contain information that might be considered sensitive or confidential, including personally identifying information?",
      answer: "No"
    },
    {
      question:
        "What information does the dataset contain that might be considered sensitive or confidential?",
      answer: ""
    },
    {
      question:
        "Does the dataset contain information that might be considered inappropriate or offensive?",
      answer: "No"
    },
    {
      question:
        "What information in the dataset might be considered inappropriate or offensive?",
      answer: ""
    }
  ],
  resources: [
    { section: "Studies and Papers" },
    {
      link: "https://www.portlandoregon.gov/bps/62635",
      description:
        "Gentrification and Displacement Study - Portland Bureau of Planning and Sustainability"
    },
    {
      link:
        "https://www.sciencedirect.com/science/article/abs/pii/S2213624X18300270",
      description:
        "Gentrification of station areas and its impact on transit ridership"
    },
    { section: "Articles" },
    {
      link:
        "http://transitcenter.org/2017/11/14/in-portland-economic-displacement-may-be-a-driver-of-transit-ridership-loss/",
      description:
        "In Portland, Economic Displacement May Be A Driver of Transit Ridership Loss"
    },
    {
      link:
        "https://www.nrdc.org/onearth/when-public-transportation-leads-gentrification",
      description: "When Public Transit Leads Gentrification"
    },
    {
      link:
        "http://transitcenter.org/publications/inclusive-transit-advancing-equity-improved-access-opportunity/",
      description:
        "Inclusive Transit: Advancing Equity Through Improved Access and Opportunity"
    },
    { section: "Organizations" },
    { link: "https://trimet.org/", description: "TriMet" },
    {
      link: "https://www.portlandoregon.gov/bps/",
      description: "Portland Bureau of Planning and Sustainability"
    },
    { link: "https://www.paalf.org/", description: "PAALF" },
    { link: "http://transitcenter.org/", description: "TransitCenter" }
  ],
  // authors likely an array of keys in the future
  authors: [
    "https://civicsoftwarefoundation.org/static/human-grid-test-4c90bfc3f316f5d4e104320cb98c43c8.png",
    "https://civicsoftwarefoundation.org/static/human-grid-test2-ea1849501456af341647068243fc72bb.png"
  ]
});

export default demoCardMeta;
