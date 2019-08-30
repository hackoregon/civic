/* eslint-disable react/prop-types */
import React, { Fragment, useState } from "react";
import { useMediaQuery } from "@material-ui/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react";
import {
  CivicCard,
  LineChart,
  Collapsable,
  CivicCardLayoutClassic,
  CivicCardLayoutVisualizationOnly,
  CivicCardLayoutSideBySide,
  RadioButtonGroup,
  CivicCardLayoutFullWithDescriptions
} from "../src";
import { civicFormat } from "../src/utils";

const demoData = [
  {
    year: 2013,
    weekday_sum_ons: 315193
  },
  {
    year: 2014,
    weekday_sum_ons: 334933
  },
  {
    year: 2015,
    weekday_sum_ons: 328341
  },
  {
    year: 2016,
    weekday_sum_ons: 320263
  },
  {
    year: 2017,
    weekday_sum_ons: 316313
  }
];

const sideBySideDemoData = {
  14: [
    {
      year: 2009,
      weekday_sum_ons: 6958
    },
    {
      year: 2010,
      weekday_sum_ons: 6497
    },
    {
      year: 2011,
      weekday_sum_ons: 6167
    },
    {
      year: 2012,
      weekday_sum_ons: 6253
    },
    {
      year: 2013,
      weekday_sum_ons: 6082
    },
    {
      year: 2014,
      weekday_sum_ons: 6326
    },
    {
      year: 2015,
      weekday_sum_ons: 6139
    },
    {
      year: 2016,
      weekday_sum_ons: 5778
    },
    {
      year: 2017,
      weekday_sum_ons: 5742
    }
  ],
  72: [
    {
      year: 2009,
      weekday_sum_ons: 17691
    },
    {
      year: 2010,
      weekday_sum_ons: 16376
    },
    {
      year: 2011,
      weekday_sum_ons: 16848
    },
    {
      year: 2012,
      weekday_sum_ons: 16947
    },
    {
      year: 2013,
      weekday_sum_ons: 16387
    },
    {
      year: 2014,
      weekday_sum_ons: 16774
    },
    {
      year: 2015,
      weekday_sum_ons: 16551
    },
    {
      year: 2016,
      weekday_sum_ons: 15355
    },
    {
      year: 2017,
      weekday_sum_ons: 14913
    }
  ],
  20: [
    {
      year: 2009,
      weekday_sum_ons: 10476
    },
    {
      year: 2010,
      weekday_sum_ons: 10115
    },
    {
      year: 2011,
      weekday_sum_ons: 10058
    },
    {
      year: 2012,
      weekday_sum_ons: 10834
    },
    {
      year: 2013,
      weekday_sum_ons: 10683
    },
    {
      year: 2014,
      weekday_sum_ons: 11270
    },
    {
      year: 2015,
      weekday_sum_ons: 11209
    },
    {
      year: 2016,
      weekday_sum_ons: 10543
    },
    {
      year: 2017,
      weekday_sum_ons: 10988
    }
  ]
};

function DemoCardVisualization({ isLoading, data }) {
  return (
    !isLoading &&
    data && (
      <LineChart
        data={data}
        dataKey="year"
        dataValue="weekday_sum_ons"
        title="Portland Transit Ridership - Weekdays"
        xLabel="Year"
        yLabel="Ridership"
        xNumberFormatter={civicFormat.year}
        subtitle="Average daily ridership for all TriMet bus and rail"
      />
    )
  );
}

function DemoCardVisualizationWithSelector({ isLoading, data }) {
  const isDesktop = useMediaQuery("(min-width:640px)");
  const grpLabel = "Bus Line";
  const radioLabels = ["14", "72", "20"];
  const [busRoute, setBusRoute] = useState("14");
  const domain = {
    x: [2009, 2017],
    y: [0, 20000]
  };
  return (
    !isLoading &&
    data && (
      <>
        <RadioButtonGroup
          grpLabel={grpLabel}
          labels={radioLabels}
          row={!isDesktop}
          labelPlacement={isDesktop ? "" : "bottom"}
          onChange={({ target }) => setBusRoute(target.value)}
          value={busRoute}
        />
        <LineChart
          data={data[busRoute]}
          dataKey="year"
          dataValue="weekday_sum_ons"
          domain={domain}
          title="Portland Transit Ridership - Weekdays"
          xLabel="Year"
          yLabel="Ridership"
          xNumberFormatter={civicFormat.year}
          subtitle="Average daily ridership for all TriMet bus and rail"
        />
      </>
    )
  );
}

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
  // visualization gets data, isLoading as props by default
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
  selector: null, // optional, to be added later
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
  authors: [] // No authors so demo is *nice*
  // // authors likely an array of keys in the future
  // authors: [
  //   "https://civicsoftwarefoundation.org/static/human-grid-test-4c90bfc3f316f5d4e104320cb98c43c8.png",
  //   "https://civicsoftwarefoundation.org/static/human-grid-test2-ea1849501456af341647068243fc72bb.png"
  // ]
});

const demoCardMetaMissingData = (/* data */) => ({
  title: "Demo Card (missing data)",
  slug: "demo-card-missing-data",
  introText: <p>Check the console</p>,
  // visualization gets data, isLoading as props by default
  visualization: DemoCardVisualization,
  selector: null,
  analysis: null,
  metadata: null,
  resources: null,
  authors: []
});

const demoCardMetaSideBySide = data => {
  return {
    ...demoCardMeta(data),
    visualization: DemoCardVisualizationWithSelector
  };
};

export default () =>
  storiesOf("Component Lib|Story Cards/CIVIC Card", module)
    .add("Layout: Full With Descriptions", () => (
      <CivicCard
        cardMeta={demoCardMeta}
        data={demoData}
        isLoading={false}
        Layout={CivicCardLayoutFullWithDescriptions}
      />
    ))
    .add("Layout: Default (full)", () => (
      <CivicCard cardMeta={demoCardMeta} data={demoData} isLoading={false} />
    ))
    .add("Layout: Default (full, missing data) check console", () => (
      <CivicCard
        cardMeta={demoCardMetaMissingData}
        data={demoData}
        isLoading={false}
      />
    ))
    .add("Layout: Classic", () => (
      <CivicCard
        cardMeta={demoCardMeta}
        data={demoData}
        isLoading={false}
        Layout={CivicCardLayoutClassic}
      />
    ))
    .add("Layout: Visualization Only", () => (
      <CivicCard
        cardMeta={demoCardMeta}
        data={demoData}
        isLoading={false}
        Layout={CivicCardLayoutVisualizationOnly}
      />
    ))
    .add("Layout: SideBySide", () => (
      <CivicCard
        cardMeta={demoCardMetaSideBySide}
        data={sideBySideDemoData}
        isLoading={false}
        Layout={CivicCardLayoutSideBySide}
      />
    ));
