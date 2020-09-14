import React from "react";
import { civicFormat } from "@hackoregon/utils";
import { VictoryCrazyTheme, VictoryTheme } from "@hackoregon/ui-themes";

import { BarChart } from "./BarChart";

export default {
  title: "Component Lib/Charts/Bar Chart",
  parameters: {
    component: BarChart,
    componentSubtitle: "A vertical bar chart, or column chart"
  },
  args: {
    title: "Dogs with Money",
    subtitle: "Dogs in Portland with a net worth greater than $1,000",
    xLabel: "Year",
    yLabel: "Dogs",
    xNumberFormatter: civicFormat.year,
    yNumberFormatter: civicFormat.numeric,
    dataKey: "ye",
    dataValue: "population",
    data: [
      { ye: 1994, population: 2000 },
      { ye: 1995, population: 8000 },
      { ye: 1996, population: 6000 },
      { ye: 1997, population: 3000 },
      { ye: 1998, population: 1000 }
    ],
    theme: VictoryTheme
  },
  argsTypes: {
    data: { control: "array" }
  }
};

const Template = args => <BarChart {...args} />;

export const Standard = Template.bind({});
export const GroupedData = Template.bind({});
GroupedData.args = {
  dataSeries: "breed",
  data: [
    {
      ye: 1994,
      population: 2000,
      breed: "poodle"
    },
    {
      ye: 1995,
      population: 8000,
      breed: "poodle"
    },
    {
      ye: 1995,
      population: 8000,
      breed: "poodle"
    },
    {
      ye: 1996,
      population: 6000,
      breed: "poodle"
    },
    {
      ye: 1997,
      population: 3000,
      breed: "poodle"
    },
    {
      ye: 1998,
      population: 1000,
      breed: "poodle"
    },
    {
      ye: 1994,
      population: 3000,
      breed: "lab"
    },
    {
      ye: 1995,
      population: 5000,
      breed: "lab"
    },
    {
      ye: 1996,
      population: 9000,
      breed: "lab"
    },
    {
      ye: 1997,
      population: 2000,
      breed: "lab"
    },
    {
      ye: 1998,
      population: 3000,
      breed: "lab"
    },
    {
      ye: 1994,
      population: 1000,
      breed: "pug"
    },
    {
      ye: 1995,
      population: 2000,
      breed: "pug"
    },
    {
      ye: 1996,
      population: 1000,
      breed: "pug"
    },
    {
      ye: 1997,
      population: 2000,
      breed: "pug"
    },
    {
      ye: 1998,
      population: 1000,
      breed: "pug"
    }
  ]
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
