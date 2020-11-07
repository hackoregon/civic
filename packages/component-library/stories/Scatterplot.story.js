/** @jsx jsx */
import { jsx, css } from "@emotion/core";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  object,
  text,
  boolean,
  withKnobs,
  optionsKnob as options
} from "@storybook/addon-knobs";
import { Scatterplot, SimpleLegend } from "../src";
import notes from "./scatterplot.notes.md";
import civicFormat from "../src/utils/civicFormat";
import { getKeyNames } from "./shared";
import { VictoryCrazyTheme, VictoryTheme } from "../src/_Themes/index";

const GROUP_IDS = {
  LABELS: "Labels",
  DATA: "Data",
  CUSTOM: "Custom"
};

const customLegend = (legendData, theme) => {
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
    <div css={legendContainer}>
      <SimpleLegend legendData={legendData} theme={theme} />
      <legend css={legendStyle}>
        <span
          css={css`
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
            css={css`
              margin-left: 5px;
            `}
          >
            Experience
          </span>
        </span>
      </legend>
    </div>
  );
};

export default () =>
  storiesOf("Component Lib/Charts/Scatterplot", module)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const sampleData = [
          { experience: 10.75, students: 22, series: "high" },
          { experience: 10.25, students: 24, series: "high" },
          { experience: 11, students: 26, series: "high" },
          { experience: 11.25, students: 25, series: "high" },
          { experience: 12, students: 25, series: "high" },
          { experience: 12.5, students: 12, series: "high" },
          { experience: 12.25, students: 26, series: "high" },
          { experience: 12.75, students: 27, series: "high" },
          { experience: 13, students: 27, series: "high" },
          { experience: 8, students: 25, series: "middle" },
          { experience: 10.25, students: 23, series: "middle" },
          { experience: 11, students: 28, series: "middle" },
          { experience: 12.15, students: 28, series: "middle" },
          { experience: 12.3, students: 23, series: "middle" },
          { experience: 13.4, students: 29, series: "middle" },
          { experience: 13.75, students: 28, series: "middle" },
          { experience: 14.5, students: 28, series: "middle" },
          { experience: 14.75, students: 27, series: "middle" },
          { experience: 16, students: 28, series: "middle" },
          { experience: 7, students: 21, series: "elementary" },
          { experience: 8.75, students: 23, series: "elementary" },
          { experience: 9, students: 21, series: "elementary" },
          { experience: 10.5, students: 26, series: "elementary" },
          { experience: 10, students: 24, series: "elementary" },
          { experience: 11.75, students: 23, series: "elementary" },
          { experience: 12.6, students: 19, series: "elementary" },
          { experience: 12.8, students: 22, series: "elementary" },
          { experience: 13.25, students: 23, series: "elementary" },
          { experience: 13.8, students: 26, series: "elementary" },
          { experience: 14, students: 24, series: "elementary" },
          { experience: 15, students: 22, series: "elementary" },
          { experience: 16, students: 25, series: "elementary" },
          { experience: 17, students: 25, series: "elementary" },
          { experience: 18, students: 26, series: "elementary" }
        ];

        const title = text(
          "Title",
          "Class Sizes and Teacher Experience",
          GROUP_IDS.LABELS
        );
        const subtitle = text(
          "Subtitle",
          "Average student / teacher ratio by average years of teacher experience - 2017",
          GROUP_IDS.LABELS
        );
        const xLabel = text("X-axis label", "Experience", GROUP_IDS.LABELS);
        const xFormatterOptions = getKeyNames(civicFormat);
        const optionSelectX = options(
          "X-axis value format",
          xFormatterOptions,
          "numeric",
          { display: "select" },
          GROUP_IDS.LABELS
        );
        const yLabel = text("Y-axis label", "Students", GROUP_IDS.LABELS);
        const yFormatterOptions = getKeyNames(civicFormat);
        const optionSelectY = options(
          "Y-axis value format",
          yFormatterOptions,
          "numeric",
          { display: "select" },
          GROUP_IDS.LABELS
        );
        const dataKey = text("Data key", "experience", GROUP_IDS.DATA);
        const dataValue = text("Data value", "students", GROUP_IDS.DATA);
        const dataSeries = text("Data series", "series", GROUP_IDS.DATA);
        const data = object("Data", sampleData, GROUP_IDS.DATA);

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
            xNumberFormatter={x => civicFormat[optionSelectX](x)}
            yNumberFormatter={y => civicFormat[optionSelectY](y)}
          />
        );
      },
      {
        notes
      }
    )
    .add(
      "Custom",
      () => {
        const sampleData = [
          { experience: 10.75, students: 22, series: "high" },
          { experience: 10.25, students: 24, series: "high" },
          { experience: 11, students: 26, series: "high" },
          { experience: 11.25, students: 25, series: "high" },
          { experience: 12, students: 25, series: "high" },
          { experience: 12.5, students: 12, series: "high" },
          { experience: 12.25, students: 26, series: "high" },
          { experience: 12.75, students: 27, series: "high" },
          { experience: 13, students: 27, series: "high" },
          { experience: 8, students: 25, series: "middle" },
          { experience: 10.25, students: 23, series: "middle" },
          { experience: 11, students: 28, series: "middle" },
          { experience: 12.15, students: 28, series: "middle" },
          { experience: 12.3, students: 23, series: "middle" },
          { experience: 13.4, students: 29, series: "middle" },
          { experience: 13.75, students: 28, series: "middle" },
          { experience: 14.5, students: 28, series: "middle" },
          { experience: 14.75, students: 27, series: "middle" },
          { experience: 16, students: 28, series: "middle" },
          { experience: 7, students: 21, series: "elementary" },
          { experience: 8.75, students: 23, series: "elementary" },
          { experience: 9, students: 21, series: "elementary" },
          { experience: 10.5, students: 26, series: "elementary" },
          { experience: 10, students: 24, series: "elementary" },
          { experience: 11.75, students: 23, series: "elementary" },
          { experience: 12.6, students: 19, series: "elementary" },
          { experience: 12.8, students: 22, series: "elementary" },
          { experience: 13.25, students: 23, series: "elementary" },
          { experience: 13.8, students: 26, series: "elementary" },
          { experience: 14, students: 24, series: "elementary" },
          { experience: 15, students: 22, series: "elementary" },
          { experience: 16, students: 25, series: "elementary" },
          { experience: 17, students: 25, series: "elementary" },
          { experience: 18, students: 26, series: "elementary" }
        ];
        const sampleDataSeriesLabel = [
          { category: "high", label: "High School" },
          { category: "middle", label: "Middle School" },
          { category: "elementary", label: "Elementary School" }
        ];

        const title = text(
          "Title",
          "Class Sizes and Teacher Experience",
          GROUP_IDS.LABELS
        );
        const subtitle = text(
          "Subtitle",
          "Average student / teacher ratio by average years of teacher experience - 2017",
          GROUP_IDS.LABELS
        );
        const xLabel = text("X-axis label", "Experience", GROUP_IDS.LABELS);
        const xFormatterOptions = getKeyNames(civicFormat);
        const optionSelectX = options(
          "X-axis value format",
          xFormatterOptions,
          "numeric",
          { display: "select" },
          GROUP_IDS.LABELS
        );
        const yLabel = text("Y-axis label", "Students", GROUP_IDS.LABELS);
        const yFormatterOptions = getKeyNames(civicFormat);
        const optionSelectY = options(
          "Y-axis value format",
          yFormatterOptions,
          "numeric",
          { display: "select" },
          GROUP_IDS.LABELS
        );

        const dataKey = text("Data key", "experience", GROUP_IDS.DATA);
        const dataValue = text("Data value", "students", GROUP_IDS.DATA);
        const dataSeries = text("Data series", "series", GROUP_IDS.DATA);
        const dataSeriesLabel = object(
          "Data Series Labels",
          sampleDataSeriesLabel,
          GROUP_IDS.DATA
        );
        const data = object("Data", sampleData, GROUP_IDS.DATA);

        const sampleSize = { key: "experience", minSize: 3, maxSize: 8 };
        const size = object("Size", sampleSize, GROUP_IDS.CUSTOM);
        const sampleDomain = { x: [5, 20], y: [10, 35] };
        const domain = object("Domain", sampleDomain, GROUP_IDS.CUSTOM);
        const invertX = boolean("Invert X", false, GROUP_IDS.CUSTOM);
        const invertY = boolean("Invert Y", false, GROUP_IDS.CUSTOM);
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
          <Scatterplot
            data={data}
            dataKey={dataKey}
            dataValue={dataValue}
            dataSeries={dataSeries}
            dataSeriesLabel={dataSeriesLabel}
            domain={domain}
            size={size}
            subtitle={subtitle}
            title={title}
            xLabel={xLabel}
            yLabel={yLabel}
            xNumberFormatter={x => civicFormat[optionSelectX](x)}
            yNumberFormatter={y => civicFormat[optionSelectY](y)}
            invertX={invertX}
            invertY={invertY}
            legendComponent={customLegend}
            theme={(name => themes[name])(theme)}
            loading={loading}
          />
        );
      },
      {
        notes
      }
    )
    .add(
      "Example: Simple",
      () => {
        const xLabel = text("X-axis label", "X", GROUP_IDS.LABELS);
        const yLabel = text("Y-axis label", "Y", GROUP_IDS.LABELS);
        const sampleSimpleData = [
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 },
          { x: 1, y: 3 },
          { x: 3, y: 3 }
        ];
        const data = object("Data", sampleSimpleData, GROUP_IDS.DATA);
        return <Scatterplot data={data} xLabel={xLabel} yLabel={yLabel} />;
      },
      {
        notes
      }
    )
    .add(
      "Example: With negative values",
      () => {
        const sampleData = [
          { x: -1.75, y: -1 },
          { x: -1.25, y: -7 },
          { x: -2.5, y: -2 },
          { x: -2.35, y: -7.5 },
          { x: -3, y: 2.5 },
          { x: -3.5, y: 1 },
          { x: -4.25, y: 3 },
          { x: -4.75, y: 3.5 },
          { x: 2.5, y: -3.5 },
          { x: 2, y: -2.5 },
          { x: 2.25, y: -4.5 },
          { x: 2.5, y: -2 },
          { x: 3.15, y: -9 },
          { x: 3.3, y: -6.25 },
          { x: 3.4, y: 3.5 },
          { x: 3.75, y: 3 },
          { x: 4.5, y: 3.5 },
          { x: 7.75, y: 10.5 },
          { x: 8, y: 5 },
          { x: 3.5, y: 10.5 },
          { x: 4.75, y: 11.5 },
          { x: 4.5, y: 10.75 },
          { x: 10.5, y: 26 },
          { x: 10, y: 24 },
          { x: 11.75, y: 23 },
          { x: 12.6, y: 19 },
          { x: 12.8, y: 22 },
          { x: 13.25, y: 23 },
          { x: 13.8, y: 26 },
          { x: 14, y: 24 },
          { x: 15, y: 22 },
          { x: 16, y: 25 },
          { x: 17, y: 25 },
          { x: 18, y: 26 }
        ];
        const xLabel = text("X-axis label", "X", GROUP_IDS.LABELS);
        const yLabel = text("Y-axis label", "Y", GROUP_IDS.LABELS);
        const data = object("Data", sampleData, GROUP_IDS.DATA);
        return <Scatterplot data={data} xLabel={xLabel} yLabel={yLabel} />;
      },
      {
        notes
      }
    );
