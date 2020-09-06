import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  text,
  object,
  boolean,
  optionsKnob as options
} from "@storybook/addon-knobs";
import { civicFormat, getKeyNames } from "@hackoregon/utils";
import { VictoryCrazyTheme, VictoryTheme } from "@hackoregon/ui-themes";

import notes from "./horizontalBarChart.notes.md";
import { HorizontalBarChart } from "../src";

const GROUP_IDS = {
  LABELS: "Labels",
  DATA: "Data",
  CUSTOM: "Custom"
};

export default () =>
  storiesOf("Component Lib/Charts/Horizontal Bar Chart", module)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const sampleData = [
          { population: 2000, label: "Labrador Retriever" },
          { population: 8000, label: "Standard Poodle" },
          { population: 6000, label: "French Bulldog" },
          { population: 3000, label: "Afghan Hound" },
          { population: 1000, label: "Jack Russell Terrier" }
        ];
        const title = text("Title", "Dogs and their Money", GROUP_IDS.LABELS);
        const subtitle = text(
          "Subtitle",
          "As of January 2017",
          GROUP_IDS.LABELS
        );
        const xLabel = text("X-axis label", "Dollars", GROUP_IDS.LABELS);
        const dataValueFormatter = getKeyNames(civicFormat);
        const optionSelectX = options(
          "X-axis value format",
          dataValueFormatter,
          "dollars",
          { display: "select" },
          GROUP_IDS.LABELS
        );
        const yLabel = text("Y-axis label", "Dogs", GROUP_IDS.LABELS);
        const dataValue = text("Data value", "population", GROUP_IDS.DATA);
        const dataLabel = text("Data label", "label", GROUP_IDS.DATA);
        const data = object("Data", sampleData, GROUP_IDS.DATA);

        return (
          <HorizontalBarChart
            data={data}
            dataValue={dataValue}
            dataLabel={dataLabel}
            title={title}
            subtitle={subtitle}
            xLabel={xLabel}
            yLabel={yLabel}
            dataValueFormatter={x => civicFormat[optionSelectX](x)}
          />
        );
      },
      { notes }
    )
    .add(
      "Custom",
      () => {
        const sampleData = [
          { sortOrder: 1, population: 2000, label: "Labrador Retriever" },
          { sortOrder: 2, population: 8000, label: "Standard Poodle" },
          { sortOrder: 3, population: 6000, label: "French Bulldog" },
          { sortOrder: 4, population: 3000, label: "Afghan Hound" },
          { sortOrder: 5, population: 1000, label: "Jack Russell Terrier" }
        ];
        const title = text("Title", "Dogs and their Money", GROUP_IDS.LABELS);
        const subtitle = text(
          "Subtitle",
          "As of January 2017",
          GROUP_IDS.LABELS
        );
        const xLabel = text("X-axis label", "Dollars", GROUP_IDS.LABELS);
        const dataValueFormatter = getKeyNames(civicFormat);
        const optionSelectX = options(
          "X-axis value format",
          dataValueFormatter,
          "dollars",
          { display: "select" },
          GROUP_IDS.LABELS
        );
        const yLabel = text("Y-axis label", "Dogs", GROUP_IDS.LABELS);
        const sortOrder = text("Sort order", "sortOrder", GROUP_IDS.DATA);
        const dataValue = text("Data value", "population", GROUP_IDS.DATA);
        const dataLabel = text("Data label", "label", GROUP_IDS.DATA);
        const data = object("Data", sampleData, GROUP_IDS.DATA);
        const sampleDomain = { x: [1, 5], y: [0, 8000] };
        const domain = object("Domain", sampleDomain, GROUP_IDS.CUSTOM);
        const minimalist = boolean("Minimalist", false, GROUP_IDS.CUSTOM);
        const themes = {
          VictoryTheme,
          VictoryCrazyTheme
        };
        const themeOptions = getKeyNames(themes);
        const theme = options(
          "Visualization theme",
          themeOptions,
          "VictoryTheme",
          { display: "select" },
          GROUP_IDS.CUSTOM
        );
        const loading = boolean("Loading", false, GROUP_IDS.CUSTOM);

        return (
          <HorizontalBarChart
            data={data}
            sortOrder={sortOrder}
            dataValue={dataValue}
            dataLabel={dataLabel}
            domain={domain}
            title={title}
            subtitle={subtitle}
            xLabel={xLabel}
            yLabel={yLabel}
            dataValueFormatter={x => civicFormat[optionSelectX](x)}
            minimalist={minimalist}
            theme={(name => themes[name])(theme)}
            loading={loading}
          />
        );
      },
      { notes }
    )
    .add(
      "Example: Default sort order",
      () => {
        const sampleUnsortedData = [
          { population: 2000, label: "Labrador Retriever" },
          { population: 8000, label: "Standard Poodle" },
          { population: 6000, label: "French Bulldog" },
          { population: 3000, label: "Afghan Hound" },
          { population: 1000, label: "Jack Russell Terrier" }
        ];
        const dataValueFormatter = getKeyNames(civicFormat);
        const optionSelectX = options(
          "X-axis value format",
          dataValueFormatter,
          "dollars",
          { display: "select" },
          GROUP_IDS.LABELS
        );
        const dataValue = text("Data value", "population", GROUP_IDS.DATA);
        const dataLabel = text("Data label", "label", GROUP_IDS.DATA);
        const data = object("Data", sampleUnsortedData, GROUP_IDS.DATA);

        return (
          <HorizontalBarChart
            data={data}
            dataValue={dataValue}
            dataLabel={dataLabel}
            dataValueFormatter={x => civicFormat[optionSelectX](x)}
          />
        );
      },
      { notes }
    )
    .add(
      "Example: Minimalist",
      () => {
        const sampleMinimalistData = [
          { population: 2000, label: "Labrador Retriever" },
          { population: 8000, label: "Standard Poodle" }
        ];
        const xLabel = text("X-axis label", "Dollars", GROUP_IDS.LABELS);
        const dataValue = text("Data value", "population", GROUP_IDS.DATA);
        const dataLabel = text("Data label", "label", GROUP_IDS.DATA);
        const data = object("Data", sampleMinimalistData, GROUP_IDS.DATA);

        return (
          <HorizontalBarChart
            data={data}
            dataValue={dataValue}
            dataLabel={dataLabel}
            xLabel={xLabel}
            minimalist
          />
        );
      },
      { notes }
    )
    .add(
      "Example: With negative values",
      () => {
        const sampleNegativeData = [
          { delta: 0.1, label: "Labrador Retriever" },
          { delta: 0.3, label: "Standard Poodle" },
          { delta: -0.1, label: "French Bulldog" },
          { delta: -0.2, label: "Afghan Hound" },
          { delta: 0.0, label: "Jack Russell Terrier" }
        ];
        const title = text("Title", "Dogs and their Money", GROUP_IDS.LABELS);
        const subtitle = text(
          "Subtitle",
          "As of January 2017",
          GROUP_IDS.LABELS
        );
        const xLabel = text(
          "X-axis label",
          "% Change in Population",
          GROUP_IDS.LABELS
        );
        const dataValueFormatter = getKeyNames(civicFormat);
        const optionSelectX = options(
          "X-axis value format",
          dataValueFormatter,
          "percentage",
          { display: "select" },
          GROUP_IDS.LABELS
        );
        const yLabel = text("Y-axis label", "Breed", GROUP_IDS.LABELS);
        const dataValue = text("Data value", "delta", GROUP_IDS.DATA);
        const dataLabel = text("Data label", "label", GROUP_IDS.DATA);
        const data = object("Data", sampleNegativeData, GROUP_IDS.DATA);

        return (
          <HorizontalBarChart
            data={data}
            dataValue={dataValue}
            dataLabel={dataLabel}
            title={title}
            subtitle={subtitle}
            xLabel={xLabel}
            yLabel={yLabel}
            dataValueFormatter={x => civicFormat[optionSelectX](x)}
          />
        );
      },
      { notes }
    )
    .add(
      "Example: Stacked bar chart",
      () => {
        const sampleStackedData = [
          { breed: "Poodle", year: "2017", numberOfDogs: 7 },
          { breed: "Poodle", year: "2018", numberOfDogs: 2 },
          { breed: "Poodle", year: "2019", numberOfDogs: 3 },
          { breed: "Bulldog", year: "2017", numberOfDogs: 2 },
          { breed: "Bulldog", year: "2018", numberOfDogs: 5 },
          { breed: "Bulldog", year: "2019", numberOfDogs: 4 },
          { breed: "Terrier", year: "2017", numberOfDogs: 1 },
          { breed: "Terrier", year: "2018", numberOfDogs: 2 },
          { breed: "Terrier", year: "2019", numberOfDogs: 3 }
        ];
        const dataValue = text("Data value", "numberOfDogs", GROUP_IDS.DATA);
        const dataLabel = text("Data label", "year", GROUP_IDS.DATA);
        const dataSeriesKey = text(
          "Value to group data by",
          "breed",
          GROUP_IDS.DATA
        );
        const hundredPercentData = boolean(
          "Format data to 100%",
          false,
          GROUP_IDS.DATA
        );
        const data = object("Data", sampleStackedData, GROUP_IDS.DATA);
        const dataValueFormatter = getKeyNames(civicFormat);
        const optionSelectX = options(
          "X-axis value format",
          dataValueFormatter,
          "numeric",
          { display: "select" },
          GROUP_IDS.LABELS
        );
        const minimalist = boolean("Minimalist", false, GROUP_IDS.CUSTOM);
        const xLabel = text("X-axis label", "Number of Dogs", GROUP_IDS.LABELS);
        const yLabel = text("Y-axis label", "Year", GROUP_IDS.LABELS);
        const title = text("Title", "Number of Dogs", GROUP_IDS.LABELS);
        const subtitle = text("Subtitle", "By Year", GROUP_IDS.LABELS);
        const dogDataSeriesLabels = [
          { category: "Poodle", label: "Poodle" },
          { category: "Bulldog", label: "Bulldog" },
          { category: "Terrier", label: "Terrier" }
        ];
        const dataSeriesLabel = object(
          "Data series labels:",
          dogDataSeriesLabels,
          GROUP_IDS.DATA
        );

        return (
          <HorizontalBarChart
            data={data}
            dataValueFormatter={x => civicFormat[optionSelectX](x)}
            dataValue={dataValue}
            dataLabel={dataLabel}
            xLabel={xLabel}
            yLabel={yLabel}
            title={title}
            subtitle={subtitle}
            minimalist={minimalist}
            dataSeriesKey={dataSeriesKey}
            stacked
            hundredPercentData={hundredPercentData}
            dataSeriesLabel={dataSeriesLabel}
          />
        );
      },
      { notes }
    )
    .add(
      "Example: Grouped bar chart",
      () => {
        const sampleGroupedData = [
          { breed: "Poodle", year: "2017", numberOfDogs: 7 },
          { breed: "Poodle", year: "2018", numberOfDogs: 2 },
          { breed: "Poodle", year: "2019", numberOfDogs: 3 },
          { breed: "Bulldog", year: "2017", numberOfDogs: 2 },
          { breed: "Bulldog", year: "2018", numberOfDogs: 5 },
          { breed: "Bulldog", year: "2019", numberOfDogs: 4 }
        ];
        const dataValue = text("Data value", "numberOfDogs", GROUP_IDS.DATA);
        const dataLabel = text("Data label", "year", GROUP_IDS.DATA);
        const dataSeriesKey = text(
          "Value to group data by",
          "breed",
          GROUP_IDS.DATA
        );
        const hundredPercentData = boolean(
          "Format data to 100%",
          false,
          GROUP_IDS.DATA
        );
        const data = object("Data", sampleGroupedData, GROUP_IDS.DATA);
        const dataValueFormatter = getKeyNames(civicFormat);
        const optionSelectX = options(
          "X-axis value format",
          dataValueFormatter,
          "numeric",
          { display: "select" },
          GROUP_IDS.LABELS
        );
        const minimalist = boolean("Minimalist", false, GROUP_IDS.CUSTOM);
        const xLabel = text("X-axis label", "Number of Dogs", GROUP_IDS.LABELS);
        const yLabel = text("Y-axis label", "Year", GROUP_IDS.LABELS);
        const title = text("Title", "Number of Dogs", GROUP_IDS.LABELS);
        const subtitle = text("Subtitle", "By Year", GROUP_IDS.LABELS);
        const dogDataSeriesLabels = [
          { category: "Poodle", label: "Poodle" },
          { category: "Bulldog", label: "Bulldog" }
        ];
        const dataSeriesLabel = object(
          "Data series labels:",
          dogDataSeriesLabels,
          GROUP_IDS.DATA
        );

        return (
          <HorizontalBarChart
            data={data}
            dataValueFormatter={x => civicFormat[optionSelectX](x)}
            dataValue={dataValue}
            dataLabel={dataLabel}
            xLabel={xLabel}
            yLabel={yLabel}
            title={title}
            subtitle={subtitle}
            minimalist={minimalist}
            dataSeriesKey={dataSeriesKey}
            grouped
            hundredPercentData={hundredPercentData}
            dataSeriesLabel={dataSeriesLabel}
          />
        );
      },
      { notes }
    );
