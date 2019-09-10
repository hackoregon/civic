/** @jsx jsx */
import { jsx } from "@emotion/core";
import { HorizontalBarChart, civicFormat } from "@hackoregon/component-library";
import DataCollaborativeVictoryTheme from "../../common/DataCollaborativeVictoryTheme";

const data = [
  { x: "Navigator (n=2)", y: 0.145, series: "Newcomers" },
  { x: "Navigator (n=2)", y: 0.132, series: "Non-newcomers" },
  { x: "Comparison (n=4)", y: 0.103, series: "Newcomers" },
  { x: "Comparison (n=4)", y: 0.127, series: "Non-newcomers" }
];

const DoProgramsLikeThisMatterAtPolicyLevelVisualization = () => (
  <HorizontalBarChart
    title="Navigator Program Policy Implications"
    subtitle="Improvement in RIT score, 2015 - 2018"
    data={data}
    dataLabel="x"
    dataValue="y"
    dataSeriesKey="series"
    dataSeriesLabel={[
      { category: "Newcomers", label: "Newcomers" },
      { category: "Non-newcomers", label: "Non-newcomers" }
    ]}
    dataValueFormatter={civicFormat.percentage}
    xLabel="RIT Score Improvement"
    yLabel="School Type"
    domain={{ y: [0, 0.2] }}
    theme={DataCollaborativeVictoryTheme}
    grouped
    annotations={[{ x: 0.14, y: 140, label: "Statewide Average" }]}
  />
);

export default DoProgramsLikeThisMatterAtPolicyLevelVisualization;
