/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BarChart, civicFormat } from "@hackoregon/component-library";
import DataCollaborativeVictoryTheme from "../../common/DataCollaborativeVictoryTheme";

const data = [
  { x: 5, y: 0.13, grade: "1st - 3rd graders" },
  { x: 10, y: 0.1, grade: "1st - 3rd graders" },
  { x: 15, y: 0.09, grade: "1st - 3rd graders" },
  { x: 5, y: 0.07, grade: "4th- 6th graders" },
  { x: 10, y: 0.1, grade: "4th- 6th graders" },
  { x: 15, y: 0.11, grade: "4th- 6th graders" }
];

const WhatSurprisedYouAboutProgramOutcomesVisualization = () => (
  <BarChart
    title="In What Circumstances Does It Work Better Or Worse?"
    subtitle="RIT score improvement by Navigation hours and grade"
    data={data}
    dataSeries="grade"
    theme={DataCollaborativeVictoryTheme}
    yNumberFormatter={civicFormat.percentage}
    xLabel="Hours Per Week"
    yLabel="Improvement in RIT Score"
    domain={{ x: [0, 20] }}
  />
);

export default WhatSurprisedYouAboutProgramOutcomesVisualization;
