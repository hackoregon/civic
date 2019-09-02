import React from "react";
import PropTypes from "prop-types";
import { at } from "lodash";
import { resourceShape } from "reduxful/react-addons";
import { scaleQuantize, extent } from "d3";

import {
  BaseMap,
  ChartContainer,
  MapOverlay
} from "@hackoregon/component-library";

const BlackPopulationChangeVisualization = ({ isLoading, data }) => {
  if (isLoading) return <div>Data Loading...</div>;

  const polygonFieldName = "blackshare";
  const housingData1990 = at(data.ncdbYearly1990, "value.results.features")[0];
  const housingData2017 = at(data.ncdbYearly2017, "value.results.features")[0];

  // --- shared color scale ---
  const findDataMinMax = extent([...housingData1990, ...housingData2017], f =>
    parseFloat(f.properties[polygonFieldName])
  );
  const colorScale = scaleQuantize()
    .domain(findDataMinMax)
    .range([
      // "Thermal"
      [255, 255, 204],
      [255, 237, 160],
      [254, 217, 118],
      [254, 178, 76],
      [253, 141, 60],
      [252, 78, 42],
      [227, 26, 28],
      [189, 0, 38],
      [128, 0, 38]
    ]);

  return (
    data && (
      <div>
        <strong>
          Visualization TODO:
          <ul>
            <li>Make this a single composite map with a slider</li>
            <li>Add a map legend once they exist</li>
            <li>Should we use tooltips?</li>
          </ul>
        </strong>
        <ChartContainer
          title="Black Population Share by Census Tract, 1990"
          subtitle="subtitle"
        >
          <BaseMap initialZoom={9.9} updateViewport={false}>
            <MapOverlay
              data={housingData1990}
              getFillColor={f => colorScale(f.properties[polygonFieldName])}
              onLayerClick={() => {}}
            />
          </BaseMap>
        </ChartContainer>
        <br />
        <ChartContainer
          title="Black Population Share by Census Tract, 2017"
          subtitle="subtitle"
        >
          <BaseMap initialZoom={9.9} updateViewport={false}>
            <MapOverlay
              data={housingData2017}
              getFillColor={f => colorScale(f.properties[polygonFieldName])}
              onLayerClick={() => {}}
            />
          </BaseMap>
        </ChartContainer>
      </div>
    )
  );
};

BlackPopulationChangeVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    ncdbYearly1990: resourceShape,
    ncdbYearly2017: resourceShape
  })
};

export default BlackPopulationChangeVisualization;
