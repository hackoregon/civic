import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { scaleQuantize, extent } from "d3";

import {
  BaseMap,
  ChartContainer,
  ComparisonMap,
  MapOverlay
} from "@hackoregon/component-library";

const BlackPopulationChangeVisualization = ({ isLoading, data }) => {
  if (isLoading) return <div>Data Loading...</div>;

  const polygonFieldName = "blackshare";
  const housingData1990 = data.ncdbYearly1990.value.results.features;
  const housingData2017 = data.ncdbYearly2017.value.results.features;

  // --- shared color scale ---
  const findDataMinMax = extent([...housingData1990, ...housingData2017], f =>
    parseFloat(f.properties[polygonFieldName])
  );
  const warmColorScale = scaleQuantize()
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
  const coolColorScale = scaleQuantize()
    .domain(findDataMinMax)
    .range([
      // "Space"
      [247, 252, 253],
      [224, 236, 244],
      [191, 211, 230],
      [158, 188, 218],
      [140, 150, 198],
      [140, 107, 177],
      [136, 65, 157],
      [129, 15, 124],
      [77, 0, 75]
    ]);

  const height = 500;
  const leftMap = (
    <BaseMap civicMapStyle="light" height={height}>
      <MapOverlay
        data={housingData1990}
        getFillColor={f => warmColorScale(f.properties[polygonFieldName])}
        onLayerClick={() => {}}
      />
    </BaseMap>
  );
  const rightMap = (
    <BaseMap civicMapStyle="light" height={height}>
      <MapOverlay
        data={housingData2017}
        getFillColor={f => coolColorScale(f.properties[polygonFieldName])}
        onLayerClick={() => {}}
      />
    </BaseMap>
  );

  return (
    data && (
      <div>
        <strong style={{ color: "crimson" }}>
          Visualization TODO:
          <ul>
            <li>Does this work with the slider?</li>
            <li>Should we add some explanatory content about the slider?</li>
            <li>Pick better color scales (should they be the same?)</li>
            <li>Add a map legend once they exist</li>
            <li>Should we use tooltips?</li>
            <li>
              NOTE: Turning this into a ComparisonMap caused a bunch of console
              errors that look related to the CivicCard templates...
            </li>
          </ul>
        </strong>
        <ChartContainer
          title="Black Population Share by Census Tract, 1990 vs 2017"
          subtitle="subtitle"
        />
        <ComparisonMap
          leftMap={leftMap}
          rightMap={rightMap}
          height={height}
          sliderStartPosition={70}
          initialViewport={{ zoom: 9.9 }}
        />
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
