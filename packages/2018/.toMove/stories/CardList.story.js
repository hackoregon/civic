import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { storybookStyles } from "@hackoregon/ui-themes";
import { CardList } from "../src/components/index";
import sampleFilterCardsWithTags from "./CivicCardSample/SampleCardFilterData";

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
  entries: sampleFilterCardsWithTags.map(sampleCard => {
    return {
      slug: "template-file-card",
      project: "@hackoregon/2019-template",
      component: sampleCard
    };
  })
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
  storiesOf("Projects/civicplatform•org/Card List", module)
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
