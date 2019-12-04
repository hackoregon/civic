import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  text,
  object,
  select,
  number
} from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";
import { get } from "lodash";
import { jsx, css } from "@emotion/core";
import {
  BaseMap,
  VectorTilesMap,
  ScatterPlotMap,
  DemoJSONLoader
} from "../src";
/** @jsx jsx */
import notes from "./vectorTilesMap.notes.md";

const GROUP_IDS = {
  DESIGN: "Design",
  "VECTOR TILES MAP": "Vector Tiles Map",
  "VECTOR TILES MAP 2": "Vector Tiles Map 2",
  "DECK GL MAP": "Deck GL Map",
  "DECK GL DATA": "Deck GL Data"
};

const containerWrapper = css`
  height: 100vh;
  min-height: 500px;
`;

const MAP_STYLE_OPTIONS = {
  "CIVIC Light": "light",
  "Sandbox Dark": "sandbox-dark",
  "CIVIC Dark": "dark"
};

export default () =>
  storiesOf("Component Lib|Maps/Vector Tiles Map", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add(
      "Standard",
      () => {
        const civicMapStyle = select(
          "CIVIC Map Styles:",
          MAP_STYLE_OPTIONS,
          MAP_STYLE_OPTIONS["CIVIC Dark"],
          GROUP_IDS.DESIGN
        );

        const vectorTilesURL = text(
          "Mapbox Tileset URL:",
          "mapbox://themendozaline.dgpl66sy",
          GROUP_IDS.DESIGN
        );

        const layerType = text("Layer Type:", "fill", GROUP_IDS.DESIGN);

        const sourceLayer = text(
          "Source Layer:",
          "us-counties-c8pk23",
          GROUP_IDS.DESIGN
        );

        const paint = object(
          "Paint:",
          {
            "fill-color": [
              "match",
              ["get", "STATEFP"],
              "41",
              "#FFB226",
              "#19B7AA"
            ],
            "fill-opacity": 0.75
          },
          GROUP_IDS.DESIGN
        );

        const layerPosition = text(
          "Layer Position:",
          "waterway-label",
          GROUP_IDS.DESIGN
        );

        return (
          <div css={containerWrapper}>
            <BaseMap
              initialLatitude={39.810492}
              initialLongitude={-98.556061}
              initialZoom={4}
              minZoom={1}
              useScrollZoom
              useContainerHeight
              updateViewport={false}
              civicMapStyle={civicMapStyle}
            >
              <VectorTilesMap
                vectorTilesID="source-id-01"
                vectorTilesURL={vectorTilesURL}
                layerID="layer-id-01"
                layerType={layerType}
                sourceLayer={sourceLayer}
                paint={paint}
                layerPosition={layerPosition}
              />
            </BaseMap>
          </div>
        );
      },
      { notes }
    )
    .add(
      "Example: Two Sources",
      () => {
        const vectorTilesURL01 = text(
          "Mapbox Tileset URL - 01:",
          "mapbox://mapbox.mapbox-terrain-v2",
          GROUP_IDS["VECTOR TILES MAP"]
        );

        const layerType01 = text(
          "Type - 01:",
          "line",
          GROUP_IDS["VECTOR TILES MAP"]
        );

        const sourceLayer01 = text(
          "Source Layer - 01:",
          "contour",
          GROUP_IDS["VECTOR TILES MAP"]
        );

        const paint01 = object(
          "Paint - 01:",
          {
            "line-color": "fuchsia",
            "line-width": 1
          },
          GROUP_IDS["VECTOR TILES MAP"]
        );

        const layerPosition01 = text(
          "Layer Position - 01:",
          "waterway-label",
          GROUP_IDS["VECTOR TILES MAP"]
        );

        const vectorTilesURL02 = text(
          "Mapbox Tileset URL - 02:",
          "mapbox://mapbox.mapbox-streets-v8",
          GROUP_IDS["VECTOR TILES MAP 2"]
        );

        const layerType02 = text(
          "Type - 02:",
          "fill",
          GROUP_IDS["VECTOR TILES MAP 2"]
        );

        const sourceLayer02 = text(
          "Source Layer - 02:",
          "water",
          GROUP_IDS["VECTOR TILES MAP 2"]
        );

        const paint02 = object(
          "Paint - 02:",
          {
            "fill-color": "yellow",
            "fill-opacity": 0.75
          },
          GROUP_IDS["VECTOR TILES MAP 2"]
        );

        const layerPosition02 = text(
          "Layer Position - 02:",
          "bridge-path",
          GROUP_IDS["VECTOR TILES MAP 2"]
        );

        const civicMapStyle = select(
          "CIVIC Map Styles - 01:",
          MAP_STYLE_OPTIONS,
          MAP_STYLE_OPTIONS["CIVIC Dark"],
          GROUP_IDS.DESIGN
        );

        return (
          <div css={containerWrapper}>
            <BaseMap
              initialZoom={14}
              minZoom={1}
              useScrollZoom
              useContainerHeight
              updateViewport={false}
              civicMapStyle={civicMapStyle}
            >
              <VectorTilesMap
                vectorTilesID="source-01"
                vectorTilesURL={vectorTilesURL01}
                layerID="layer-01"
                layerType={layerType01}
                sourceLayer={sourceLayer01}
                paint={paint01}
                layerPosition={layerPosition01}
              />
              <VectorTilesMap
                vectorTilesID="source-02"
                vectorTilesURL={vectorTilesURL02}
                layerID="layer-02"
                layerType={layerType02}
                sourceLayer={sourceLayer02}
                paint={paint02}
                layerPosition={layerPosition02}
              />
            </BaseMap>
          </div>
        );
      },
      { notes }
    )
    .add(
      "Example: With Deck.GL Layer",
      () => {
        const civicMapStyle = select(
          "CIVIC Map Styles:",
          MAP_STYLE_OPTIONS,
          MAP_STYLE_OPTIONS["CIVIC Dark"],
          GROUP_IDS["VECTOR TILES MAP"]
        );

        const vectorTilesURL = text(
          "Mapbox Tileset URL:",
          "mapbox://themendozaline.dgpl66sy",
          GROUP_IDS["VECTOR TILES MAP"]
        );

        const layerType = text(
          "Layer Type:",
          "fill",
          GROUP_IDS["VECTOR TILES MAP"]
        );

        const sourceLayer = text(
          "Source Layer:",
          "us-counties-c8pk23",
          GROUP_IDS["VECTOR TILES MAP"]
        );

        const paint = object(
          "Paint:",
          {
            "fill-color": [
              "match",
              ["get", "STATEFP"],
              "41",
              "#FFB226",
              "#19B7AA"
            ],
            "fill-opacity": 0.75
          },
          GROUP_IDS["VECTOR TILES MAP"]
        );

        const layerPosition = text(
          "Layer Position:",
          "waterway-label",
          GROUP_IDS["VECTOR TILES MAP"]
        );

        const getFillColor = object(
          "Fill Color",
          [220, 20, 60, 255],
          GROUP_IDS["DECK GL MAP"]
        );

        const opacity = number(
          "Opacity:",
          0.9,
          {
            range: true,
            min: 0,
            max: 1,
            step: 0.1
          },
          GROUP_IDS["DECK GL MAP"]
        );

        const getRadius = number(
          "Radius:",
          10,
          {
            range: true,
            min: 1,
            max: 150,
            step: 1
          },
          GROUP_IDS["DECK GL MAP"]
        );

        const dataURL =
          "https://service.civicpdx.org/neighborhood-development/sandbox/slides/bikecounts/?format=json";

        const fetchURL = text("API URL:", dataURL, GROUP_IDS["DECK GL DATA"]);

        return (
          <div css={containerWrapper}>
            <DemoJSONLoader urls={[fetchURL]}>
              {data => {
                const featuresArrayPath = text(
                  "Features Array Path:",
                  "slide_data.features",
                  GROUP_IDS["DECK GL DATA"]
                );

                const featuresData = get(data, featuresArrayPath);

                return (
                  <BaseMap
                    initialZoom={14}
                    useScrollZoom
                    useContainerHeight
                    updateViewport={false}
                    civicMapStyle={civicMapStyle}
                  >
                    <VectorTilesMap
                      vectorTilesID="source-03"
                      vectorTilesURL={vectorTilesURL}
                      layerID="layer-03"
                      layerType={layerType}
                      sourceLayer={sourceLayer}
                      paint={paint}
                      layerPosition={layerPosition}
                    />
                    <ScatterPlotMap
                      data={featuresData}
                      getPosition={d =>
                        d.geometry ? d.geometry.coordinates : [0, 0]
                      }
                      opacity={opacity}
                      getFillColor={getFillColor}
                      getRadius={() => getRadius}
                    />
                  </BaseMap>
                );
              }}
            </DemoJSONLoader>
          </div>
        );
      },
      { notes }
    )
    .add(
      "Example: One Source and Two Layers",
      () => {
        const vectorTilesURL = text(
          "Mapbox Tileset URL:",
          "mapbox://themendozaline.census-counties",
          GROUP_IDS.DESIGN
        );

        const vectorTilesID = text(
          "Vector Tiles ID:",
          "vector-tile-id-01",
          GROUP_IDS.DESIGN
        );

        const layerPosition = text(
          "Layer Position:",
          "waterway-label",
          GROUP_IDS.DESIGN
        );

        const civicMapStyle = select(
          "CIVIC Map Styles - 01:",
          MAP_STYLE_OPTIONS,
          MAP_STYLE_OPTIONS["CIVIC Dark"],
          GROUP_IDS.DESIGN
        );

        const multipleLayers = object(
          "Multiple Layers",
          [
            {
              layerID: "layer-01",
              layerType: "fill",
              sourceLayer: "us-census-tracts",
              paint: {
                "fill-color": [
                  "step",
                  ["get", "b28002_001e"],
                  "#ffffd9",
                  2500,
                  "#edf8b1",
                  5000,
                  "#c7e9b4",
                  7500,
                  "#7fcdbb",
                  10000,
                  "#41b6c4",
                  12500,
                  "#1d91c0",
                  15000,
                  "#225ea8",
                  17500,
                  "#253494",
                  20000,
                  "#081d58",
                  22000,
                  "red"
                ],
                "fill-outline-color": "gray",
                "fill-opacity": 0.89
              }
            },
            {
              layerID: "layer-02",
              layerType: "fill",
              sourceLayer: "us-counties",
              paint: {
                "fill-color": "green",
                "fill-outline-color": "gray",
                "fill-opacity": 0.9
              }
            }
          ],
          GROUP_IDS.DESIGN
        );

        return (
          <div css={containerWrapper}>
            <BaseMap
              initialLatitude={39.810492}
              initialLongitude={-98.556061}
              initialZoom={4}
              minZoom={3}
              maxZoom={14}
              useScrollZoom
              useContainerHeight
              updateViewport={false}
              civicMapStyle={civicMapStyle}
            >
              <VectorTilesMap
                vectorTilesID={vectorTilesID}
                vectorTilesURL={vectorTilesURL}
                layerPosition={layerPosition}
                multipleLayers={multipleLayers}
              />
            </BaseMap>
          </div>
        );
      },
      { notes }
    );
