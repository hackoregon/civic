import { useState } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { scaleOrdinal } from "d3";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import {
  BaseMap,
  ChartContainer,
  MapOverlay,
  MapTooltip,
  RadioButtonGroup
} from "@hackoregon/component-library";
import TempLoader from "../TempLoader/TempLoader";

const RACE_LABEL_MAP = {
  black: "Black",
  white: "White",
  hisp: "Hispanic or Latino",
  aian: "Native American",
  api: "Asian/Pacific Islander",
  multi: "Multiple Races"
};

const LABEL_RACE_MAP = {
  // "Readable Name": "abbreviation"
  Black: "black",
  White: "white",
  "Hispanic or Latino": "hisp",
  "Native American": "aian",
  "Asian/Pacific Islander": "api",
  "Multiple Races": "multi"
};

const HomeLoanApprovalsVisualization = ({ isLoading, data }) => {
  const [race, setRace] = useState("black");

  if (isLoading) return <TempLoader />;

  const polygonFieldName = `lq_${race}_brks`;
  const totalLoans = data.totalLoans.value.results.features;
  const colorScale = scaleOrdinal()
    .domain([
      null,
      "Not represented (< 0.50)",
      "Under-represented (0.50 - 0.84)",
      "Acceptable range (0.85-1.14)",
      "Slightly over-represented (1.15-1.49)",
      "Over-represented (1.50-3.00)"
    ])
    .range([
      // Nulls are a more translarent gray
      [200, 200, 200],
      // Color-blind safe diverging color scale from ColorBrewer
      [166, 97, 26],
      [223, 194, 125],
      [255, 255, 255],
      [128, 205, 193],
      [1, 133, 113]
    ]);

  return (
    data && (
      <span>
        <strong style={{ color: "crimson" }}>
          Visualization TODO:
          <ul>
            <li>Add a map legend once they exist</li>
            <li>Add a second map with updated data</li>
            <li>Update Tooltip labeling</li>
          </ul>
        </strong>
        <div
          css={css`
            display: flex;
          `}
        >
          <div
            css={css`
              width: 75%;
            `}
          >
            <ChartContainer
              title="Home Loan Approval Rates by Race"
              subtitle="Comparing Tract-Level Approval Rates to the Share of Existing Homeowners of Color"
            >
              <BaseMap initialZoom={9.9} updateViewport>
                <MapOverlay
                  data={totalLoans}
                  getFillColor={f => colorScale(f.properties[polygonFieldName])}
                  onLayerClick={() => {}}
                  opacity={0.25}
                >
                  <MapTooltip
                    primaryName={RACE_LABEL_MAP[race]}
                    primaryField={polygonFieldName}
                    secondaryName={`${RACE_LABEL_MAP[race]} Homeowners`}
                    secondaryField={`total_own_${race}`}
                  />
                </MapOverlay>
              </BaseMap>
            </ChartContainer>
          </div>
          <div
            css={css`
              margin: 75px 0 0 25px;
            `}
          >
            <RadioButtonGroup
              grpLabel="Race"
              labels={Object.keys(LABEL_RACE_MAP)}
              onChange={e => setRace(LABEL_RACE_MAP[e.target.value])}
              value={RACE_LABEL_MAP[race]}
            />
          </div>
        </div>
      </span>
    )
  );
};

HomeLoanApprovalsVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({ totalLoans: resourceShape })
};

export default HomeLoanApprovalsVisualization;
