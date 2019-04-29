import React from "react";
import { css } from "emotion";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { object, text, boolean, withKnobs } from "@storybook/addon-knobs";
import { Scatterplot, SimpleLegend } from "../src";

const sampleData = [
  { x: 1, y: 2, series: "cat" },
  { x: 2, y: 3, series: "cat" },
  { x: 3, y: 5, series: "fish" },
  { x: 4, y: 4, series: "fish" },
  { x: 5, y: 7, series: "cat" },
  { x: 1, y: 3, series: "dog" },
  { x: 3, y: 3, series: "dog" }
];
const sampleDataSeries = "series";
const sampledataSeriesLabel = [
  { category: "cat", label: "Cat" },
  { category: "dog", label: "Dog" },
  { category: "fish", label: "Fish" }
];
const sampleDomain = { x: [0, 6], y: [0, 8] };
const sampleSize = { key: "y", minSize: 3, maxSize: 10 };
const sampleSubtitle = "A description of this chart.";
const sampleTitle = "Some title";
const sampleXKey = "x";
const sampleXLabel = "Number";
const sampleYKey = "y";
const sampleYLabel = "Rating";

const sampleUnstructuredData = [
  { size: 1, age: 2, type: "cat" },
  { size: 2, age: 3, type: "cat" },
  { size: 3, age: 5, type: "fish" },
  { size: 4, age: 4, type: "fish" },
  { size: 5, age: 7, type: "cat" },
  { size: 1, age: 3, type: "dog" },
  { size: 3, age: 3, type: "dog" }
];
const sampleUnstructuredXKey = "size";
const sampleUnstructuredYKey = "age";
const sampleUnstructuredDataSeries = "type";
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
  storiesOf("Charts/Scatterplot", module)
    .addDecorator(withKnobs)
    .add("Simple usage", () => <Scatterplot data={sampleData} />)
    .add("With some props", () => {
      const data = object("Data", sampleData);
      const dataKey = text("dataKey", sampleXKey);
      const dataValue = text("dataValue", sampleYKey);
      const dataSeries = text("dataSeries", sampleDataSeries);
      const subtitle = text("Subtitle", sampleSubtitle);
      const title = text("Title", sampleTitle);
      const xLabel = text("xLabel", sampleXLabel);
      const yLabel = text("yLabel", sampleYLabel);

      return (
        <Scatterplot
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
        <Scatterplot
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
      const dataValue = text("dataValue", sampleYKey);
      const dataSeries = text("dataSeries", sampleDataSeries);
      const dataSeriesLabel = object(
        "Data Series Labels",
        sampledataSeriesLabel
      );
      const size = object("Size", sampleSize);
      const subtitle = text("Subtitle", sampleSubtitle);
      const title = text("Title", sampleTitle);
      const xLabel = text("xLabel", sampleXLabel);
      const yLabel = text("yLabel", sampleYLabel);
      const invertX = boolean("invertX", false);
      const invertY = boolean("invertY", false);

      return (
        <Scatterplot
          data={data}
          dataKey={dataKey}
          dataValue={dataValue}
          dataSeries={dataSeries}
          dataSeriesLabel={dataSeriesLabel}
          domain={sampleDomain}
          size={size}
          subtitle={subtitle}
          title={title}
          xLabel={xLabel}
          yLabel={yLabel}
          invertX={invertX}
          invertY={invertY}
          legendComponent={customLegend}
        />
      );
    });
