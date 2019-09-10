import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { scaleQuantize, extent } from "d3";

import {
  BaseMap,
  civicFormat,
  ChartContainer,
  ComparisonMap,
  MapLegend,
  MapOverlay,
  MapTooltip,
  VisualizationColors
} from "@hackoregon/component-library";

import TempLoader from "../TempLoader/TempLoader";

const BlackPopulationChangeVisualization = ({ isLoading, data }) => {
  if (isLoading) return <TempLoader />;

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
    <BaseMap civicMapStyle="light" height={height} maxZoom={13} minZoom={6}>
      <MapOverlay
        data={housingData1990}
        getFillColor={f => colorScale(f.properties[polygonFieldName])}
        onLayerClick={() => {}}
      >
        <MapTooltip
          primaryName="Black Polulation Share"
          primaryField={polygonFieldName}
          formatPrimaryField={f => civicFormat.decimalToPercent(f / 100)}
          secondaryName="Year"
          secondaryField="year"
        />
      </MapOverlay>
    </BaseMap>
  );
  const rightMap = (
    <BaseMap civicMapStyle="light" height={height} maxZoom={13} minZoom={6}>
      <MapOverlay
        data={housingData2017}
        getFillColor={f => colorScale(f.properties[polygonFieldName])}
        onLayerClick={() => {}}
      >
        <MapTooltip
          primaryName="Black Polulation Share"
          primaryField={polygonFieldName}
          formatPrimaryField={f => civicFormat.decimalToPercent(f / 100)}
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
            <li>Add a map legend once they exist</li>
            <li>
              Try moving the map titles to either side of the divider (with a
              different look than the Chart title) & make the divider more
              salient
            </li>
          </ul>
        </strong>
        <ChartContainer
          title="Black Population Share by Census Tract, 1990 vs 2017"
          subtitle="Slide to compare 1990 to 2017"
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
        <br />
        <MapLegend
          colorScale={colorScale}
          formatValues={f => civicFormat.decimalToPercent(f / 100)}
          label="Black Population Share"
          vertical={false}
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
