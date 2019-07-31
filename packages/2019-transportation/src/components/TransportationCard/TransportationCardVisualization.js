/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { extent } from "d3-array";

import {
  BaseMap,
  IconMap,
  Slider,
  ChartContainer
} from "@hackoregon/component-library";

import {
  poiIconZoomScale,
  poiGetIconColor,
  poiIconMapping
} from "./layerStyles";

const mapGLOptions = {
  scrollZoom: false,
  dragPan: false,
  dragRotate: false,
  doubleClickZoom: false,
  touchZoom: false,
  touchRotate: false,
  keyboard: false
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

const heatMapRadius = 25;
const heatMapOpacity = 0.9;
const heatMapIntensity = 1;
const heatMapColorGradient = colorOptions.Inferno;
const heatMapColorExpression = [
  "interpolate",
  ["linear"],
  ["heatmap-density"],
  ...heatMapColorGradient
];
const heatMapColor = heatMapColorExpression;

function BeforeAfterDelayMaps({ isLoading, data }) {
  const heatMapDataProperty = "time_diff";
  const dataMinMax = !isLoading
    ? extent(
        data.value.results.features,
        d => d.properties[heatMapDataProperty]
      )
    : [0, 1];
  const heatMapWeightExpression = [
    "interpolate",
    ["linear"],
    ["get", heatMapDataProperty],
    dataMinMax[0],
    0,
    dataMinMax[1],
    1
  ];
  const heatMapWeight = heatMapWeightExpression;
  const heatmapLayer = {
    "heatmap-radius": heatMapRadius,
    "heatmap-opacity": heatMapOpacity,
    "heatmap-intensity": heatMapIntensity,
    "heatmap-color": heatMapColor,
    "heatmap-weight": heatMapWeight
  };

  return (
    <Fragment>
      <Slider />
      <div
        className={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
        `}
      >
        <ChartContainer title="Before">
          {!isLoading && (
            <BaseMap
              updateViewport={false}
              initialZoom={14.5}
              initialLatitude={45.5132}
              initialLongitude={-122.6709}
              mapboxData={data.value.results}
              mapboxDataId="transit-stops-data"
              mapboxLayerType="heatmap"
              mapboxLayerOptions={heatmapLayer}
              mapboxLayerId="transit-stops-map"
              civicMapStyle="dark"
              navigation={false}
              mapGLOptions={mapGLOptions}
            >
              <IconMap
                data={data.value.results.features}
                opacity={0.5}
                iconAtlas="https://i.imgur.com/xgTAROe.png"
                iconMapping={poiIconMapping}
                iconSizeScale={poiIconZoomScale}
                getColor={poiGetIconColor}
                autoHighlight={false}
                highlightColor={[0, 0, 0, 0]}
              />
            </BaseMap>
          )}
        </ChartContainer>
        <ChartContainer title="After">
          {!isLoading && (
            <BaseMap
              updateViewport={false}
              initialZoom={14.5}
              initialLatitude={45.5132}
              initialLongitude={-122.6709}
              mapboxData={data.value.results}
              mapboxDataId="transit-stops-data"
              mapboxLayerType="heatmap"
              mapboxLayerOptions={heatmapLayer}
              mapboxLayerId="transit-stops-map"
              civicMapStyle="dark"
              navigation={false}
              mapGLOptions={mapGLOptions}
            >
              <IconMap
                data={data.value.results.features}
                opacity={0.5}
                iconAtlas="https://i.imgur.com/xgTAROe.png"
                iconMapping={poiIconMapping}
                iconSizeScale={poiIconZoomScale}
                getColor={poiGetIconColor}
                autoHighlight={false}
                highlightColor={[0, 0, 0, 0]}
              />
            </BaseMap>
          )}
        </ChartContainer>
      </div>
    </Fragment>
  );
}

BeforeAfterDelayMaps.displayName = "DiveDeeperIntoTransportationData";

BeforeAfterDelayMaps.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({})
};

export default BeforeAfterDelayMaps;
