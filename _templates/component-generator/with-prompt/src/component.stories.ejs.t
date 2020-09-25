---
to: packages/<%=package%>/src/<%=component%>/<%=component%>.stories.js
---
import React from "react";

import { <%=component%> } from "./<%=component%>";

// These stories serve as documentation and visual test cases
// Component Story Format: https://storybook.js.org/docs/react/api/csf

export default {
  title: "Unsorted/Components/<%=component%>",
  parameters: { component: <%=component%> },
};

const Template = args => <<%=component%> {...args} />;

export const Standard = Template.bind({});

export const Magritte = Template.bind({});
Magritte.args = {
  message: "This is not a pipe |",
};
