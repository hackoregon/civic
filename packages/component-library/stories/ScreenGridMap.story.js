import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { withKnobs, number, select } from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";
import { BaseMap } from "../src";
import { ScreenGridMap } from "../src";
import { DemoJSONLoader } from "../src";

const displayName = ScreenGridMap.displayName || "ScreenGridMap";

export default () =>
  storiesOf("Maps/Screen Grid Map", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add("Simple usage", () => (
      <DemoJSONLoader
        urls={[
          "https://service.civicpdx.org/transportation-systems/sandbox/slides/crashes/"
        ]}
      >
        {data => {
          if (data === null) {
            return null;
          }

          const opacityOptions = {
            range: true,
            min: 0,
            max: 1,
            step: 0.05
          };
          const opacity = number("Opacity:", 0.8, opacityOptions);

          const colorSchemeOptions = {
            Thermal:
              "[[255,237,160],[254,217,118],[254,178,76],[253,141,60],[252,78,42],[227,26,28],[189,0,38],[128,0,38]]",
            Planet:
              "[[231,225,239],[212,185,218],[201,148,199],[223,101,176],[231,41,138],[206,18,86],[152,0,67],[103,0,31]]",
            Space:
              "[[224,236,244],[191,211,230],[158,188,218],[140,150,198],[140,107,177],[136,65,157],[129,15,124],[77,0,75]]",
            Earth:
              "[[236,226,240],[208,209,230],[166,189,219],[103,169,207],[54,144,192],[2,129,138],[1,108,89],[1,70,54]]",
            Ocean:
              "[[237,248,177],[199,233,180],[127,205,187],[65,182,196],[29,145,192],[34,94,168],[37,52,148],[8,29,88]]"
          };
          const colorScheme = select(
            "Color Scheme:",
            colorSchemeOptions,
            colorSchemeOptions.Planet
          );
          const colorSchemeArray = JSON.parse(colorScheme);

          const cellSizeOptions = {
            range: true,
            min: 1,
            max: 100,
            step: 1
          };
          const cellSize = number("Cell Size:", 15, cellSizeOptions);

          return (
            <BaseMap>
              <ScreenGridMap
                data={data.slide_data.features}
                getPosition={f => f.geometry.coordinates}
                opacity={opacity}
                colorRange={colorSchemeArray}
                cellSizePixels={cellSize}
              />
            </BaseMap>
          );
        }}
      </DemoJSONLoader>
    ));
