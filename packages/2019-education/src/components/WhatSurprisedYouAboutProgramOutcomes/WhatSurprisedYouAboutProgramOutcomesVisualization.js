/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BarChart, civicFormat } from "@hackoregon/component-library";
import DataCollaborativeVictoryTheme from "../../common/DataCollaborativeVictoryTheme";

const data = [
  { x: 3, y: 0.13, grade: "1st - 3rd graders" },
  { x: 6, y: 0.1, grade: "1st - 3rd graders" },
  { x: 9, y: 0.09, grade: "1st - 3rd graders" },
  { x: 3, y: 0.07, grade: "4th- 6th graders" },
  { x: 6, y: 0.1, grade: "4th- 6th graders" },
  { x: 9, y: 0.11, grade: "4th- 6th graders" }
];

const WhatSurprisedYouAboutProgramOutcomesVisualization = () => (
  <BarChart
    title="Student Academic Growth: Age & Program Intensity"
    subtitle="Percentage RIT Score Gains, Participating Students, 2015-2018"
    data={data}
    dataSeries="grade"
    theme={DataCollaborativeVictoryTheme}
    yNumberFormatter={civicFormat.percentage}
    xLabel="Hours Per Week"
    yLabel="RIT Growth"
    domain={{ x: [0, 11] }}
  />
);

export default WhatSurprisedYouAboutProgramOutcomesVisualization;
