import React from "react";

import { TailwindCSSButton } from "./TailwindCSSButton";

// These stories serve as documentation and visual test cases
// Component Story Format: https://storybook.js.org/docs/react/api/csf

export default {
  title: "Unsorted/Components/TailwindCSSButton",
  parameters: { component: TailwindCSSButton }
};

const Template = args => <TailwindCSSButton {...args} />;

export const Standard = Template.bind({});
