/* eslint-disable */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, number, text } from "@storybook/addon-knobs";
// import { action } from "@storybook/addon-actions";
import { BaseMap, ComparisonMap, MapOverlay, DemoJSONLoader } from "../src";
// import { css } from "emotion";

const GROUP_IDS = {
  DESIGN: "Design",
  DATA: "Data"
};

const MAP_STYLE_OPTIONS = {
  light: "light",
  dark: "dark",
  disaster: "disaster-game"
};

const heightOptions = {
  range: true,
  min: 100,
  max: 1500,
  step: 25
};

const API_URL =
  "https://gist.githubusercontent.com/mendozaline/ab3da9bb53c17bf95690f9bf9fdd3e5a/raw/9b39324ea3df7e6e2cebc7aab7b1868289947ff3/test.json";

export default () =>
  storiesOf("Component Lib|Maps/Comparison Map", module)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const civicMapStyleLeft = select(
          "CIVIC Map Styles - left:",
          MAP_STYLE_OPTIONS,
          MAP_STYLE_OPTIONS.light,
          GROUP_IDS.DESIGN
        );

        const civicMapStyleRight = select(
          "CIVIC Map Styles - right:",
          MAP_STYLE_OPTIONS,
          MAP_STYLE_OPTIONS.dark,
          GROUP_IDS.DESIGN
        );

        const height = number("Height:", 550, heightOptions, GROUP_IDS.DESIGN);

        const sliderStartPosition = 50;

        const initialViewport = {
          latitude: 45.5780256,
          longitude: -122.3997374,
          zoom: 9
        };

        const fetchURL = text("Data API URL:", API_URL, GROUP_IDS.DATA);

        return (
          <DemoJSONLoader urls={[fetchURL]}>
            {data => {
              const leftMap = (
                <BaseMap
                  civicMapStyle={civicMapStyleLeft}
                  height={height}
                  mapGLOptions={{ keyboard: false }}
                >
                  <MapOverlay
                    data={data.features}
                    getFillColor={[255, 0, 0, 100]}
                    autoHighlight
                  />
                </BaseMap>
              );

              const rightMap = (
                <BaseMap
                  civicMapStyle={civicMapStyleRight}
                  height={height}
                  mapGLOptions={{ keyboard: true }}
                  navigation={false}
                >
                  <MapOverlay
                    data={data.features}
                    getFillColor={[0, 0, 255, 100]}
                    autoHighlight
                  />
                </BaseMap>
              );

              return (
                <ComparisonMap
                  leftMap={leftMap}
                  rightMap={rightMap}
                  height={height}
                  sliderStartPosition={sliderStartPosition}
                  initialViewport={initialViewport}
                />
              );
            }}
          </DemoJSONLoader>
        );
      },
      {}
    );
