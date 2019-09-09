import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { max } from "d3";

import {
  BaseMap,
  ChartContainer,
  MapTooltip,
  ScatterPlotMap
} from "@hackoregon/component-library";

import TempLoader from "../TempLoader/TempLoader";

const AduDistributionsVisualization = ({ data }) => {
  if (!isLoaded(data.residentialBuildingPermit)) return <TempLoader />;

  const pointGeoJsonData = data.residentialBuildingPermit.value.results;
  const featureData = {
    type: "FeatureCollection",
    features: pointGeoJsonData.map(el => ({
      id: el.index,
      type: "Feature",
      properties: el,
      geometry: {
        type: "Point",
        coordinates: [el.x, el.y]
      }
    }))
  };

  const heatMapColorExpression = [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    // Thermal-ish colorScale
    ...[
      0,
      "rgba(0,0,0,0)",
      0.2,
      "rgb(255, 237, 160)",
      0.4,
      "rgb(254, 217, 118)",
      0.6,
      "rgb(253, 141, 60)",
      0.8,
      "rgb(252, 78, 42)",
      1,
      "rgb(189, 0, 38)"
    ]
  ];
  const heatMapDataProperty = "new_units";
  const heatmapLayer = {
    "heatmap-radius": 8,
    "heatmap-opacity": 0.25,
    "heatmap-intensity": 1,
    "heatmap-color": heatMapColorExpression,
    "heatmap-weight": [
      "interpolate",
      ["linear"],
      ["get", heatMapDataProperty],
      0, // Bottom threshold for showing heatmap (only 0 should be blank)
      0,
      max(featureData.features, d => d.properties[heatMapDataProperty]), // Upper threshold
      1
    ]
  };

  return (
    data && (
      <ChartContainer
        title="ADU Distribution"
        subtitle="ADU permits issued, 1994-2019"
      >
        <div style={{ height: "50vh" }}>
          <BaseMap
            updateViewport={false}
            initialZoom={10}
            maxZoom={13}
            minZoom={6}
            mapboxData={featureData}
            mapboxDataId="adu-distribution-data"
            mapboxLayerType="heatmap"
            mapboxLayerOptions={heatmapLayer}
            mapboxLayerId="adu-distribution-map"
            civicMapStyle="light"
            useContainerHeight
          >
            <ScatterPlotMap
              data={featureData.features}
              opacity={1}
              getRadius={f => Math.sqrt(f.properties.new_units / Math.PI) * 15}
              stroked={false}
              getLineWidth={1}
              autoHighlight
              highlightColor={[220, 0, 0]}
              onLayerClick={() => {}}
            >
              <MapTooltip
                primaryName="Permit year"
                primaryField="year_field"
                secondaryName="Number of units permitted"
                secondaryField="new_units"
              />
            </ScatterPlotMap>
          </BaseMap>
        </div>
      </ChartContainer>
    )
  );
};

AduDistributionsVisualization.propTypes = {
  data: PropTypes.shape({ residentialBuildingPermits: resourceShape })
};

export default AduDistributionsVisualization;
