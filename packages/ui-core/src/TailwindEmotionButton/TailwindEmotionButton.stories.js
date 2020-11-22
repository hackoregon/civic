import React from "react";

import { TailwindEmotionButton } from "./TailwindEmotionButton";

// These stories serve as documentation and visual test cases
// Component Story Format: https://storybook.js.org/docs/react/api/csf

export default {
  title: "Unsorted/Components/TailwindEmotionButton",
  parameters: { component: TailwindEmotionButton }
};

const Template = args => <TailwindEmotionButton {...args} />;

export const Standard = Template.bind({});
