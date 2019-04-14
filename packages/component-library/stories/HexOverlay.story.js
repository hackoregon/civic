import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";
import { HexOverlay } from "../src";
import { BaseMap } from "../src";
import { MapTooltip } from "../src";
import { DemoJSONLoader } from "../src";

const displayName = HexOverlay.displayName || "HexOverlay";

export default () =>
  storiesOf("Component Lib|Maps/Hex Overlay", module)
    .addDecorator(checkA11y)
    .addDecorator(withKnobs)
    .add("With tooltip", () => (
      <DemoJSONLoader
        urls={[
          "https://service.civicpdx.org/neighborhood-development/sandbox/slides/bikeparking/"
        ]}
      >
        {data => {
          if (data.features === null) {
            return null;
          }

          const coverageOptions = {
            range: true,
            min: 0,
            max: 1,
            step: 0.05
          };

          const radiusOptions = {
            range: true,
            min: 1,
            max: 1000,
            step: 0.1
          };

          const colorRange = [
            [1, 152, 189],
            [73, 227, 206],
            [216, 254, 181],
            [254, 237, 177],
            [254, 173, 84],
            [209, 55, 78]
          ];

          const lightSettings = {
            lightsPosition: [
              -0.144528,
              49.739968,
              8000,
              -3.807751,
              54.104682,
              8000
            ],
            ambientRatio: 0.4,
            diffuseRatio: 0.6,
            specularRatio: 0.2,
            lightsStrength: [0.8, 0.0, 0.8, 0.0],
            numberOfLights: 2
          };

          const elevationOptions = {
            range: true,
            min: 1,
            max: 50,
            step: 1
          };

          const coverage = number("Coverage:", 0.8, coverageOptions);
          const radius = number("Radius", 500, radiusOptions);
          const elevation = number("Elevation:", 10, elevationOptions);

          return (
            <BaseMap>
              <HexOverlay
                data={data.slide_data.features}
                opacity={1.0}
                coverage={coverage}
                radius={radius}
                elevation={elevation}
                colorRange={colorRange}
                lightSettings={lightSettings}
                filled={true}
                wireframe={true}
              >
                <MapTooltip isHex />
              </HexOverlay>
            </BaseMap>
          );
        }}
      </DemoJSONLoader>
    ));
