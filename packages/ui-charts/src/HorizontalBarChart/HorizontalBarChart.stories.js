import React from "react";
import { civicFormat } from "@hackoregon/utils";
import { VictoryCrazyTheme, VictoryTheme } from "@hackoregon/ui-themes";

import { HorizontalBarChart } from "./HorizontalBarChart";

export default {
  title: "Component Lib/Charts/Horizontal Bar Chart",
  parameters: {
    component: HorizontalBarChart,
    componentSubtitle: "A horizontal bar chart"
  },
  args: {
    title: "Dogs with Money",
    subtitle: "As of January 2017",
    xLabel: "Population",
    yLabel: "Breed",
    dataLabelFormatter: label => civicFormat.unformatted(label),
    dataValueFormatter: value => civicFormat.numeric(value),
    dataLabel: "breed",
    dataValue: "population",
    data: [
      { sortOrder: 4, population: 2000, breed: "Labrador Retriever" },
      { sortOrder: 5, population: 8000, breed: "Standard Poodle" },
      { sortOrder: 2, population: 6000, breed: "French Bulldog" },
      { sortOrder: 1, population: 3000, breed: "Afghan Hound" },
      { sortOrder: 3, population: 1000, breed: "Jack Russell Terrier" }
    ],
    theme: VictoryTheme
  },
  argsTypes: {
    data: { control: "array" },
    dataLabelFormatter: { control: "none" },
    dataValueFormatter: { control: "none" }
  }
};

const Template = args => <HorizontalBarChart {...args} />;

export const Standard = Template.bind({});
export const Minimalist = Template.bind({});
Minimalist.args = { title: null, subtitle: null, minimalist: true };
export const CustomSortOrder = Template.bind({});
CustomSortOrder.args = { sortOrder: "sortOrder" };
export const NegativeValues = Template.bind({});
NegativeValues.args = {
  data: [
    { population: 0.1, breed: "Labrador Retriever" },
    { population: 0.3, breed: "Standard Poodle" },
    { population: -0.1, breed: "French Bulldog" },
    { population: -0.2, breed: "Afghan Hound" },
    { population: 0.0, breed: "Jack Russell Terrier" }
  ],
  dataValueFormatter: civicFormat.percentage,
  yLabel: "% Change in Population"
};
export const Stacked = Template.bind({});
Stacked.args = {
  data: [
    { breed: "Poodle", year: "2017", population: 7 },
    { breed: "Poodle", year: "2018", population: 2 },
    { breed: "Poodle", year: "2019", population: 3 },
    { breed: "Bulldog", year: "2017", population: 2 },
    { breed: "Bulldog", year: "2018", population: 5 },
    { breed: "Bulldog", year: "2019", population: 4 },
    { breed: "Terrier", year: "2017", population: 1 },
    { breed: "Terrier", year: "2018", population: 2 },
    { breed: "Terrier", year: "2019", population: 3 }
  ],
  title: "Number of Dogs",
  subtitle: "By year",
  dataLabel: "year",
  dataSeriesKey: "breed",
  stacked: true
};
export const StackedProportions = Template.bind({});
StackedProportions.args = {
  ...Stacked.args,
  hundredPercentData: true,
  dataValueFormatter: civicFormat.percentage
};
export const Grouped = Template.bind({});
Grouped.args = { ...Stacked.args, stacked: false, grouped: true };
export const GroupedWithCustomLabels = Template.bind({});
GroupedWithCustomLabels.args = {
  ...Grouped.args,
  dataSeriesLabel: [
    {
      category: "Poodle",
      label: "🐩 Poodle"
    },
    {
      category: "Bulldog",
      label: "🐶 Bulldog"
    },
    {
      category: "Terrier",
      label: "🐕 Terrier"
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
