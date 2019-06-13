import React from "react";
import { css } from "emotion";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  object,
  text,
  withKnobs,
  optionsKnob as options
} from "@storybook/addon-knobs";
import { StackedAreaChart, SimpleLegend, civicFormat } from "../src";
import notes from "./stackedAreaChart.notes.md";

const GROUP_IDS = {
  LABELS: "Labels",
  DATA: "Data",
  CUSTOM: "Custom"
};

const xFormatterOptions = getKeyNames(civicFormat);
const yFormatterOptions = getKeyNames(civicFormat);

const sampleData = [
  { x: 0, y: 2, series: "cat" },
  { x: 1, y: 3, series: "cat" },
  { x: 2, y: 5, series: "cat" },
  { x: 3, y: 4, series: "cat" },
  { x: 4, y: 7, series: "cat" },
  { x: 0, y: 4, series: "dog" },
  { x: 1, y: 5, series: "dog" },
  { x: 2, y: 2, series: "dog" },
  { x: 3, y: 3, series: "dog" },
  { x: 4, y: 4, series: "dog" }
];
const sampleDataSeries = "series";
const sampledataSeriesLabel = [
  { category: "cat", label: "Cat" },
  { category: "dog", label: "Dog" }
];
const sampleDomain = { x: [0, 6], y: [0, 8] };
const sampleSize = { key: "y" };
const sampleSubtitle = "A description of this chart.";
const sampleTitle = "Some title";
const sampleXKey = "x";
const sampleXLabel = "Number of animals";
const sampleYKey = "y";
const sampleYLabel = "Cuteness rating";
const sampleDataKeyLabel = "Animals";
const sampleDataValueLabel = "Cuteness";

const sampleUnstructuredData = [
  { size: 0, age: 2000000, group: "cat" },
  { size: 5, age: 3000000, group: "cat" },
  { size: 10, age: 7000000, group: "cat" },
  { size: 0, age: 5000320, group: "fish" },
  { size: 5, age: 40002300, group: "fish" },
  { size: 10, age: 5007000, group: "fish" },
  { size: 0, age: 3000000, group: "dog" },
  { size: 5, age: 3000500, group: "dog" },
  { size: 10, age: 3000000.5, group: "dog" }
];
const sampleUnstructuredXKey = "year";
const sampleUnstructuredYKey = "students";
const sampleUnstructuredDataSeries = "group";
const sampleUnstructuredXLabel = "Size (ft)";
const sampleUnstructuredYLabel = "Age (yrs)";

const customLegend = legendData => {
  const legendStyle = css`
    font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0 0 0;
  `;

  const legendContainer = css`
    display: flex;
    width: 100%;
    justify-content: center;
  `;

  return (
    <div className={legendContainer}>
      <SimpleLegend legendData={legendData} />
      <legend className={legendStyle}>
        <span
          className={css`
            margin-left: 5px;
          `}
        >
          <svg viewBox="0 0 50 10" width="50px">
            <circle cx="5" cy="5" r="1" />
            <circle cx="15" cy="5" r="2" />
            <circle cx="25" cy="5" r="3" />
            <circle cx="35" cy="5" r="4" />
            <circle cx="45" cy="5" r="5" />
          </svg>
          <span
            className={css`
              margin-left: 5px;
            `}
          >
            Population
          </span>
        </span>
      </legend>
    </div>
  );
};

