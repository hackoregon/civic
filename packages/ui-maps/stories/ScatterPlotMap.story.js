import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  number,
  boolean,
  object,
  color
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { BaseMap, ScatterPlotMap, MapTooltip, DemoJSONLoader } from "../src";
import notes from "./ScatterPlotMap.notes.md";

const mapData = [
  "https://service.civicpdx.org/neighborhood-development/sandbox/slides/bikecounts/"
];

const highlightColor = [255, 165, 0, 155];

const colorOption2 = [25, 183, 170, 255];

const GROUP_IDS = {
  MARKER: "Marker",
  DATA: "Data"
};

const opacityOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.05
};

const radiusScaleOptions = {
  range: true,
  min: 0,
  max: 25,
  step: 0.5
};

const lineWidthOptions = {
  range: true,
  min: 0,
  max: 20,
  step: 0.5
};

const getPosition = f =>
  f.geometry ? f.geometry.coordinates : [-124.664355, 45.615779];

const getFillColorDataDriven = f =>
  f.properties.year_2017 > 1000 ? [255, 0, 0, 255] : [0, 0, 255, 255];

const getLineColorDataDriven = f =>
  f.properties.year_2017 > 1000 ? [0, 0, 255, 255] : [255, 0, 0, 255];

const getCircleRadius = f => Math.sqrt(f.properties.year_2017 / Math.PI) * 15;

const colorOption1 = colorPicker => {
  return colorPicker
    .slice(5, -1)
    .split(",")
    .map(n => parseInt(n, 10))
    .filter((n, i) => i < 3);
};

export default () =>
  storiesOf("Component Lib/Maps/Scatterplot Map", module)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const getFillColor = object(
          "Fill Color",
          [25, 183, 170, 255],
          GROUP_IDS.MARKER
        );

        const opacity = number(
          "Opacity:",
          0.1,
          opacityOptions,
          GROUP_IDS.MARKER
        );

        const radiusScale = number(
          "Radius Scale:",
          1,
          radiusScaleOptions,
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
                  <ScatterPlotMap
                    data={data}
                    getPosition={getPosition}
                    opacity={opacity}
                    getFillColor={getFillColor}
                    radiusScale={radiusScale}
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
        const fillColorPicker = color(
          "Fill Color:",
          "#19B7AA",
          GROUP_IDS.MARKER
        );

        const getFillColor =
          fillColorPicker.charAt(0) !== "#"
            ? colorOption1(fillColorPicker)
            : colorOption2;

        const opacity = number(
          "Opacity:",
          0.1,
          opacityOptions,
          GROUP_IDS.MARKER
        );

        const radiusScale = number(
          "Radius Scale:",
          1,
          radiusScaleOptions,
          GROUP_IDS.MARKER
        );

        const stroked = boolean("Stroked:", false, GROUP_IDS.MARKER);

        const lineColorPicker = color(
          "Stroke Line Color:",
          "#19B7AA",
          GROUP_IDS.MARKER
        );

        const getLineColor =
          lineColorPicker.charAt(0) !== "#"
            ? colorOption1(lineColorPicker)
            : colorOption2;

        const getLineWidth = number(
          "Stroke Line Width:",
          1,
          lineWidthOptions,
          GROUP_IDS.MARKER
        );

        const autoHighlight = boolean(
          "Auto Highlight:",
          true,
          GROUP_IDS.MARKER
        );

        const highlightColorPicker = color(
          "Highlight Color:",
          "#ffa500",
          GROUP_IDS.MARKER
        );

        const getHighlightColor =
          highlightColorPicker.charAt(0) !== "#"
            ? colorOption1(highlightColorPicker)
            : highlightColor;

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
                  <ScatterPlotMap
                    data={data}
                    getPosition={getPosition}
                    opacity={opacity}
                    getFillColor={getFillColor}
                    getLineColor={getLineColor}
                    getRadius={getCircleRadius}
                    radiusScale={radiusScale}
                    stroked={stroked}
                    getLineWidth={getLineWidth}
                    autoHighlight={autoHighlight}
                    highlightColor={getHighlightColor}
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
    )
    .add(
      "Examples: With Tooltip",
      () => {
        return (
          <DemoJSONLoader urls={mapData}>
            {data => {
              const fillColorPicker = color(
                "Fill Color:",
                "#19B7AA",
                GROUP_IDS.MARKER
              );

              const getFillColor =
                fillColorPicker.charAt(0) !== "#"
                  ? colorOption1(fillColorPicker)
                  : colorOption2;

              const opacity = number(
                "Opacity:",
                0.1,
                opacityOptions,
                GROUP_IDS.MARKER
              );
              const radiusScale = number(
                "Radius Scale:",
                1,
                radiusScaleOptions,
                GROUP_IDS.MARKER
              );
              return (
                <BaseMap>
                  <ScatterPlotMap
                    data={data.slide_data.features}
                    getPosition={getPosition}
                    opacity={opacity}
                    getFillColor={getFillColor}
                    getLineColor={getLineColorDataDriven}
                    getRadius={getCircleRadius}
                    radiusScale={radiusScale}
                    stroked={false}
                    getLineWidth={1}
                    autoHighlight
                    highlightColor={highlightColor}
                    onLayerClick={info =>
                      action("Layer clicked:", { depth: 2 })(info, info.object)
                    }
                  >
                    <MapTooltip
                      primaryName="Count Time"
                      primaryField="count_time"
                      secondaryName="Bike Count"
                      secondaryField="year_2017"
                    />
                  </ScatterPlotMap>
                </BaseMap>
              );
            }}
          </DemoJSONLoader>
        );
      },
      { notes }
    )
    .add(
      "Examples: Data Driven Styling",
      () => {
        const opacity = number(
          "Opacity:",
          0.1,
          opacityOptions,
          GROUP_IDS.MARKER
        );

        const radiusScale = number(
          "Radius Scale:",
          1,
          radiusScaleOptions,
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
                  <ScatterPlotMap
                    data={data}
                    getPosition={getPosition}
                    opacity={opacity}
                    getFillColor={getFillColorDataDriven}
                    getLineColor={getLineColorDataDriven}
                    getRadius={getCircleRadius}
                    radiusScale={radiusScale}
                    stroked={false}
                    getLineWidth={1}
                    autoHighlight
                    highlightColor={highlightColor}
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
