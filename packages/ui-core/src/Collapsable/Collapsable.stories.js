import React from "react";
import { wallOfText } from "@hackoregon/utils";

import { Collapsable } from "./Collapsable";

export default {
  title: "Component Lib/CIVIC Platform/Collapsable",
  parameters: {
    component: Collapsable,
    componentSubtitle: "A container for collapsable content"
  },
  args: {
    description: "Lorem ipsum"
  },
  argTypes: { children: { control: { disable: true } } }
};

export const Standard = args => (
  <>
    <p>{wallOfText}</p>
    <a href="https://www.example.com">Example link</a>
    <Collapsable {...args}>
      <Collapsable.Section hidden>
        <p>{wallOfText}</p>
        <a href="https://www.example.com">Example hidden link</a>
      </Collapsable.Section>
    </Collapsable>
  </>
);

export const ExampleAlternateUsage = args => (
  <Collapsable {...args}>
    <Collapsable.Section>
      <p>{wallOfText}</p>
      <a href="https://www.example.com">Example link</a>
    </Collapsable.Section>
    <Collapsable.Section hidden>
      <p>{wallOfText}</p>
      <a href="https://www.example.com">Example hidden link</a>
    </Collapsable.Section>
  </Collapsable>
);
