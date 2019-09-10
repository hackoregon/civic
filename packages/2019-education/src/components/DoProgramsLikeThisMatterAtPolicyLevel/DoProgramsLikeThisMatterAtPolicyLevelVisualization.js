/** @jsx jsx */
import { jsx } from "@emotion/core";
import { HorizontalBarChart, civicFormat } from "@hackoregon/component-library";
import DataCollaborativeVictoryTheme from "../../common/DataCollaborativeVictoryTheme";

const data = [
  { x: "Navigator Schools", y: 0.145, series: "Newcomers" },
  { x: "Navigator Schools", y: 0.132, series: "Non-newcomers" },
  { x: "Comparison Schools", y: 0.103, series: "Newcomers" },
  { x: "Comparison Schools", y: 0.127, series: "Non-newcomers" }
];

const DoProgramsLikeThisMatterAtPolicyLevelVisualization = () => (
  <HorizontalBarChart
    data={data}
    dataLabel="x"
    dataValue="y"
    dataSeriesKey="series"
    dataSeriesLabel={[
      { category: "Newcomers", label: "Newcomers" },
      { category: "Non-newcomers", label: "Non-newcomers" }
    ]}
    dataValueFormatter={civicFormat.percentage}
    xLabel="Student Type"
    yLabel="RIT Score Improvement"
    domain={{ y: [0, 0.2] }}
    theme={DataCollaborativeVictoryTheme}
    grouped
  />
);

export default DoProgramsLikeThisMatterAtPolicyLevelVisualization;
