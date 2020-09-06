import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  boolean,
  select,
  number,
  text
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { at } from "lodash";
import { scaleQuantize, extent } from "d3";
import {
  BaseMap,
  ComparisonMap,
  MapOverlay,
  DemoJSONLoader,
  VisualizationColors
} from "../src";
import notes from "./comparisonMap.notes.md";

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

const sequentialColorOptions = {
  thermal: VisualizationColors.sequential.thermal,
  planet: VisualizationColors.sequential.planet,
  space: VisualizationColors.sequential.space,
  earth: VisualizationColors.sequential.earth,
  ocean: VisualizationColors.sequential.ocean
};

const selectColorOptions = {
  thermal: "thermal",
  planet: "planet",
  space: "space",
  earth: "earth",
  ocean: "ocean"
};

const API_URL =
  "https://gist.githubusercontent.com/mendozaline/ab3da9bb53c17bf95690f9bf9fdd3e5a/raw/9b39324ea3df7e6e2cebc7aab7b1868289947ff3/test.json";

export default () =>
  storiesOf("Component Lib/Maps/Comparison Map", module)
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
          zoom: 9.1
        };

        const leftMapColorScheme = select(
          "Color Scheme - Left:",
          selectColorOptions,
          "thermal",
          GROUP_IDS.DESIGN
        );

        const rightMapColorScheme = select(
          "Color Scheme - Right:",
          selectColorOptions,
          "ocean",
          GROUP_IDS.DESIGN
        );

        const showDivider = boolean("Show Divider", true, GROUP_IDS.DESIGN);
        const leftMapTitle = text("Map Title - Left", "", GROUP_IDS.DESIGN);
        const rightMapTitle = text("Map Title - Right", "", GROUP_IDS.DESIGN);

        const leftTitleColor = text(
          "Map color - Left",
          "black",
          GROUP_IDS.DESIGN
        );
        const rightTitleColor = text(
          "Title Color - Right",
          "white",
          GROUP_IDS.DESIGN
        );

        const onLayerClick = info => action("Layer Clicked:")(info);
        const fetchURL = text("Data API URL:", API_URL, GROUP_IDS.DATA);

        return (
          <DemoJSONLoader urls={[fetchURL]}>
            {data => {
              const featuresArrayPath = text(
                "Features Array Path:",
                "features",
                GROUP_IDS.DATA
              );
              const featuresData = at(data, featuresArrayPath)[0];

              const leftMapDataProperty = text(
                "Field Name - Left:",
                "IncomeMedianHH",
                GROUP_IDS.DATA
              );
              const leftColorScale = scaleQuantize()
                .domain(
                  extent(featuresData, d => +d.properties[leftMapDataProperty])
                )
                .range(sequentialColorOptions[leftMapColorScheme]);

              const rightMapDataProperty = text(
                "Field Name - Right:",
                "Pct_RegisteredVoters",
                GROUP_IDS.DATA
              );
              const rightColorScale = scaleQuantize()
                .domain(
                  extent(featuresData, d => +d.properties[rightMapDataProperty])
                )
                .range(sequentialColorOptions[rightMapColorScheme]);

              const leftMap = (
                <BaseMap civicMapStyle={civicMapStyleLeft} height={height}>
                  <MapOverlay
                    data={featuresData}
                    getFillColor={f =>
                      leftColorScale(+f.properties[leftMapDataProperty])
                    }
                    onLayerClick={onLayerClick}
                  />
                </BaseMap>
              );

              const rightMap = (
                <BaseMap civicMapStyle={civicMapStyleRight} height={height}>
                  <MapOverlay
                    data={featuresData}
                    getFillColor={f =>
                      rightColorScale(+f.properties[rightMapDataProperty])
                    }
                    onLayerClick={onLayerClick}
                  />
                </BaseMap>
              );

              return (
                <ComparisonMap
                  height={height}
                  initialViewport={initialViewport}
                  leftMap={leftMap}
                  leftMapTitle={leftMapTitle}
                  leftTitleColor={leftTitleColor}
                  rightMap={rightMap}
                  rightMapTitle={rightMapTitle}
                  rightTitleColor={rightTitleColor}
                  showDivider={showDivider}
                  sliderStartPosition={sliderStartPosition}
                />
              );
            }}
          </DemoJSONLoader>
        );
      },
      { notes }
    );
