import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { ExploreRelated } from "../src/index";
import {
  SampleCard,
  SampleCardB,
  SampleCardC,
  SampleCardD,
  SampleCardE
} from "./CivicCardSample";

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
      component: SampleCardB
    },
    {
      slug: "demo-card-2",
      project: "@hackoregon/2019-template",
      component: SampleCardC
    },
    {
      slug: "demo-card-3",
      project: "@hackoregon/2019-template",
      component: SampleCardD
    },
    {
      slug: "demo-card-4",
      project: "@hackoregon/2019-template",
      component: SampleCardE
    }
  ],
  find(slug) {
    return this.entries.find(entry => entry.slug === slug);
  }
};

export default () =>
  storiesOf("Component Lib/CIVIC Platform/Explore Related", module)
    .addDecorator(checkA11y)
    .addDecorator(story => <div>{story()}</div>)
    .add("Default", () => (
      <ExploreRelated
        CardRegistry={CardRegistryMock}
        slug="template-file-card"
      />
    ))
    .add("Less Entries", () => (
      <ExploreRelated
        CardRegistry={CardRegistryMock}
        slug="template-file-card"
        numOfRelatedCards={2}
      />
    ));
