import { useState } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { scaleOrdinal } from "d3";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import {
  civicFormat,
  BaseMap,
  ChartContainer,
  MapLegend,
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
  multi: "Multiple Race"
};

const LABEL_RACE_MAP = {
  // "Readable Name": "abbreviation"
  Black: "black",
  White: "white",
  "Hispanic or Latino": "hisp",
  "Native American": "aian",
  "Asian/Pacific Islander": "api",
  "Multiple Race": "multi"
};

const getSharedTooltipDataArray = race => [
  {
    name: "Tract",
    field: `geoid`,
    formatField: f => Number(f.substring(6)) / 100 // 41067033101 --> 331.02
  },
  {
    name: `Total ${RACE_LABEL_MAP[race]} home loans`,
    field: `loans_${race}`,
    formatField: f => civicFormat.numeric(f)
  },
  {
    name: `${RACE_LABEL_MAP[race]} share of home loans`,
    field: `loans_share_${race}`,
    formatField: f => civicFormat.decimalToPercent(f)
  }
];

const HomeLoanApprovalsVisualization = ({ isLoading, data }) => {
  // HOUSEHOLD loan approval rate race
  const [hhRace, setHhRace] = useState("black");
  // HOMEOWNER loan approval rate race
  const [hoRace, setHoRace] = useState("black");

  if (isLoading) return <TempLoader />;

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
      [254, 153, 41],
      [254, 217, 142],
      [255, 255, 255],
      [143, 240, 232],
      [25, 183, 170]
    ]);

  const polygonFieldNameHomeOwners = `lq_${hoRace}_brks`;
  const polygonFieldNameHouseholds = `lq_hh_${hhRace}_brks`;

  return (
    data && (
      <span>
        {/* -------- HOMEOWNER MAP -------- */}
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
              title={`Home Loan Approval Rates for ${
                RACE_LABEL_MAP[hoRace]
              } Homeowners`}
              subtitle="Comparing Tract-Level Approval Rates to the Share of Existing Homeowners of Color"
            >
              <BaseMap initialZoom={9} maxZoom={13} minZoom={6}>
                <MapOverlay
                  data={totalLoans}
                  getFillColor={f =>
                    colorScale(f.properties[polygonFieldNameHomeOwners])
                  }
                  onLayerClick={() => {}}
                  opacity={0.25}
                >
                  <MapTooltip
                    tooltipDataArray={[
                      ...getSharedTooltipDataArray(hoRace),
                      {
                        name: `Share of homeowners who are ${
                          RACE_LABEL_MAP[hoRace]
                        }`,
                        field: `share_total_own_${hoRace}`,
                        formatField: f => civicFormat.decimalToPercent(f)
                      },
                      {
                        name: `Location quotient (loans to ${
                          RACE_LABEL_MAP[hoRace]
                        } homeowners)`,
                        field: polygonFieldNameHomeOwners
                      }
                    ]}
                    wide
                  />
                </MapOverlay>
              </BaseMap>
            </ChartContainer>
          </div>
          <div
            css={css`
              padding: 75px 0 0 15px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `}
          >
            <RadioButtonGroup
              grpLabel="Race"
              labels={Object.keys(LABEL_RACE_MAP)}
              onChange={e => setHoRace(LABEL_RACE_MAP[e.target.value])}
              value={RACE_LABEL_MAP[hoRace]}
            />
            <MapLegend
              colorScale={colorScale}
              label={`Location quotient (loans to ${
                RACE_LABEL_MAP[hoRace]
              } homeowners)`}
              vertical
            />
          </div>
        </div>
        <br />
        {/* -------- HOUSEHOLD MAP -------- */}
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
              title={`Home Loan Approval Rates for ${
                RACE_LABEL_MAP[hhRace]
              } Households`}
              subtitle="Comparing Tract-Level Approval Rates to the Share of Existing Households of Color"
            >
              <BaseMap initialZoom={9} maxZoom={13} minZoom={6}>
                <MapOverlay
                  data={totalLoans}
                  getFillColor={f =>
                    colorScale(f.properties[polygonFieldNameHouseholds])
                  }
                  onLayerClick={() => {}}
                  opacity={0.25}
                >
                  <MapTooltip
                    tooltipDataArray={[
                      ...getSharedTooltipDataArray(hhRace),
                      {
                        name: `Share of households that are ${
                          RACE_LABEL_MAP[hhRace]
                        }`,
                        field: `share_hh_${hhRace}`,
                        formatField: f => civicFormat.decimalToPercent(f)
                      },
                      {
                        name: `Location quotient (loans to ${
                          RACE_LABEL_MAP[hhRace]
                        } households)`,
                        field: polygonFieldNameHouseholds
                      }
                    ]}
                    wide
                  />
                </MapOverlay>
              </BaseMap>
            </ChartContainer>
          </div>
          <div
            css={css`
              padding: 75px 0 0 15px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `}
          >
            <RadioButtonGroup
              grpLabel="Race"
              labels={Object.keys(LABEL_RACE_MAP)}
              onChange={e => setHhRace(LABEL_RACE_MAP[e.target.value])}
              value={RACE_LABEL_MAP[hhRace]}
            />
            <MapLegend
              colorScale={colorScale}
              label={`Location quotient (loans to ${
                RACE_LABEL_MAP[hhRace]
              } households)`}
              vertical
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
