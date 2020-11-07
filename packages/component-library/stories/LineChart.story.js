/** @jsx jsx */
import { jsx, css } from "@emotion/core";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  object,
  text,
  number,
  withKnobs,
  optionsKnob as options,
  boolean
} from "@storybook/addon-knobs";
import {
  LineChart,
  SimpleLegend,
  civicFormat,
  VictoryCrazyTheme,
  VictoryTheme
} from "../src";
import { getKeyNames } from "./shared";
import notes from "./lineChart.notes.md";

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
            Population
          </span>
        </span>
      </legend>
    </div>
  );
};

export default () =>
  storiesOf("Component Lib/Charts/Line Chart", module)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const sampleTransportationData = [
          { year: 2001, ridership: 217309, series: "weekday" },
          { year: 2002, ridership: 254651, series: "weekday" },
          { year: 2003, ridership: 213986, series: "weekday" },
          { year: 2004, ridership: 266412, series: "weekday" },
          { year: 2005, ridership: 313494, series: "weekday" },
          { year: 2001, ridership: 73028, series: "saturday" },
          { year: 2002, ridership: 113778, series: "saturday" },
          { year: 2003, ridership: 111636, series: "saturday" },
          { year: 2004, ridership: 155272, series: "saturday" },
          { year: 2005, ridership: 188757, series: "saturday" },
          { year: 2001, ridership: 73028, series: "sunday" },
          { year: 2002, ridership: 75042, series: "sunday" },
          { year: 2003, ridership: 75615, series: "sunday" },
          { year: 2004, ridership: 108040, series: "sunday" },
          { year: 2005, ridership: 134569, series: "sunday" }
        ];
        const sampleDataSeries = "series";

        const title = text(
          "Title",
          "Public Transit Ridership",
          GROUP_IDS.LABELS
        );
        const subtitle = text(
          "Subtitle",
          "Average daily ridership for TriMet bus and rail (unlinked trips)",
          GROUP_IDS.LABELS
        );
        const xLabel = text("X-axis label", "Year", GROUP_IDS.LABELS);
        const optionSelectX = options(
          "X-axis value format",
          xFormatterOptions,
          "year",
          { display: "select" },
          GROUP_IDS.LABELS
        );
        const yLabel = text("Y-axis label", "Ridership", GROUP_IDS.LABELS);
        const optionSelectY = options(
          "Y-axis value format",
          yFormatterOptions,
          "numeric",
          { display: "select" },
          GROUP_IDS.LABELS
        );

        const dataKey = text("Data key", "year", GROUP_IDS.DATA);
        const dataValue = text("Data values", "ridership", GROUP_IDS.DATA);
        const dataSeries = text(
          "Data series",
          sampleDataSeries,
          GROUP_IDS.DATA
        );
        const data = object("Data", sampleTransportationData, GROUP_IDS.DATA);

        return (
          <LineChart
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
      { notes }
    )
    .add(
      "Custom",
      () => {
        const sampleTransportationData = [
          { year: 2001, ridership: 217309, series: "weekday" },
          { year: 2002, ridership: 254651, series: "weekday" },
          { year: 2003, ridership: 213986, series: "weekday" },
          { year: 2004, ridership: 266412, series: "weekday" },
          { year: 2005, ridership: 313494, series: "weekday" },
          { year: 2001, ridership: 73028, series: "saturday" },
          { year: 2002, ridership: 113778, series: "saturday" },
          { year: 2003, ridership: 111636, series: "saturday" },
          { year: 2004, ridership: 155272, series: "saturday" },
          { year: 2005, ridership: 188757, series: "saturday" },
          { year: 2001, ridership: 73028, series: "sunday" },
          { year: 2002, ridership: 75042, series: "sunday" },
          { year: 2003, ridership: 75615, series: "sunday" },
          { year: 2004, ridership: 108040, series: "sunday" },
          { year: 2005, ridership: 134569, series: "sunday" }
        ];
        const sampleDataSeries = "series";
        const sampleDataSeriesLabel = [
          { category: "weekday", label: "Weekday" },
          { category: "saturday", label: "Saturday" },
          { category: "sunday", label: "Sunday" }
        ];
        const sampleDomain = { x: [2001, 2005], y: [0, 350000] };
        // const sampleSize = { key: "y" };

        const title = text(
          "Title",
          "Public Transit Ridership",
          GROUP_IDS.LABELS
        );
        const subtitle = text(
          "Subtitle",
          "Average daily ridership for TriMet bus and rail (unlinked trips)",
          GROUP_IDS.LABELS
        );
        const xLabel = text("X-axis label", "Year", GROUP_IDS.LABELS);
        const optionSelectX = options(
          "X-axis value format",
          xFormatterOptions,
          "year",
          { display: "select" },
          GROUP_IDS.LABELS
        );
        const yLabel = text("Y-axis label", "Ridership", GROUP_IDS.LABELS);
        const optionSelectY = options(
          "Y-axis value format",
          yFormatterOptions,
          "numeric",
          { display: "select" },
          GROUP_IDS.LABELS
        );
        const dataKey = text("Data key", "year", GROUP_IDS.DATA);
        const dataKeyLabel = text("Data key label", "Year", GROUP_IDS.CUSTOM);
        const dataValue = text("Data value", "ridership", GROUP_IDS.DATA);
        const dataValueLabel = text(
          "Data value label",
          "Avg Daily Ridership",
          GROUP_IDS.CUSTOM
        );
        const dataSeries = text(
          "Data series",
          sampleDataSeries,
          GROUP_IDS.DATA
        );
        const dataSeriesLabel = object(
          "Data series labels",
          sampleDataSeriesLabel,
          GROUP_IDS.DATA
        );
        const data = object("Data", sampleTransportationData, GROUP_IDS.DATA);

        const domain = object("Domain", sampleDomain, GROUP_IDS.CUSTOM);
        // A separate issue will be created for the size knob.
        // const size = object("Size", sampleSize, GROUP_IDS.CUSTOM);
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
          <LineChart
            data={data}
            dataKey={dataKey}
            dataKeyLabel={dataKeyLabel}
            dataValue={dataValue}
            dataValueLabel={dataValueLabel}
            dataSeries={dataSeries}
            dataSeriesLabel={dataSeriesLabel}
            domain={domain}
            // size={size}
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
        const xLabel = text("X-axis label", "X", GROUP_IDS.LABELS);
        const yLabel = text("Y-axis label", "Y", GROUP_IDS.LABELS);
        const sampleSimpleData = [
          { x: 0, y: 20 },
          { x: 10, y: 30 },
          { x: 20, y: 50 },
          { x: 30, y: 40 }
        ];
        const data = object("Data", sampleSimpleData, GROUP_IDS.DATA);

        return <LineChart data={data} xLabel={xLabel} yLabel={yLabel} />;
      },
      { notes }
    )
    .add(
      "Example: Many data points",
      () => {
        const scale = 0.25;
        const value = number("Number of data points", 100, {}, GROUP_IDS.DATA);
        return (
          <LineChart
            data={Array(value)
              .fill(null)
              .map((_, index) => {
                const x =
                  (index % 2 ? Math.floor(index / 2) : Math.ceil(index / 2)) *
                  scale;
                const fn = index % 2 ? "sin" : "cos";
                return {
                  x,
                  fn,
                  y: Math[fn](x)
                };
              })}
            dataKey="x"
            dataKeyLabel="X"
            dataValue="y"
            dataValueLabel="Y"
            dataSeries="fn"
            title="Cos vs. Sin"
            subtitle="Getting wavy"
            xLabel="X"
            yLabel="Y"
          />
        );
      },
      { notes }
    );
