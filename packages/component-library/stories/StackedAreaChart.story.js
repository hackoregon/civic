/** @jsx jsx */
import { jsx, css } from "@emotion/core";

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  object,
  text,
  withKnobs,
  optionsKnob as options,
  boolean
} from "@storybook/addon-knobs";
import { StackedAreaChart, civicFormat, SimpleLegend } from "../src";
import { getKeyNames } from "./shared";
import notes from "./stackedAreaChart.notes.md";
import { VictoryCrazyTheme, VictoryTheme } from "../src/_Themes/index";

const GROUP_IDS = {
  LABELS: "Labels",
  DATA: "Data",
  CUSTOM: "Custom"
};

const xFormatterOptions = getKeyNames(civicFormat);
const yFormatterOptions = getKeyNames(civicFormat);

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
            Students
          </span>
        </span>
      </legend>
    </div>
  );
};

export default () =>
  storiesOf("Component Lib/Charts/Stacked Area Chart", module)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const sampleEnrollmentData = [
          { year: 2005, students: 34, group: "BAA" },
          { year: 2006, students: 28, group: "BAA" },
          { year: 2007, students: 17, group: "BAA" },
          { year: 2008, students: 18, group: "BAA" },
          { year: 2009, students: 14, group: "BAA" },
          { year: 2010, students: 23, group: "BAA" },
          { year: 2011, students: 21, group: "BAA" },
          { year: 2012, students: 17, group: "BAA" },
          { year: 2013, students: 19, group: "BAA" },
          { year: 2014, students: 16, group: "BAA" },

          { year: 2005, students: 34, group: "HIS" },
          { year: 2006, students: 28, group: "HIS" },
          { year: 2007, students: 24, group: "HIS" },
          { year: 2008, students: 24, group: "HIS" },
          { year: 2009, students: 37, group: "HIS" },
          { year: 2010, students: 37, group: "HIS" },
          { year: 2011, students: 44, group: "HIS" },
          { year: 2012, students: 42, group: "HIS" },
          { year: 2013, students: 48, group: "HIS" },
          { year: 2014, students: 45, group: "HIS" },

          { year: 2005, students: 0, group: "MULTI" },
          { year: 2006, students: 0, group: "MULTI" },
          { year: 2007, students: 28, group: "MULTI" },
          { year: 2008, students: 41, group: "MULTI" },
          { year: 2009, students: 23, group: "MULTI" },
          { year: 2010, students: 42, group: "MULTI" },
          { year: 2011, students: 54, group: "MULTI" },
          { year: 2012, students: 55, group: "MULTI" },
          { year: 2013, students: 56, group: "MULTI" },
          { year: 2014, students: 59, group: "MULTI" }
        ];
        const enrollmentDataSeries = "group";
        const enrollmentDataSeriesLabels = [
          { category: "BAA", label: "Black/African American" },
          { category: "HIS", label: "Hispanic/Latino" },
          { category: "MULTI", label: "Multi-Ethnic" }
        ];
        const title = text(
          "Title:",
          "Students from Historically Underrepresented Groups",
          GROUP_IDS.LABELS
        );
        const subtitle = text(
          "Subtitle",
          "Fall enrollment in Portland Public Schools - Buckman, using selected Census categories",
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
          "numeric",
          { display: "select" },
          GROUP_IDS.LABELS
        );

        const dataKey = text("Data key", "year", GROUP_IDS.DATA);
        const dataValue = text("Data value", "students", GROUP_IDS.DATA);
        const dataSeries = text(
          "Data series",
          enrollmentDataSeries,
          GROUP_IDS.DATA
        );
        const dataSeriesLabel = object(
          "Data series labels:",
          enrollmentDataSeriesLabels,
          GROUP_IDS.DATA
        );
        const data = object("Data", sampleEnrollmentData, GROUP_IDS.DATA);

        return (
          <StackedAreaChart
            data={data}
            dataKey={dataKey}
            dataValue={dataValue}
            dataSeries={dataSeries}
            dataSeriesLabel={dataSeriesLabel}
            subtitle={subtitle}
            title={title}
            xLabel={xLabel}
            yLabel={yLabel}
            xNumberFormatter={x => civicFormat[optionSelectX](x)}
            yNumberFormatter={y => civicFormat[optionSelectY](y)}
          />
        );
      },
      { notes }
    )
    .add(
      "Custom",
      () => {
        const sampleEnrollmentData = [
          { year: 2005, students: 34, group: "BAA" },
          { year: 2006, students: 28, group: "BAA" },
          { year: 2007, students: 17, group: "BAA" },
          { year: 2008, students: 18, group: "BAA" },
          { year: 2009, students: 14, group: "BAA" },
          { year: 2010, students: 23, group: "BAA" },
          { year: 2011, students: 21, group: "BAA" },
          { year: 2012, students: 17, group: "BAA" },
          { year: 2013, students: 19, group: "BAA" },
          { year: 2014, students: 16, group: "BAA" },

          { year: 2005, students: 34, group: "HIS" },
          { year: 2006, students: 28, group: "HIS" },
          { year: 2007, students: 24, group: "HIS" },
          { year: 2008, students: 24, group: "HIS" },
          { year: 2009, students: 37, group: "HIS" },
          { year: 2010, students: 37, group: "HIS" },
          { year: 2011, students: 44, group: "HIS" },
          { year: 2012, students: 42, group: "HIS" },
          { year: 2013, students: 48, group: "HIS" },
          { year: 2014, students: 45, group: "HIS" },

          { year: 2005, students: 0, group: "MULTI" },
          { year: 2006, students: 0, group: "MULTI" },
          { year: 2007, students: 28, group: "MULTI" },
          { year: 2008, students: 41, group: "MULTI" },
          { year: 2009, students: 23, group: "MULTI" },
          { year: 2010, students: 42, group: "MULTI" },
          { year: 2011, students: 54, group: "MULTI" },
          { year: 2012, students: 55, group: "MULTI" },
          { year: 2013, students: 56, group: "MULTI" },
          { year: 2014, students: 59, group: "MULTI" }
        ];
        const enrollmentDataSeries = "group";
        const enrollmentDataSeriesLabels = [
          { category: "BAA", label: "Black/African American" },
          { category: "HIS", label: "Hispanic/Latino" },
          { category: "MULTI", label: "Multi-Ethnic" }
        ];
        const sampleDomain = { x: [2005, 2014], y: [0, 125] };
        // const sampleSize = { key: "y" };

        const title = text(
          "Title:",
          "Students from Historically Underrepresented Groups",
          GROUP_IDS.LABELS
        );
        const subtitle = text(
          "Subtitle",
          "Fall enrollment in Portland Public Schools - Buckman, using selected Census categories",
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
          "numeric",
          { display: "select" },
          GROUP_IDS.LABELS
        );

        const dataKey = text("Data key", "year", GROUP_IDS.DATA);
        const dataValue = text("Data value", "students", GROUP_IDS.DATA);
        const dataSeries = text(
          "Data series",
          enrollmentDataSeries,
          GROUP_IDS.DATA
        );
        const dataSeriesLabel = object(
          "Data series labels:",
          enrollmentDataSeriesLabels,
          GROUP_IDS.DATA
        );
        const data = object("Data", sampleEnrollmentData, GROUP_IDS.DATA);

        const domain = object("Domain", sampleDomain, GROUP_IDS.CUSTOM);

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
          <StackedAreaChart
            data={data}
            dataKey={dataKey}
            dataValue={dataValue}
            dataSeries={dataSeries}
            dataSeriesLabel={dataSeriesLabel}
            domain={domain}
            subtitle={subtitle}
            title={title}
            xLabel={xLabel}
            yLabel={yLabel}
            xNumberFormatter={x => civicFormat[optionSelectX](x)}
            yNumberFormatter={y => civicFormat[optionSelectY](y)}
            legendComponent={customLegend}
            theme={(name => themes[name])(theme)}
            loading={loading}
          />
        );
      },
      { notes }
    )
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

        return <StackedAreaChart data={data} xLabel={xLabel} yLabel={yLabel} />;
      },
      { notes }
    );
