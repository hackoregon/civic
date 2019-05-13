import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";

import { withKnobs, text, object } from "@storybook/addon-knobs";
import { BarChart } from "../src";

const sampleSimpleData = [
  { x: 5, y: 20 },
  { x: 10, y: 30 },
  { x: 15, y: 50 },
  { x: 20, y: 40 }
];

export default () =>
  storiesOf("Component Lib|Charts/Bar Chart", module)
    .addDecorator(withKnobs)
    .add("Standard", () => <BarChart data={sampleSimpleData} />)
    .add("Custom", () => {
      const GROUP_IDS = {
        DATA: "Data",
        LABELS: "Labels"
      };
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
      const dataKey = text("Data key", "ye", GROUP_IDS.DATA);
      const dataValue = text("Data values", "population", GROUP_IDS.DATA);
      const xLabel = text("xLabel", "Year", GROUP_IDS.LABELS);
      const yLabel = text("yLabel", "Dogs", GROUP_IDS.LABELS);
      const title = text("title", "Dogs with Money", GROUP_IDS.LABELS);
      const subtitle = text(
        "subtitle",
        "Dogs in Portland with a net worth greater than $1,000",
        GROUP_IDS.LABELS
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
    });
