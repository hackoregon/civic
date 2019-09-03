import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { min, max } from "d3";

import {
  BaseMap,
  ChartContainer,
  civicFormat,
  Scatterplot
} from "@hackoregon/component-library";

const AduDistributionsVisualization = ({ data }) => {
  if (!isLoaded(data.residentialBuildingPermit)) {
    return <div>Data Loading...</div>;
  }

  const pointGeoJsonData = data.residentialBuildingPermit.value.results;
  const test = {
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
    // Cool colorScale
    ...[
      0,
      "rgba(0,0,0,0)",
      0.2,
      "rgb(76, 110, 219)",
      0.4,
      "rgb(35, 171, 216)",
      0.6,
      "rgb(29, 223, 163)",
      0.8,
      "rgb(82, 246, 103)",
      1,
      "rgb(175, 240, 91)"
    ]
  ];
  const heatMapDataProperty = "new_units";
  const heatmapLayer = {
    "heatmap-radius": 25,
    "heatmap-opacity": 0.9,
    "heatmap-intensity": 1,
    "heatmap-color": heatMapColorExpression,
    "heatmap-weight": [
      "interpolate",
      ["linear"],
      ["get", heatMapDataProperty],
      min(test.features, d => d.properties[heatMapDataProperty]),
      0,
      max(test.features, d => d.properties[heatMapDataProperty]),
      1
    ]
  };

  return (
    data && (
      <div>
        <strong style={{ color: "crimson" }}>
          Map Visualization TODO:
          <ul>
            <li>Add a real title etc..</li>
            <li>Figure out the appropriate color scale</li>
            <li>Add a map legend once they exist</li>
            <li>
              Should we also plot the census tract boundaries? (to go with the
              scatter plot below)
            </li>
          </ul>
        </strong>
        <ChartContainer
          title="ADU Distribution"
          subtitle="ADU permits issued, 1994-2019"
        >
          <div style={{ height: "50vh" }}>
            <BaseMap
              updateViewport={false}
              initialZoom={11}
              initialLatitude={45.5141109}
              initialLongitude={-122.5398426}
              mapboxData={test}
              mapboxDataId="adu-distribution-data"
              mapboxLayerType="heatmap"
              mapboxLayerOptions={heatmapLayer}
              mapboxLayerId="adu-distribution-map"
              civicMapStyle="light"
              useContainerHeight
            />
          </div>
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
