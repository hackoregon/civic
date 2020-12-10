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
Small.args = { variant: "prose prose-sm" };
export const Standard = Template.bind({});
Standard.args = { variant: "prose" };
export const Large = Template.bind({});
Large.args = { variant: "prose prose-lg" };
export const ExtraLarge = Template.bind({});
ExtraLarge.args = { variant: "prose prose-xl" };
export const DoubleExtraLarge = Template.bind({});
DoubleExtraLarge.args = { variant: "prose prose-2xl" };
