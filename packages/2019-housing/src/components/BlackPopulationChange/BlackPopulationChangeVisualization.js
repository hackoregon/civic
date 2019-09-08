import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { scaleQuantize, extent } from "d3";

import {
  BaseMap,
  civicFormat,
  ChartContainer,
  ComparisonMap,
  MapOverlay,
  MapTooltip,
  VisualizationColors
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
  const colorScale = scaleQuantize()
    .domain(findDataMinMax)
    .range(VisualizationColors.sequential.thermal);

  const height = 500;
  const leftMap = (
    <BaseMap civicMapStyle="light" height={height}>
      <MapOverlay
        data={housingData1990}
        getFillColor={f => colorScale(f.properties[polygonFieldName])}
        onLayerClick={() => {}}
      >
        <MapTooltip
          primaryName="Black Polulation Share"
          primaryField={polygonFieldName}
          formatPrimaryField={f => civicFormat.decimalToPercent(f)}
          secondaryName="Year"
          secondaryField="year"
        />
      </MapOverlay>
    </BaseMap>
  );
  const rightMap = (
    <BaseMap civicMapStyle="light" height={height}>
      <MapOverlay
        data={housingData2017}
        getFillColor={f => colorScale(f.properties[polygonFieldName])}
        onLayerClick={() => {}}
      >
        <MapTooltip
          primaryName="Black Polulation Share"
          primaryField={polygonFieldName}
          formatPrimaryField={f => civicFormat.decimalToPercent(f)}
          secondaryName="Year"
          secondaryField="year"
        />
      </MapOverlay>
    </BaseMap>
  );

  return (
    data && (
      <div>
        <strong style={{ color: "crimson" }}>
          Visualization TODO:
          <ul>
            <li>Should we add some explanatory content about the slider?</li>
            <li>Pick better color scales (should they be the same?)</li>
            <li>Add a map legend once they exist</li>
            <li>Should we use tooltips?</li>
            <li>Add a real loading indicator</li>
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
          height={height}
          initialViewport={{ zoom: 9.9 }}
          leftMap={leftMap}
          leftMapTitle="1990"
          rightMap={rightMap}
          rightMapTitle="2017"
          sliderStartPosition={50}
          showDivider
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
