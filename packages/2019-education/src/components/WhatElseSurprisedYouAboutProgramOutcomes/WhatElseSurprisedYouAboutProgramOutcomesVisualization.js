/** @jsx jsx */
import { jsx } from "@emotion/core";
import { LineChart, civicFormat } from "@hackoregon/component-library";
import DataCollaborativeVictoryTheme from "../../common/DataCollaborativeVictoryTheme";

const data = [
  { x: 2015, y: 0.02, type: "After School" },
  { x: 2016, y: 0.027, type: "After School" },
  { x: 2017, y: 0.033, type: "After School" },
  { x: 2018, y: 0.042, type: "After School" },
  { x: 2015, y: 0.035, type: "At School During Lunch" },
  { x: 2016, y: 0.042, type: "At School During Lunch" },
  { x: 2017, y: 0.048, type: "At School During Lunch" },
  { x: 2018, y: 0.1, type: "At School During Lunch" },
  { x: 2015, y: 0.04, type: "At Home During Breakfast" },
  { x: 2016, y: 0.055, type: "At Home During Breakfast" },
  { x: 2017, y: 0.09, type: "At Home During Breakfast" },
  { x: 2018, y: 0.13, type: "At Home During Breakfast" }
];

const WhatElseSurprisedYouAboutProgramOutcomesVisualization = () => (
  <LineChart
    title="Student Academic Growth: Context of Navigation Support"
    subtitle="Percentage RIT Score Gains, Participating Students, 2015-2018"
    xLabel="Year"
    yLabel="RIT Growth"
    data={data}
    dataSeries="type"
    xNumberFormatter={civicFormat.year}
    yNumberFormatter={civicFormat.percentage}
    dataLabelFormatter={civicFormat.percentage}
    theme={DataCollaborativeVictoryTheme}
  />
);

export default WhatElseSurprisedYouAboutProgramOutcomesVisualization;
