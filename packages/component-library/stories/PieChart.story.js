import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  text,
  number,
  object,
  array,
  boolean
} from "@storybook/addon-knobs";
import { PieChart } from "../src";
import notes from "./pieChart.notes.md";

const GROUP_IDS = {
  LABELS: "Labels",
  DESIGN: "Design",
  DATA: "Data",
  CUSTOM: "Custom"
};

export default () =>
  storiesOf("Component Lib|Charts/Pie Chart", module)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const title = text("Title", "Contributor Breakdown", GROUP_IDS.LABELS);
        const subtitle = text(
          "Subtitle",
          "Contributions reported to ORESTAR by category",
          GROUP_IDS.LABELS
        );
        const halfDoughnut = boolean("Half doughnut", true, GROUP_IDS.DESIGN);
        const useLegend = boolean("Use legend", true, GROUP_IDS.DESIGN);
        const dataLabel = text("Data label", "x", GROUP_IDS.DATA);
        const dataValue = text("Data value", "y", GROUP_IDS.DATA);
        const sampleData = [
          { x: "Business entity", y: 35 },
          { x: "Individual", y: 40 },
          { x: "Labor organization", y: 55 },
          { x: "Other", y: 75 }
        ];
        const data = object("Data", sampleData, GROUP_IDS.DATA);

        return (
          <PieChart
            title={title}
            subtitle={subtitle}
            dataLabel={dataLabel}
            dataValue={dataValue}
            data={data}
            halfDoughnut={halfDoughnut}
            useLegend={useLegend}
          />
        );
      },
      { notes }
    )
    .add(
      "Custom",
      () => {
        const title = text("Title", "Contributor Breakdown", GROUP_IDS.LABELS);
        const subtitle = text(
          "Subtitle",
          "Contributions reported to ORESTAR by category",
          GROUP_IDS.LABELS
        );
        const useLegend = boolean("Use legend", true, GROUP_IDS.DESIGN);
        const halfDoughnut = boolean("Half doughnut", true, GROUP_IDS.DESIGN);
        const sampleData = [
          { contributor: "Business entity", amount: 35 },
          { contributor: "Individual", amount: 40 },
          { contributor: "Labor organization", amount: 55 },
          { contributor: "Other", amount: 75 }
        ];
        const dataLabel = text("Data label", "contributor", GROUP_IDS.DATA);
        const dataValue = text("Data value", "amount", GROUP_IDS.DATA);
        const data = object("Data", sampleData, GROUP_IDS.DATA);
        const chartHeight = number("Chart height", 350, {}, GROUP_IDS.CUSTOM);
        const chartWidth = number("Chart width", 650, {}, GROUP_IDS.CUSTOM);
        const innerRadius = number("Inner radius", 50, {}, GROUP_IDS.CUSTOM);
        const categoricalColors = [
          "#DC4556",
          "#1E62BD",
          "#19B7AA",
          "#721D7C",
          "#FFB226"
        ];
        const colors = array(
          "Colors",
          categoricalColors,
          ",",
          GROUP_IDS.CUSTOM
        );
        return (
          <PieChart
            title={title}
            subtitle={subtitle}
            dataLabel={dataLabel}
            dataValue={dataValue}
            data={data}
            colors={colors}
            width={chartWidth}
            height={chartHeight}
            innerRadius={innerRadius}
            halfDoughnut={halfDoughnut}
            useLegend={useLegend}
          />
        );
      },
      { notes }
    )
    .add(
      "Example: Simple",
      () => {
        const sampleSimpleData = [
          { x: "Business entity", y: 35 },
          { x: "Individual", y: 40 },
          { x: "Labor organization", y: 55 },
          { x: "Other", y: 75 }
        ];
        const data = object("Data", sampleSimpleData, GROUP_IDS.DATA);

        return <PieChart data={data} />;
      },
      { notes }
    );
