import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { scaleOrdinal } from "d3";

import {
  BaseMap,
  ChartContainer,
  MapOverlay,
  MapTooltip
} from "@hackoregon/component-library";
import TempLoader from "../TempLoader/TempLoader";

const HolcRedliningVisualization = ({ data }) => {
  if (!isLoaded(data.redliningMap)) return <TempLoader />;

  const polygonFieldName = "holc_grade";
  const redliningMap = data.redliningMap.value.results.features;
  const colorScale = scaleOrdinal()
    .domain([null, "A", "B", "C", "D"])
    .range([
      // Color-blind safe diverging color scale from ColorBrewer
      [220, 69, 86],
      [77, 175, 74],
      [30, 98, 189],
      [255, 178, 31]
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
        <strong style={{ color: "crimson" }}>
          Visualization TODO:
          <ul>
            <li>
              I copied the basic grade labels from
              dsl.richmond.edu/panorama/redlining (Best, Still Desirable,
              Definitely Declining, & Hazardous) Should we also add more detail
              about them? An example of the ones on that site:
              <br />
              <code>
                HOLC describes grade D areas as “characterized by detrimental
                influences in a pronounced degree, underdesirable population or
                infiltration of it.” The recommended lenders “refuse to make
                loans in these areas [or] only on a conservative basis.”
              </code>
            </li>
            <li>
              All the map-level descriptions (area_descr) in the API call are
              truncated & formatted strangely
            </li>
          </ul>
        </strong>
        <br />
        <ChartContainer title="HOLC Redlining Areas" subtitle="Portland, 1938">
          <BaseMap initialZoom={10.5} updateViewport>
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
        </ChartContainer>
      </span>
    )
  );
};

HolcRedliningVisualization.propTypes = {
  data: PropTypes.shape({ redliningMap: resourceShape })
};

export default HolcRedliningVisualization;
