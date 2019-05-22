import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import civicFormat from "../src/utils/civicFormat";

import {
  withKnobs,
  text,
  object,
  boolean,
  number,
  optionsKnob as options
} from "@storybook/addon-knobs";
import notes from "./barchart.notes.md";
import { BarChart } from "../src";

export default () =>
  storiesOf("Component Lib|Charts/Bar Chart", module)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const GROUP_IDS = {
          LABELS: "Labels",
          DATA: "Data"
        };
        const title = text("Title", "Dogs with Money", GROUP_IDS.LABELS);
        const subtitle = text(
          "Subtitle",
          "Dogs in Portland with a net worth greater than $1,000",
          GROUP_IDS.LABELS
        );
        const xLabel = text("X-axis label", "Year", GROUP_IDS.LABELS);
        const yLabel = text("Y-axis label", "Dogs", GROUP_IDS.LABELS);
        const dataKey = text("Data key", "ye", GROUP_IDS.DATA);
        const dataValue = text("Data values", "population", GROUP_IDS.DATA);
        const data = object(
          "Data",
          [
            { ye: 1994, population: 2000 },
            { ye: 1995, population: 8000 },
            { ye: 1996, population: 6000 },
            { ye: 1997, population: 3000 },
            { ye: 1998, population: 1000 }
          ],
          GROUP_IDS.DATA
        );
        return (
          <BarChart
            data={data}
            dataKey={dataKey}
            dataValue={dataValue}
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
      "Custom",
      () => {
        const GROUP_IDS = {
          LABELS: "Labels",
          DATA: "Data",
          CUSTOM: "Custom"
        };
        const title = text("Title", "Dogs with Money", GROUP_IDS.LABELS);
        const subtitle = text(
          "Subtitle",
          "Dogs in Portland with a net worth greater than $1,000",
          GROUP_IDS.LABELS
        );
        const xLabel = text("X-axis label", "Year", GROUP_IDS.LABELS);
        const yLabel = text("Y-axis label", "Dogs", GROUP_IDS.LABELS);
        const dataKey = text("Data key", "ye", GROUP_IDS.DATA);
        const dataValue = text("Data values", "population", GROUP_IDS.DATA);
        const data = object(
          "Data",
          [
            { ye: 1994, population: 2000 },
            { ye: 1995, population: 8000 },
            { ye: 1996, population: 6000 },
            { ye: 1997, population: 3000 },
            { ye: 1998, population: 1000 }
          ],
          GROUP_IDS.DATA
        );
        const barWidth = number("Bar width", 37, {}, GROUP_IDS.CUSTOM);
        const loading = boolean("Loading...", false, GROUP_IDS.CUSTOM);
        const error = boolean("Error", false, GROUP_IDS.CUSTOM);
        const getKeys = obj => {
          const allKeys = Object.keys(obj);
          let keyObject = {};
          allKeys.forEach(item => (keyObject[item] = item));
          return keyObject;
        };
        const xFormatterOptions = getKeys(civicFormat);
        const yFormatterOptions = getKeys(civicFormat);
        const optionRadioX = options(
          "Data key format",
          xFormatterOptions,
          "year",
          { display: "radio" },
          GROUP_IDS.CUSTOM
        );
        const optionRadioY = options(
          "Data format",
          yFormatterOptions,
          "numeric",
          { display: "radio" },
          GROUP_IDS.CUSTOM
        );

        return (
          <BarChart
            data={data}
            dataKey={dataKey}
            dataValue={dataValue}
            title={title}
            subtitle={subtitle}
            xLabel={xLabel}
            yLabel={yLabel}
            barWidth={barWidth}
            loading={loading}
            error={error}
            xNumberFormatter={x => civicFormat[optionRadioX](x)}
            yNumberFormatter={y => civicFormat[optionRadioY](y)}
          />
        );
      },
      { notes }
    );
