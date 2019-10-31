import { storiesOf } from "@storybook/react";
import { withKnobs, text, object, select } from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";
import { jsx, css } from "@emotion/core";
import { BaseMap, VectorTilesMap } from "../src";
/** @jsx jsx */
import notes from "./vectorTilesMap.notes.md";

const GROUP_IDS = {
  DESIGN: "Design",
  "VECTOR TILES MAP 1": "Vector Tiles Map 1",
  "VECTOR TILES MAP 2": "Vector Tiles Map 2"
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
          GROUP_IDS["VECTOR TILES MAP 01"]
        );

        const layerType01 = text(
          "Type - 01:",
          "line",
          GROUP_IDS["VECTOR TILES MAP 01"]
        );

        const sourceLayer01 = text(
          "Source Layer - 01:",
          "contour",
          GROUP_IDS["VECTOR TILES MAP 01"]
        );

        const paint01 = object(
          "Paint - 01:",
          {
            "line-color": "fuchsia",
            "line-width": 1
          },
          GROUP_IDS["VECTOR TILES MAP 01"]
        );

        const layerPosition01 = text(
          "Layer Position - 01:",
          "waterway-label",
          GROUP_IDS["VECTOR TILES MAP 01"]
        );

        const vectorTilesURL02 = text(
          "Mapbox Tileset URL - 02:",
          "mapbox://mapbox.mapbox-streets-v8",
          GROUP_IDS["VECTOR TILES MAP 02"]
        );

        const layerType02 = text(
          "Type - 02:",
          "fill",
          GROUP_IDS["VECTOR TILES MAP 02"]
        );

        const sourceLayer02 = text(
          "Source Layer - 02:",
          "water",
          GROUP_IDS["VECTOR TILES MAP 02"]
        );

        const paint02 = object(
          "Paint - 02:",
          {
            "fill-color": "yellow",
            "fill-opacity": 0.75
          },
          GROUP_IDS["VECTOR TILES MAP 02"]
        );

        const layerPosition02 = text(
          "Layer Position - 02:",
          "bridge-path",
          GROUP_IDS["VECTOR TILES MAP 02"]
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
    );
