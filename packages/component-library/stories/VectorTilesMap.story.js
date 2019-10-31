import { storiesOf } from "@storybook/react";
import { withKnobs, text, object, select } from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";
import { jsx, css } from "@emotion/core";
import { BaseMap, VectorTilesMap } from "../src";
/** @jsx jsx */
import notes from "./vectorTilesMap.notes.md";

const GROUP_IDS = {
  DESIGN: "Design"
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
    );
