import React from "react";
import { VictoryCrazyTheme, VictoryTheme } from "@hackoregon/ui-themes";

import { PieChart } from "./PieChart";

export default {
  title: "Component Lib/Charts/Pie Chart",
  parameters: {
    component: PieChart,
    componentSubtitle: "A pie chart"
  },
  args: {
    title: "Contributor Breakdown",
    subtitle: "Contributions reported to ORESTAR by category",
    data: [
      { x: "Business entity", y: 35 },
      { x: "Individual", y: 40 },
      { x: "Labor organization", y: 55 },
      { x: "Other", y: 75 }
    ],
    theme: VictoryTheme
  },
  argsTypes: {
    data: { control: "array" }
  }
};

const Template = args => <PieChart {...args} />;

export const Standard = Template.bind({});
export const HalfDoughnut = Template.bind({});
HalfDoughnut.args = {
  halfDoughnut: true
};
export const UseLegend = Template.bind({});
UseLegend.args = {
  useLegend: true
};
export const HalfDoughnutUseLegend = Template.bind({});
HalfDoughnutUseLegend.args = {
  ...HalfDoughnut.args,
  ...UseLegend.args
};
export const CustomTheme = Template.bind({});
CustomTheme.args = {
  theme: VictoryCrazyTheme
};
export const Loading = Template.bind({});
Loading.args = {
  loading: true
};
export const Error = Template.bind({});
Error.args = {
  loading: true,
  error: "Something very bad happened"
};
export const NoTitleOrSubtitle = Template.bind({});
NoTitleOrSubtitle.args = { title: null, subtitle: null };
export const NoSubtitle = Template.bind({});
NoSubtitle.args = { title: null };
