/** @jsx jsx */
import { jsx } from "@emotion/core";
import { LineChart, civicFormat } from "@hackoregon/component-library";
import DataCollaborativeVictoryTheme from "../../common/DataCollaborativeVictoryTheme";

const data = [
  { x: 2015, y: 0.049, type: "Participants" },
  { x: 2016, y: 0.068, type: "Participants" },
  { x: 2017, y: 0.081, type: "Participants" },
  { x: 2018, y: 0.13, type: "Participants" },
  { x: 2015, y: 0.08, type: "Non-Participants" },
  { x: 2016, y: 0.09, type: "Non-Participants" },
  { x: 2017, y: 0.11, type: "Non-Participants" },
  { x: 2018, y: 0.12, type: "Non-Participants" }
];

const IsThereEvidenceTheProgramWorkedVisualization = () => (
  <LineChart
    title="Navigator Program Participant Achievement Growth"
    subtitle="Annual RIT score improvement, 2015 cohort -- All Schools"
    xLabel="Year"
    yLabel="RIT Growth"
    data={data}
    dataSeries="type"
    xNumberFormatter={civicFormat.year}
    yNumberFormatter={civicFormat.percentage}
    theme={DataCollaborativeVictoryTheme}
  />
);

export default IsThereEvidenceTheProgramWorkedVisualization;