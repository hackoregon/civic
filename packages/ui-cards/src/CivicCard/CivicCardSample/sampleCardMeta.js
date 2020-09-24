/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { Collapsable } from "@hackoregon/ui-core";
import SampleCardVisualization from "./SampleCardVisualization";

const sampleCardMeta = (/* data */) => ({
  title: "Transit Ridership, Gentrification, and Displacement",
  slug: "demo-card",
  introText: (
    <p>
      Gentrification and displacement drive changes in transit ridership.
      Understanding these changes at the different stages of the gentrification
      process can help inform investments in equitable mobility.
    </p>
  ),
  // visualization gets data, isLoading as props by default
  visualization: SampleCardVisualization,
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
    "Oregon",
    "Demo"
  ],
  selector: null, // optional, to be added later
  analysis: (
    <Collapsable description="about this analysis">
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
  // metadataQA likely to take metadata API endpoint in the near future
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
    }
  ],
  resources: [
    {
      heading: "Studies and Papers",
      items: [
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
        }
      ]
    },
    {
      heading: "Articles",
      items: [
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
        }
      ]
    },
    {
      heading: "Organizations",
      items: [
        { link: "https://trimet.org/", description: "TriMet" },
        {
          link: "https://www.portlandoregon.gov/bps/",
          description: "Portland Bureau of Planning and Sustainability"
        },
        { link: "https://www.paalf.org/", description: "PAALF" },
        { link: "http://transitcenter.org/", description: "TransitCenter" }
      ]
    }
  ],
  // authors likely an array of keys in the future
  authors: []
});

export default sampleCardMeta;
