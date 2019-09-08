import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { max } from "d3";

import {
  BaseMap,
  ChartContainer,
  civicFormat,
  MapTooltip,
  Scatterplot,
  ScatterPlotMap,
  ScreenGridMap
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
      <div>
        <strong style={{ color: "crimson" }}>
          Map Visualization TODO:
          <ul>
            <li>
              Pick which of these maps to use (or is it still a possibility to
              use census tracts?)
            </li>
            <li>
              Should we be using the points also? If so, how does everyone feel
              about the tooltips?
            </li>
            <li>Add a real title etc..</li>
            <li>Add a map legend once they exist</li>
          </ul>
        </strong>
        <ChartContainer
          title="ADU Distribution"
          subtitle="ADU permits issued, 1994-2019"
        >
          <div style={{ height: "50vh" }}>
            <BaseMap
              updateViewport={false}
              initialZoom={10}
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
                getRadius={f =>
                  Math.sqrt(f.properties.new_units / Math.PI) * 15
                }
                stroked={false}
                getLineWidth={1}
                autoHighlight
                highlightColor={[220, 0, 0]}
                onLayerClick={() => {}}
              >
                <MapTooltip
                  primaryName="Year"
                  primaryField="year_field"
                  secondaryName="Number of units"
                  secondaryField="new_units"
                />
              </ScatterPlotMap>
            </BaseMap>
          </div>
          <br />
          <BaseMap initialZoom={10}>
            <ScreenGridMap
              data={featureData.features}
              getPosition={f => f.geometry.coordinates}
              opacity={0.25}
              colorRange={[
                // Thermal
                [255, 255, 204],
                [255, 237, 160],
                [254, 217, 118],
                [254, 178, 76],
                [253, 141, 60],
                [252, 78, 42],
                [227, 26, 28],
                [189, 0, 38],
                [128, 0, 38]
              ]}
              cellSizePixels={15}
              autoHighlight
              onLayerClick={() => {}}
            />
            <ScatterPlotMap
              data={featureData.features}
              opacity={1}
              civicColor="black"
              getRadius={f => Math.sqrt(f.properties.new_units / Math.PI) * 15}
              // radiusScale={2.5}
              stroked={false}
              getLineWidth={1}
              autoHighlight
              highlightColor={[220, 0, 0]}
              onLayerClick={() => {}}
            >
              <MapTooltip
                primaryName="Year"
                primaryField="year_field"
                secondaryName="Number of units"
                secondaryField="new_units"
              />
            </ScatterPlotMap>
          </BaseMap>
        </ChartContainer>

        <br />
        <strong style={{ color: "crimson" }}>
          Scatterplot Visualization TODO:
          <ul>
            <li>GET THE DATA!??</li>
            <li>... add details</li>
          </ul>
        </strong>
        <Scatterplot
          data={[
            { x_value: 20, y_value: 30000 },
            { x_value: 30, y_value: 50000 },
            { x_value: 20, y_value: 90000 }
          ]}
          dataKey="y_value"
          dataValue="x_value"
          domain={{
            x: [30000, 90000],
            y: [0, 55]
          }}
          title="Access to capital enables ADU construction"
          subtitle="Density/Concentration of ADUs in Portland’s Neighborhoods by Median Income"
          xLabel="Median Household Income for census tract"
          yLabel="Number of completed ADUs in tract"
          xNumberFormatter={x => civicFormat.dollars(x)}
        />
      </div>
    )
  );
};

AduDistributionsVisualization.propTypes = {
  data: PropTypes.shape({ residentialBuildingPermits: resourceShape })
};

export default AduDistributionsVisualization;
