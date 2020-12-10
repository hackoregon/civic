import React from "react";

import { CivicProse } from "./CivicProse";

// These stories serve as documentation and visual test cases
// Component Story Format: https://storybook.js.org/docs/react/api/csf

export default {
  title: "Design/Brand/CivicProse",
  parameters: { component: CivicProse }
};

const Template = args => <CivicProse {...args} />;

export const Standard = Template.bind({});
