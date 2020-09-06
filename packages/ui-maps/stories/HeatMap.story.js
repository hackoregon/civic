/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  select,
  object,
  text,
  number
} from "@storybook/addon-knobs";
import { min, max } from "d3";
import { at } from "lodash";
import { BaseMap, DemoJSONLoader } from "../src";
import notes from "./heatmap.notes.md";

const GROUP_IDS = {
  HEAT_MAP: "Style",
  HEAT_MAP_DATA: "Data"
};

const colorOptions = {
  Inferno: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "#420a68",
    0.4,
    "#932667",
    0.6,
    "#dd513a",
    0.8,
    "#fca50a",
    1,
    "#fcffa4"
  ],
  Viridis: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "#414487",
    0.4,
    "#2a788e",
    0.6,
    "#22a884",
    0.8,
    "#7ad151",
    1,
    "#fde725"
  ],
  Plasma: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "#6a00a8",
    0.4,
    "#b12a90",
    0.6,
    "#e16462",
    0.8,
    "#fca636",
    1,
    "#f0f921"
  ],
  Magma: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "#3b0f70",
    0.4,
    "#8c2981",
    0.6,
    "#de4968",
    0.8,
    "#fe9f6d",
    1,
    "#fcfdbf"
  ],
  Warm: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "rgb(191, 60, 175)",
    0.4,
    "rgb(254, 75, 131)",
    0.6,
    "rgb(255, 120, 71)",
    0.8,
    "rgb(226, 183, 47)",
    1,
    "rgb(175, 240, 91)"
  ],
  Cool: [
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
};

const heatMapDataURL =
  "https://service.civicpdx.org/transportation-systems/trimet-stop-events/disturbance-stops/" +
  "?format=json&limit=500&offset=0";

const heatMapRadiusOptions = {
  range: true,
  min: 1,
  max: 50,
  step: 1
};

const heatMapIntensityOptions = {
  range: true,
  min: 1,
  max: 5,
  step: 0.5
};

const heatMapOpacityOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.05
};

export default () =>
  storiesOf("Component Lib/Maps/Heat Map", module)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const heatMapRadius = number(
          "Radius:",
          25,
          heatMapRadiusOptions,
          GROUP_IDS.HEAT_MAP
        );

        const heatMapOpacity = number(
          "Opacity:",
          0.9,
          heatMapOpacityOptions,
          GROUP_IDS.HEAT_MAP
        );

        const heatMapIntensity = number(
          "Intensity:",
          1,
          heatMapIntensityOptions,
          GROUP_IDS.HEAT_MAP
        );

        const heatMapColorGradient = select(
          "Color Gradient:",
          colorOptions,
          colorOptions.Inferno,
          GROUP_IDS.HEAT_MAP
        );

        const heatMapColorExpression = [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          ...heatMapColorGradient
        ];

        const heatMapAPIURL = text(
          "API URL:",
          heatMapDataURL,
          GROUP_IDS.HEAT_MAP_DATA
        );

        return (
          <DemoJSONLoader urls={[heatMapAPIURL]}>
            {data => {
              const dataPath = text(
                "GeoJSON Path:",
                "results",
                GROUP_IDS.HEAT_MAP_DATA
              );
              const GeoJSONData = at(data, dataPath)[0];

              const heatMapDataProperty = "time_diff";
              const heatMapWeightExpression = [
                "interpolate",
                ["linear"],
                ["get", heatMapDataProperty],
                min(
                  GeoJSONData.features,
                  d => d.properties[heatMapDataProperty]
                ),
                0,
                max(
                  GeoJSONData.features,
                  d => d.properties[heatMapDataProperty]
                ),
                1
              ];

              const heatMapWeight = object(
                "heatmap-weight:",
                heatMapWeightExpression,
                GROUP_IDS.HEAT_MAP_DATA
              );

              const heatmapLayer = {
                "heatmap-radius": heatMapRadius,
                "heatmap-opacity": heatMapOpacity,
                "heatmap-intensity": heatMapIntensity,
                "heatmap-color": heatMapColorExpression,
                "heatmap-weight": heatMapWeight
              };

              return (
                <div style={{ height: "100vh" }}>
                  <BaseMap
                    updateViewport={false}
                    initialZoom={11}
                    initialLatitude={45.5141109}
                    initialLongitude={-122.5398426}
                    mapboxData={GeoJSONData}
                    mapboxDataId="transit-stops-data"
                    mapboxLayerType="heatmap"
                    mapboxLayerOptions={heatmapLayer}
                    mapboxLayerId="transit-stops-map"
                    civicMapStyle="dark"
                    useContainerHeight
                  />
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      { notes }
    );
