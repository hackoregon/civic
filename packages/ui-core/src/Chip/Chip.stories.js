import React from "react";

import { Chip } from "./Chip";

export default {
  title: "Component Lib/CIVIC Platform/Chip",
  parameters: {
    component: Chip,
    componentSubtitle: "A chip for showing hashtags"
  },
  args: { tag: "data", onDelete: undefined },
  argTypes: { color: { control: "color" } }
};

const Template = args => <Chip {...args} />;

export const Standard = Template.bind({});

export const Clickable = Template.bind({});
Clickable.args = { clickable: true };

export const Medium = Template.bind({});
Medium.args = { size: "medium" };

export const Black = Template.bind({});
Black.args = { color: "black" };

export const Deletable = Template.bind({});
Deletable.args = { onDelete: () => {} };
