import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import {
  withKnobs,
  text,
  object,
  boolean,
  select,
  optionsKnob as options
} from "@storybook/addon-knobs";
import { HorizontalBarChart, civicFormat } from "../src";
import { getKeyNames } from "./shared";
import notes from "./horizontalBarChart.notes.md";
import compareValues from "../src/utils/compareValues";

const GROUP_IDS = {
  LABELS: "Labels",
  DATA: "Data",
  CUSTOM: "Custom"
};

export default () =>
  storiesOf("Component Lib|Charts/Horizontal Bar Chart", module)
    .addDecorator(checkA11y)
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
        const sortBy = select(
          "Sort By: ",
          ["Ascending", "Descending"],
          "Descending",
          GROUP_IDS.DATA
        );
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
            sortBy={sortBy} // Take a compare function as a prop, default ascending. See dataValueFormatter
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
    );
