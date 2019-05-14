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
    .add("Standard", () => {
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
      const xLabel = text("X-axis", "Year", GROUP_IDS.LABELS);
      const yLabel = text("Y-axis", "Dogs", GROUP_IDS.LABELS);
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
    });
