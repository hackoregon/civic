/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { BarChart, civicFormat } from "@hackoregon/component-library";
import DataCollaborativeVictoryTheme from "../../common/DataCollaborativeVictoryTheme";

const data = [
  { x: 5, y: 0.13, grade: 2 },
  { x: 10, y: 0.1, grade: 2 },
  { x: 15, y: 0.09, grade: 2 },
  { x: 5, y: 0.07, grade: 4 },
  { x: 10, y: 0.1, grade: 4 },
  { x: 15, y: 0.15, grade: 4 },
  { x: 5, y: 0.08, grade: 6 },
  { x: 10, y: 0.09, grade: 6 },
  { x: 15, y: 0.1, grade: 6 }
];

const WhatSurprisedYouAboutProgramOutcomesVisualization = () => (
  <div
    css={css`
      display: flex;
      flex-direction: "row";
      @media screen and (max-width: 640px) {
        flex-direction: column;
      }
    `}
  >
    <BarChart
      data={data}
      dataSeries="grade"
      theme={DataCollaborativeVictoryTheme}
      yNumberFormatter={civicFormat.percentage}
      xLabel="Hours Per Week"
      yLabel="RIT Score"
    />
  </div>
);

export default WhatSurprisedYouAboutProgramOutcomesVisualization;
