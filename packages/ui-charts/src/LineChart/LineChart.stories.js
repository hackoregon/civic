import React from "react";
import { civicFormat } from "@hackoregon/utils";
import { VictoryCrazyTheme, VictoryTheme } from "@hackoregon/ui-themes";

import { LineChart } from "./LineChart";

export default {
  title: "Component Lib/Charts/Line Chart",
  parameters: {
    component: LineChart,
    componentSubtitle: "A line chart"
  },
  args: {
    title: "Public Transit Ridership",
    subtitle:
      "Average daily ridership for TriMet bus and rail (unlinked trips)",
    xLabel: "Year",
    yLabel: "Ridership",
    xNumberFormatter: civicFormat.year,
    yNumberFormatter: civicFormat.numeric,
    dataKey: "year",
    dataValue: "ridership",
    dataSeries: "series",
    data: [
      { year: 2001, ridership: 217309, series: "Weekday" },
      { year: 2002, ridership: 254651, series: "Weekday" },
      { year: 2003, ridership: 213986, series: "Weekday" },
      { year: 2004, ridership: 266412, series: "Weekday" },
      { year: 2005, ridership: 313494, series: "Weekday" },
      { year: 2001, ridership: 73028, series: "Saturday" },
      { year: 2002, ridership: 113778, series: "Saturday" },
      { year: 2003, ridership: 111636, series: "Saturday" },
      { year: 2004, ridership: 155272, series: "Saturday" },
      { year: 2005, ridership: 188757, series: "Saturday" },
      { year: 2001, ridership: 73028, series: "Sunday" },
      { year: 2002, ridership: 75042, series: "Sunday" },
      { year: 2003, ridership: 75615, series: "Sunday" },
      { year: 2004, ridership: 108040, series: "Sunday" },
      { year: 2005, ridership: 134569, series: "Sunday" }
    ],
    theme: VictoryTheme
  },
  argsTypes: {
    data: { control: "array" }
  }
};

const Template = args => <LineChart {...args} />;

export const Standard = Template.bind({});
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
export const ManyDataPoints = Template.bind({});
ManyDataPoints.args = {
  data: Array(500)
    .fill(null)
    .map((_, index) => {
      const x =
        (index % 2 ? Math.floor(index / 2) : Math.ceil(index / 2)) * 0.25;
      const fn = index % 2 ? "sin" : "cos";
      return {
        x,
        fn,
        y: Math[fn](x)
      };
    }),
  dataKey: "x",
  dataKeyLabel: "X",
  dataValue: "y",
  dataValueLabel: "Y",
  dataSeries: "fn",
  title: "Cos vs. Sin",
  subtitle: "Getting wavy",
  xLabel: "X",
  yLabel: "Y"
};
