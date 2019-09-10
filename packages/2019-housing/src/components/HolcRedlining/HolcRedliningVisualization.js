import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { scaleOrdinal } from "d3";

import {
  BaseMap,
  ChartContainer,
  MapLegend,
  MapOverlay,
  MapTooltip
} from "@hackoregon/component-library";
import TempLoader from "../TempLoader/TempLoader";

const HolcRedliningVisualization = ({ data }) => {
  if (!isLoaded(data.redliningMap)) return <TempLoader />;

  const polygonFieldName = "holc_grade";
  const redliningMap = data.redliningMap.value.results.features;
  const colorScale = scaleOrdinal()
    .domain(["A", "B", "C", "D"])
    .range([
      // Color-blind safe diverging color scale from ColorBrewer
      [77, 175, 74],
      [30, 98, 189],
      [255, 178, 31],
      [220, 69, 86]
    ]);

  const REDLINING_GRADES = {
    A: '"Best"',
    B: '"Still Desirable"',
    C: '"Definitely Declining"',
    D: '"Hazardous"'
  };

  return (
    data && (
      <span>
        <ChartContainer title="HOLC Redlining Areas" subtitle="Portland, 1938">
          <BaseMap initialZoom={10.5} maxZoom={13} minZoom={6} updateViewport>
            <MapOverlay
              data={redliningMap}
              getFillColor={f => colorScale(f.properties[polygonFieldName])}
              onLayerClick={() => {}}
              opacity={0.25}
            >
              <MapTooltip
                tooltipDataArray={[
                  {
                    name: "HOLC Grade",
                    field: `holc_grade`,
                    formatField: f => `${f} - ${REDLINING_GRADES[f]}`
                  }
                ]}
                wide
              />
            </MapOverlay>
          </BaseMap>
          <br />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <MapLegend
              colorScale={colorScale}
              formatValues={f => `${f}: ${REDLINING_GRADES[f]}`}
              label="HOLC Grade"
              vertical={false}
            />
          </div>
        </ChartContainer>
      </span>
    )
  );
};

HolcRedliningVisualization.propTypes = {
  data: PropTypes.shape({ redliningMap: resourceShape })
};

export default HolcRedliningVisualization;
