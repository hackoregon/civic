import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import { HorizontalBarChart, civicFormat } from "../src";
import notes from "./horizontalBarChart.notes.md";

export default () =>
  storiesOf("Component Lib|Charts/Horizontal Bar Chart", module)
    .addDecorator(checkA11y)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const sampleData = [
          { sortOrder: 1, population: 2000, label: "Labrador Retriever" },
          { sortOrder: 2, population: 8000, label: "Standard Poodle" },
          { sortOrder: 3, population: 6000, label: "French Bulldog" },
          { sortOrder: 4, population: 3000, label: "Afghan Hound" },
          { sortOrder: 5, population: 1000, label: "Jack Russell Terrier" }
        ];
        const GROUP_IDS = {
          LABELS: "Labels",
          DATA: "Data"
        };
        const title = text("Title", "Dogs and their Money", GROUP_IDS.LABELS);
        const subtitle = text(
          "Subtitle",
          "As of January 2017",
          GROUP_IDS.LABELS
        );
        const xLabel = text("X-axis label", "Dollars", GROUP_IDS.LABELS);
        const yLabel = text("Y-axis label", "Dogs", GROUP_IDS.LABELS);
        const sortOrder = text("Data series", "sortOrder", GROUP_IDS.DATA);
        const dataValue = text("Data value", "population", GROUP_IDS.DATA);
        const dataLabel = text("Data label", "label", GROUP_IDS.DATA);
        const data = object("Data", sampleData, GROUP_IDS.DATA);

        return (
          <HorizontalBarChart
            data={data}
            sortOrder={sortOrder}
            dataValue={dataValue}
            dataLabel={dataLabel}
            title={title}
            subtitle={subtitle}
            xLabel={xLabel}
            yLabel={yLabel}
          />
        );
      },
      { notes }
    )
    .add(
      "Default sort order",
      () => {
        const sampleUnsortedData = [
          { population: 2000, label: "Labrador Retriever" },
          { population: 8000, label: "Standard Poodle" },
          { population: 6000, label: "French Bulldog" },
          { population: 3000, label: "Afghan Hound" },
          { population: 1000, label: "Jack Russell Terrier" }
        ];
        const data = object("Data", sampleUnsortedData);
        const dataValue = text("Data values", "population");
        const dataLabel = text("Data series labels", "label");

        return (
          <HorizontalBarChart
            data={data}
            dataValue={dataValue}
            dataLabel={dataLabel}
          />
        );
      },
      { notes }
    )
    .add(
      "No title",
      () => {
        const sampleData = [
          { sortOrder: 1, population: 2000, label: "Labrador Retriever" },
          { sortOrder: 2, population: 8000, label: "Standard Poodle" },
          { sortOrder: 3, population: 6000, label: "French Bulldog" },
          { sortOrder: 4, population: 3000, label: "Afghan Hound" },
          { sortOrder: 5, population: 1000, label: "Jack Russell Terrier" }
        ];
        const data = object("Data", sampleData);
        const sortOrder = text("Data series", "sortOrder");
        const dataValue = text("Data values", "population");
        const dataLabel = text("Data series labels", "label");

        return (
          <HorizontalBarChart
            data={data}
            sortOrder={sortOrder}
            dataValue={dataValue}
            dataLabel={dataLabel}
          />
        );
      },
      { notes }
    )
    .add(
      "Minimalist",
      () => {
        const sampleMinimalistData = [
          { sortOrder: 1, population: 2000, label: "Labrador Retriever" },
          { sortOrder: 2, population: 8000, label: "Standard Poodle" }
        ];
        const data = object("Data", sampleMinimalistData);
        const sortOrder = text("Data series", "sortOrder");
        const dataValue = text("Data values", "population");
        const dataLabel = text("Data series labels", "label");

        return (
          <HorizontalBarChart
            data={data}
            sortOrder={sortOrder}
            dataValue={dataValue}
            dataLabel={dataLabel}
            minimalist
          />
        );
      },
      { notes }
    )
    .add(
      "With negative values",
      () => {
        const data = object("Data", [
          { delta: 0.1, label: "Labrador Retriever" },
          { delta: 0.3, label: "Standard Poodle" },
          { delta: -0.1, label: "French Bulldog" },
          { delta: -0.2, label: "Afghan Hound" },
          { delta: 0.0, label: "Jack Russell Terrier" }
        ]);
        const dataValue = text("Data value", "delta");
        const dataLabel = text("Data series labels", "label");
        const xLabel = text("xLabel", "% Change in Population");
        const yLabel = text("yLabel", "Breed");

        return (
          <HorizontalBarChart
            data={data}
            dataValue={dataValue}
            dataLabel={dataLabel}
            title="Dogs and their Money"
            subtitle="As of January 2017"
            xLabel={xLabel}
            yLabel={yLabel}
            dataValueFormatter={civicFormat.percentage}
          />
        );
      },
      { notes }
    );
