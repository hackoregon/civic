// import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, object } from "@storybook/addon-knobs";
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

export default () =>
  storiesOf("Component Lib|Maps/Vector Tiles Map", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add(
      "Standard",
      () => {
        const vectorTilesURL = text(
          "Mapbox Tileset URL:",
          "mapbox://themendozaline.dgpl66sy",
          GROUP_IDS.DESIGN
        );

        const type = text("Type:", "fill", GROUP_IDS.DESIGN);

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
              "#DC4556",
              "#201024"
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

        const LebanonKS = {
          latitude: 39.810492,
          longitude: -98.556061
        };

        return (
          <div css={containerWrapper}>
            <BaseMap
              initialLatitude={LebanonKS.latitude}
              initialLongitude={LebanonKS.longitude}
              initialZoom={4}
              minZoom={1}
              useScrollZoom
              useContainerHeight
              updateViewport={false}
            >
              <VectorTilesMap
                vectorTilesID="source-id-01"
                vectorTilesURL={vectorTilesURL}
                layerID="layer-id-01"
                layerType={type}
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
