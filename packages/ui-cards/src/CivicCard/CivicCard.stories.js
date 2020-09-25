/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useMediaQuery } from "@material-ui/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import { LineChart } from "@hackoregon/ui-charts";
import { RadioButtonGroup } from "@hackoregon/ui-core";
import { civicFormat } from "@hackoregon/utils";
import {
  CivicCard,
  CivicCardLayoutFull,
  CivicCardLayoutClassic,
  CivicCardLayoutVisualizationOnly,
  CivicCardLayoutVisualizationOnlyNoLink,
  CivicCardLayoutSideBySide,
  CivicCardLayoutFullWithDescriptions,
  CivicCardLayoutPreview,
  CivicCardLayoutPreviewTitleOnly
} from "..";
import {
  sampleCardMeta,
  sampleCardData,
  SampleCardVisualization
} from "./CivicCardSamples";

const sideBySideSampleData = {
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

function SampleCardVisualizationWithSelector({ isLoading, data }) {
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

const sampleCardMetaMissingData = (/* data */) => ({
  title: "Sample Card (missing data)",
  slug: "sample-card-missing-data",
  introText: <p>Check the console</p>,
  // visualization gets data, isLoading as props by default
  visualization: SampleCardVisualization,
  selector: null,
  analysis: null,
  metadata: null,
  resources: null,
  authors: null
});

const sampleCardMetaSideBySide = data => {
  return {
    ...sampleCardMeta(data),
    visualization: SampleCardVisualizationWithSelector
  };
};

export default {
  title: "Component Lib/Story Cards/CIVIC Card",
  component: CivicCard,
  argTypes: { Layout: { control: { disabled: true } } }
};

const Template = args => (
  <CivicCard
    cardMeta={sampleCardMeta}
    data={sampleCardData}
    isLoading={false}
    {...args}
  />
);

export const LayoutDefaultWithDescriptions = Template.bind({});
LayoutDefaultWithDescriptions.args = {
  Layout: CivicCardLayoutFullWithDescriptions
};
export const LayoutDefault = Template.bind({});
LayoutDefault.args = {
  Layout: CivicCardLayoutFull
};
LayoutDefault.storyName = "Layout Default (full)";
export const LayoutDefaultMissingData = Template.bind({});
LayoutDefaultMissingData.storyName =
  "Layout Default (full, missing data) check console";
LayoutDefaultMissingData.args = { cardMeta: sampleCardMetaMissingData };
export const LayoutClassic = Template.bind({});
LayoutClassic.args = { Layout: CivicCardLayoutClassic };
export const LayoutVisualizationOnly = Template.bind({});
LayoutVisualizationOnly.args = { Layout: CivicCardLayoutVisualizationOnly };
export const LayoutVisualizationOnlyNoLink = Template.bind({});
LayoutVisualizationOnlyNoLink.args = {
  Layout: CivicCardLayoutVisualizationOnlyNoLink
};
export const LayoutPreview = Template.bind({});
LayoutPreview.args = { Layout: CivicCardLayoutPreview };
export const LayoutPreviewTitleOnly = Template.bind({});
LayoutPreviewTitleOnly.args = { Layout: CivicCardLayoutPreviewTitleOnly };
export const LayoutSideBySide = Template.bind({});
LayoutSideBySide.args = {
  cardMeta: sampleCardMetaSideBySide,
  data: sideBySideSampleData,
  Layout: CivicCardLayoutSideBySide
};
