import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { CardList } from "../src/index";
import { storybookStyles } from "./storyStyles";
import { SampleCard } from "./CivicCardSample";

// const SampleCard_A = SampleCard;
// SampleCard_A.tags = [

// ];

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
      component: SampleCard
    },
    {
      slug: "demo-card",
      project: "@hackoregon/2019-template",
      component: SampleCard
    }
  ]
};

export default () =>
  storiesOf("Component Lib|CIVIC Platform/Card List", module)
    .addDecorator(checkA11y)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add("Default", () => <CardList CardRegistry={CardRegistryMock} />);
