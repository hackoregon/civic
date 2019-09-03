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

const RACE_DATA_MAP = {
  black: "lq_black_brks",
  white: "lq_white_brks",
  multi: "lq_multi_brks",
  aian: "lq_aian_brks",
  hisp: "lq_hisp_brks",
  api: "lq_api_brks"
};

const HomeLoanApprovalsVisualization = ({ isLoading, data }) => {
  const [race, setRace] = useState("black");

  if (isLoading) return <div>Data Loading...</div>;

  const polygonFieldName = RACE_DATA_MAP[race];
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
      // TODO: Pick an official color scale
      [200, 200, 200],
      [200, 0, 0],
      [200, 150, 150],
      [255, 255, 255],
      [150, 150, 200],
      [0, 0, 200]
    ]);

  return (
    data && (
      <span>
        <strong style={{ color: "crimson" }}>
          Visualization TODO:
          <ul>
            <li>Fix radio race labels</li>
            <li>Pick a better color scale for the map</li>
            <li>Add a map legend once they exist</li>
            <li>Use tooltips? Yes? Fix tooltip labeling / No? Remove them</li>
            <li>Keep population data in tooltip? If so, what field?</li>
            <li>Fix error being thrown by inputProps on the Radio</li>
            <li>Add a real loading indicator</li>
          </ul>
        </strong>
        <div
          css={css`
            display: flex;
          `}
        >
          <div
            css={css`
              width: 100%;
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
                >
                  <MapTooltip
                    primaryName={polygonFieldName}
                    primaryField={polygonFieldName}
                    secondaryName={`total_own_${race}`}
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
              labels={Object.keys(RACE_DATA_MAP)}
              onChange={e => setRace(e.target.value)}
              value={race}
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
