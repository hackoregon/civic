import React from "react";

import { CivicProse } from "./CivicProse";

// These stories serve as documentation and visual test cases
// Component Story Format: https://storybook.js.org/docs/react/api/csf

export default {
  title: "Design/Brand/CivicProse",
  parameters: { component: CivicProse }
};

const Template = args => <CivicProse {...args} />;

export const Small = Template.bind({});
Small.args = { variant: "prose-sm" };
export const Standard = Template.bind({});
Standard.args = {};
export const Large = Template.bind({});
Large.args = { variant: "prose-lg" };
export const ExtraLarge = Template.bind({});
ExtraLarge.args = { variant: "prose-xl" };
export const DoubleExtraLarge = Template.bind({});
DoubleExtraLarge.args = { variant: "prose-2xl" };
export const ExampleLargeSans = Template.bind({});
ExampleLargeSans.args = { variant: "prose-lg font-sans" };
