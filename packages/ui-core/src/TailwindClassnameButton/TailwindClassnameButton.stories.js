import React from "react";

import { TailwindClassnameButton } from "./TailwindClassnameButton";

// These stories serve as documentation and visual test cases
// Component Story Format: https://storybook.js.org/docs/react/api/csf

export default {
  title: "Unsorted/Components/TailwindClassnameButton",
  parameters: { component: TailwindClassnameButton }
};

const Template = args => <TailwindClassnameButton {...args} />;

export const Standard = Template.bind({});
