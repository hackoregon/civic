import React from "react";

import { KitchenSink } from "./KitchenSink";

// These stories serve as documentation and visual test cases
// Component Story Format: https://storybook.js.org/docs/react/api/csf

export default {
  title: "Unsorted/Components/KitchenSink",
  parameters: { component: KitchenSink }
};

const Template = args => <KitchenSink {...args} />;

export const Standard = Template.bind({});

export const Magritte = Template.bind({});
Magritte.args = {
  message: "This is not a pipe |"
};
