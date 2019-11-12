import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { CardList } from "../src/index";
import { storybookStyles } from "./storyStyles";
import {
  FilterSampleCard,
  FilterSampleCardB,
  FilterSampleCardC,
  FilterSampleCardD,
  FilterSampleCardE,
  FilterSampleCardF,
  FilterSampleCardG,
  FilterSampleCardH,
  FilterSampleCardJ,
  FilterSampleCardK,
  FilterSampleCardL,
  FilterSampleCardM,
  FilterSampleCardN
} from "./CivicCardSampleFilter";

const CardRegistryMock = {
  tags: {
    Transportation: 2,
    Bus: 1,
    Rail: 1,
    Portland: 2,
    Housing: 1,
    Gentrification: 1,
    Transit: 1,
    Demo: 1
  },
  entries: [
    {
      slug: "template-file-card",
      project: "@hackoregon/2019-template",
      component: FilterSampleCard
    },
    {
      slug: "demo-card",
      project: "@hackoregon/2019-template",
      component: FilterSampleCardB
    },
    {
      slug: "template-file-card-1",
      project: "@hackoregon/2019-template",
      component: FilterSampleCardC
    },
    {
      slug: "demo-card-1",
      project: "@hackoregon/2019-template",
      component: FilterSampleCardD
    },
    {
      slug: "template-file-card-2",
      project: "@hackoregon/2019-template",
      component: FilterSampleCardE
    },
    {
      slug: "demo-card-2",
      project: "@hackoregon/2019-template",
      component: FilterSampleCardF
    },
    {
      slug: "template-file-card",
      project: "@hackoregon/2019-template",
      component: FilterSampleCardG
    },
    {
      slug: "demo-card",
      project: "@hackoregon/2019-template",
      component: FilterSampleCardH
    },
    {
      slug: "template-file-card-1",
      project: "@hackoregon/2019-template",
      component: FilterSampleCardJ
    },
    {
      slug: "demo-card-1",
      project: "@hackoregon/2019-template",
      component: FilterSampleCardK
    },
    {
      slug: "template-file-card-2",
      project: "@hackoregon/2019-template",
      component: FilterSampleCardL
    },
    {
      slug: "demo-card-2",
      project: "@hackoregon/2019-template",
      component: FilterSampleCardM
    },
    {
      slug: "template-file-card-2",
      project: "@hackoregon/2019-template",
      component: FilterSampleCardN
    }
  ]
};

const tagsListExample = {
  topics: ["Race", "Transportation", "Disaster Resilience", "Housing"],
  locations: ["Portland", "Oregon", "Nationwide", "Your City"],
  visualizations: ["Chart", "Infographic", "Cloropleth Map", "Scatterplot"]
};

const projectsMock = [
  {
    type: "application",
    title: "CIVIC Sandbox",
    description:
      "A common resource that can power ethical data exploration through interactive maps",
    link: "/sandbox"
  },
  {
    type: "collection",
    title: "The Changing Complexion of Housing in Portland",
    description:
      "Examining the demographic shifts of populations and disparities in homeownership",
    link: "/2019/housing"
  },
  {
    type: "collection",
    title: "Transit Operations Analytics Data (TOAD)",
    description: "Visualizing transit operations data",
    link: "/2019/transportation"
  },
  {
    type: "collection",
    title: "Disaster Resilience",
    description:
      "Assessing Risk and Prioritizing Action to Strengthen Resilience in the Face of a Natural Disaster",
    link: "/cities/portland/disaster"
  }
];

export default () =>
  storiesOf("Component Lib|CIVIC Platform/Card List", module)
    .addDecorator(checkA11y)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add("Default", () => (
      <CardList
        CardRegistry={CardRegistryMock}
        projects={projectsMock}
        tagsList={tagsListExample}
      />
    ));
