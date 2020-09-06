import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  number,
  select,
  object,
  boolean
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { BaseMap, ScreenGridMap, DemoJSONLoader } from "../src";
import notes from "./ScreenGridMap.notes.md";

const mapData = [
  "https://service.civicpdx.org/transportation-systems/sandbox/slides/crashes/"
];

const GROUP_IDS = {
  MARKER: "Marker",
  DATA: "Data"
};

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

const cellSizeOptions = {
  range: true,
  min: 1,
  max: 100,
  step: 1
};

const opacityOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.05
};

export default () =>
  storiesOf("Component Lib/Maps/Screen Grid Map", module)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const opacity = number(
          "Opacity:",
          0.8,
          opacityOptions,
          GROUP_IDS.MARKER
        );

        const colorScheme = select(
          "Color Scheme:",
          colorSchemeOptions,
          colorSchemeOptions.Planet,
          GROUP_IDS.MARKER
        );
        const colorSchemeArray = JSON.parse(colorScheme);

        const cellSize = number(
          "Cell Size:",
          15,
          cellSizeOptions,
          GROUP_IDS.MARKER
        );
        return (
          <DemoJSONLoader urls={mapData}>
            {allData => {
              const data = object(
                "Data",
                allData.slide_data.features,
                GROUP_IDS.DATA
              );
              return (
                <BaseMap>
                  <ScreenGridMap
                    data={data}
                    getPosition={f => f.geometry.coordinates}
                    opacity={opacity}
                    colorRange={colorSchemeArray}
                    cellSizePixels={cellSize}
                  />
                </BaseMap>
              );
            }}
          </DemoJSONLoader>
        );
      },
      { notes }
    )
    .add(
      "Custom",
      () => {
        const opacity = number(
          "Opacity:",
          0.8,
          opacityOptions,
          GROUP_IDS.MARKER
        );

        const colorScheme = select(
          "Color Scheme:",
          colorSchemeOptions,
          colorSchemeOptions.Planet,
          GROUP_IDS.MARKER
        );
        const colorSchemeArray = JSON.parse(colorScheme);

        const cellSize = number(
          "Cell Size:",
          15,
          cellSizeOptions,
          GROUP_IDS.MARKER
        );

        const autoHighlight = boolean(
          "Auto Highlight:",
          true,
          GROUP_IDS.MARKER
        );

        return (
          <DemoJSONLoader urls={mapData}>
            {allData => {
              const data = object(
                "Data",
                allData.slide_data.features,
                GROUP_IDS.DATA
              );
              return (
                <BaseMap>
                  <ScreenGridMap
                    data={data}
                    getPosition={f => f.geometry.coordinates}
                    opacity={opacity}
                    colorRange={colorSchemeArray}
                    cellSizePixels={cellSize}
                    autoHighlight={autoHighlight}
                    onLayerClick={info =>
                      action("Layer clicked:", { depth: 2 })(info, info.object)
                    }
                  />
                </BaseMap>
              );
            }}
          </DemoJSONLoader>
        );
      },
      { notes }
    );