export default () =>
  storiesOf("Component Lib|Charts/Stacked Area Chart", module)
    .addDecorator(withKnobs)
    .add("Standard", () => {
      const title = text(
        "Title:",
        "Students from Historically Underrepresented Groups",
        GROUP_IDS.LABELS
      );
      const subtitle = text(
        "Subtitle",
        "Fall enrollment in Portland Public Schools - Buckman",
        GROUP_IDS.LABELS
      );
      const xLabel = text("X-axis label:", "Year", GROUP_IDS.LABELS);
      const optionSelectX = options(
        "X-axis value format",
        xFormatterOptions,
        "year",
        { display: "select" },
        GROUP_IDS.LABELS
      );
      const yLabel = text("Y-axis label:", "Students", GROUP_IDS.LABELS);
      const optionSelectY = options(
        "Y-axis value format",
        yFormatterOptions,
        "students",
        { display: "select" },
        GROUP_IDS.LABELS
      );
      const sampleEnrollmentData = [
        { year: 0, students: 2000000, group: "cat" },
        { year: 5, students: 3000000, group: "cat" },
        { year: 10, students: 7000000, group: "cat" },
        { year: 0, students: 5000320, group: "fish" },
        { year: 5, students: 40002300, group: "fish" },
        { year: 10, students: 5007000, group: "fish" },
        { year: 0, students: 3000000, group: "dog" },
        { year: 5, students: 3000500, group: "dog" },
        { year: 10, students: 3000000.5, group: "dog" }
      ];
      // const sampleUnstructuredXKey = "year";
      // const sampleUnstructuredYKey = "students";
      // const sampleUnstructuredDataSeries = "group";
      const dataKey = text("dataKey", "year", GROUP_IDS.DATA);
      const dataValue = text("dataValue", "students", GROUP_IDS.DATA);
      const dataSeries = text("dataSeries", "group", GROUP_IDS.DATA);
      const data = object("Data", sampleEnrollmentData, GROUP_IDS.DATA);

      return (
        <StackedAreaChart
          data={data}
          dataKey={dataKey}
          dataValue={dataValue}
          dataSeries={dataSeries}
          subtitle={subtitle}
          title={title}
          xLabel={xLabel}
          yLabel={yLabel}
          xNumberFormatter={x => civicFormat[optionSelectX](x)}
          yNumberFormatter={y => civicFormat[optionSelectY](y)}
        />
      );
    })
    .add("With some props and unstructured data", () => {
      const data = object("Data", sampleUnstructuredData);
      const dataKey = text("dataKey", sampleUnstructuredXKey);
      const dataValue = text("dataValue", sampleUnstructuredYKey);
      const dataSeries = text("dataSeries", sampleUnstructuredDataSeries);
      const subtitle = text("Subtitle", sampleSubtitle);
      const title = text("Title", sampleTitle);
      const xLabel = text("xLabel", sampleUnstructuredXLabel);
      const yLabel = text("yLabel", sampleUnstructuredYLabel);

      return (
        <StackedAreaChart
          data={data}
          dataKey={dataKey}
          dataValue={dataValue}
          dataSeries={dataSeries}
          subtitle={subtitle}
          title={title}
          xLabel={xLabel}
          yLabel={yLabel}
        />
      );
    })
    .add("With more optional props", () => {
      const data = object("Data", sampleData);
      const dataKey = text("dataKey", sampleXKey);
      const dataKeyLabel = text("dataKeyLabel", sampleDataKeyLabel);
      const dataValue = text("dataValue", sampleYKey);
      const dataValueLabel = text("dataValueLabel", sampleDataValueLabel);
      const dataSeries = text("dataSeries", sampleDataSeries);
      const dataSeriesLabel = object(
        "Data Series Labels",
        sampledataSeriesLabel
      );
      const domain = object("Domain", sampleDomain);
      const size = object("Size", sampleSize);
      const subtitle = text("Subtitle", sampleSubtitle);
      const title = text("Title", sampleTitle);
      const xLabel = text("xLabel", sampleXLabel);
      const yLabel = text("yLabel", sampleYLabel);

      return (
        <StackedAreaChart
          data={data}
          dataKey={dataKey}
          dataKeyLabel={dataKeyLabel}
          dataValue={dataValue}
          dataValueLabel={dataValueLabel}
          dataSeries={dataSeries}
          dataSeriesLabel={dataSeriesLabel}
          domain={domain}
          size={size}
          subtitle={subtitle}
          title={title}
          xLabel={xLabel}
          yLabel={yLabel}
          legendComponent={customLegend}
        />
      );
    })
    .add(
      "Example: Simple",
      () => {
        const xLabel = text("X-axis label:", "X", GROUP_IDS.LABELS);
        const yLabel = text("Y-axis label:", "Y", GROUP_IDS.LABELS);
        const sampleSimpleData = [
          { x: 0, y: 20 },
          { x: 10, y: 30 },
          { x: 20, y: 50 },
          { x: 30, y: 40 }
        ];
        const data = object("Data", sampleSimpleData, GROUP_IDS.DATA);

        return <StackedAreaChart data={data} />;
      },
      { notes }
    );
