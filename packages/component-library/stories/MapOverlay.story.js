/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  select,
  object,
  optionsKnob as options,
  boolean,
  number,
  text
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { scaleQuantize, extent } from "d3";
import { at } from "lodash";
import {
  civicFormat,
  BaseMap,
  MapOverlay,
  MapTooltip,
  DemoJSONLoader
} from "../src";
import { getKeyNames } from "./shared";
import notes from "./mapOverlay.notes.md";

const GROUP_IDS = {
  MARKER: "Design",
  DATA: "Data",
  CUSTOM: "Custom"
};

const opacityOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.05
};

const strokeWidthOptions = {
  range: true,
  min: 0,
  max: 200,
  step: 1
};

const colorSchemeOptions = {
  Thermal: [
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38]
  ],
  Planet: [
    [247, 244, 249],
    [231, 225, 239],
    [212, 185, 218],
    [201, 148, 199],
    [223, 101, 176],
    [231, 41, 138],
    [206, 18, 86],
    [152, 0, 67],
    [103, 0, 31]
  ],
  Space: [
    [247, 252, 253],
    [224, 236, 244],
    [191, 211, 230],
    [158, 188, 218],
    [140, 150, 198],
    [140, 107, 177],
    [136, 65, 157],
    [129, 15, 124],
    [77, 0, 75]
  ],
  Earth: [
    [255, 247, 251],
    [236, 226, 240],
    [208, 209, 230],
    [166, 189, 219],
    [103, 169, 207],
    [54, 144, 192],
    [2, 129, 138],
    [1, 108, 89],
    [1, 70, 54]
  ],
  Ocean: [
    [255, 255, 217],
    [237, 248, 177],
    [199, 233, 180],
    [127, 205, 187],
    [65, 182, 196],
    [29, 145, 192],
    [34, 94, 168],
    [37, 52, 148],
    [8, 29, 88]
  ]
};

const CIVIC_API_URL =
  "https://service.civicpdx.org/disaster-resilience/api/DisasterNeighborhoodView/?format=json&limit=102";

export default () =>
  storiesOf("Component Lib/Maps/Map Overlay", module)
    .addDecorator(checkA11y)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const getFillColor = object(
          "Fill Color:",
          [25, 183, 170],
          GROUP_IDS.MARKER
        );
        const getLineColor = object(
          "Stroke Color",
          [112, 122, 122],
          GROUP_IDS.MARKER
        );
        const getLineWidth = number(
          "Stroke Width",
          1,
          strokeWidthOptions,
          GROUP_IDS.MARKER
        );
        const opacity = number(
          "Opacity:",
          0.9,
          opacityOptions,
          GROUP_IDS.MARKER
        );
        return (
          <DemoJSONLoader urls={[CIVIC_API_URL]}>
            {data => {
              return (
                <BaseMap>
                  <MapOverlay
                    data={data.results.features}
                    getFillColor={getFillColor}
                    getLineColor={getLineColor}
                    getLineWidth={getLineWidth}
                    opacity={opacity}
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
        const getFillColor = object(
          "Fill Color:",
          [25, 183, 170],
          GROUP_IDS.MARKER
        );
        const getLineColor = object(
          "Stroke Color",
          [112, 122, 122],
          GROUP_IDS.MARKER
        );
        const getLineWidth = number(
          "Stroke Width",
          1,
          strokeWidthOptions,
          GROUP_IDS.MARKER
        );
        const opacity = number(
          "Opacity:",
          0.9,
          opacityOptions,
          GROUP_IDS.MARKER
        );

        const filled = boolean("Filled:", true, GROUP_IDS.CUSTOM);
        const stroked = boolean("Stroked:", true, GROUP_IDS.CUSTOM);
        const autoHighlight = boolean(
          "Auto Highlight:",
          true,
          GROUP_IDS.CUSTOM
        );
        const highlightColor = object(
          "Highlight Color:",
          [255, 255, 0, 155],
          GROUP_IDS.CUSTOM
        );

        const onLayerClick = info => action("Layer Clicked:")(info);
        const fetchURL = text("Data API URL:", CIVIC_API_URL, GROUP_IDS.DATA);

        return (
          <DemoJSONLoader urls={[fetchURL]}>
            {data => {
              const featuresArrayPath = text(
                "Features Array Path:",
                "results.features",
                GROUP_IDS.DATA
              );
              const featuresData = at(data, featuresArrayPath)[0];
              return (
                <BaseMap initialZoom={9.99} updateViewport={false}>
                  <MapOverlay
                    data={featuresData}
                    filled={filled}
                    getFillColor={getFillColor}
                    stroked={stroked}
                    getLineColor={getLineColor}
                    getLineWidth={getLineWidth}
                    opacity={opacity}
                    autoHighlight={autoHighlight}
                    highlightColor={highlightColor}
                    onLayerClick={onLayerClick}
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
      "Example: Choropleth Map",
      () => {
        const colorOptions = {
          Thermal: "Thermal",
          Planet: "Planet",
          Space: "Space",
          Earth: "Earth",
          Ocean: "Ocean"
        };
        const colorScheme = select(
          "Fill Color:",
          colorOptions,
          colorOptions.Ocean,
          GROUP_IDS.MARKER
        );

        const onLayerClick = info => action("Layer Clicked:")(info);
        const fetchURL = text("Data API URL:", CIVIC_API_URL, GROUP_IDS.DATA);

        return (
          <DemoJSONLoader urls={[fetchURL]}>
            {data => {
              const featuresArrayPath = text(
                "Features Array Path:",
                "results.features",
                GROUP_IDS.DATA
              );

              const featuresData = at(data, featuresArrayPath)[0];

              const polygonFieldName = text(
                "Field Name - Polygons:",
                "injuriestotal_day",
                GROUP_IDS.DATA
              );

              const findDataMinMax = extent(featuresData, f =>
                parseFloat(f.properties[polygonFieldName])
              );

              const colorScale = scaleQuantize()
                .domain(findDataMinMax)
                .range(colorSchemeOptions[colorScheme]);

              return (
                <BaseMap initialZoom={9.9} updateViewport={false}>
                  <MapOverlay
                    data={featuresData}
                    getFillColor={f =>
                      colorScale(f.properties[polygonFieldName])
                    }
                    onLayerClick={onLayerClick}
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
      "Example: Choropleth + Circle Map",
      () => {
        const opacity = number(
          "Opacity:",
          0.9,
          opacityOptions,
          GROUP_IDS.MARKER
        );

        const colorOptions = {
          Thermal: "Thermal",
          Planet: "Planet",
          Space: "Space",
          Earth: "Earth",
          Ocean: "Ocean"
        };
        const colorScheme = select(
          "Fill Color - Polygons:",
          colorOptions,
          colorOptions.Ocean,
          GROUP_IDS.MARKER
        );
        const circleFillColor = object(
          "Fill Color - Circles:",
          [255, 182, 193, 200],
          GROUP_IDS.MARKER
        );
        const radiusScaleKnob = number(
          "Radius Scale:",
          50,
          {},
          GROUP_IDS.MARKER
        );
        const radiusScale = radiusScaleKnob || 1;

        const onLayerClick = info => action("Layer Clicked:")(info);
        const fetchURL = text("Data API URL:", CIVIC_API_URL, GROUP_IDS.DATA);

        return (
          <DemoJSONLoader urls={[fetchURL]}>
            {data => {
              const featuresArrayPath = text(
                "Features Array Path:",
                "results.features",
                GROUP_IDS.DATA
              );
              const featuresData = at(data, featuresArrayPath)[0];

              const polygonFieldName = text(
                "Field Name - Polygons:",
                "casualtiestotal_day",
                GROUP_IDS.DATA
              );

              const circleFieldName = text(
                "Field Name - Circles:",
                "casualtiestotal_night",
                GROUP_IDS.DATA
              );

              const polygonMinMax = extent(featuresData, f =>
                parseFloat(f.properties[polygonFieldName])
              );
              const polygonColorScale = scaleQuantize()
                .domain(polygonMinMax)
                .range(colorSchemeOptions[colorScheme]);

              return (
                <BaseMap initialZoom={9.99} updateViewport={false}>
                  <MapOverlay
                    data={featuresData}
                    opacity={opacity}
                    getFillColor={f => {
                      return f.geometry.type === "Point"
                        ? circleFillColor
                        : f.geometry.type === "Polygon" ||
                          f.geometry.type === "MultiPolygon"
                        ? polygonColorScale(f.properties[polygonFieldName])
                        : [0, 0, 0];
                    }}
                    radiusScale={radiusScale}
                    circleFieldName={circleFieldName}
                    onLayerClick={onLayerClick}
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
      "Example: With Tooltip",
      () => {
        const onLayerClick = info => action("Layer Clicked:")(info);

        const formatOption = options(
          "Tooltip value format",
          getKeyNames(civicFormat),
          "numericShort",
          { display: "select" },
          GROUP_IDS.LABELS
        );

        return (
          <DemoJSONLoader urls={[CIVIC_API_URL]}>
            {data => (
              <BaseMap>
                <MapOverlay
                  data={data.results.features}
                  getFillColor={[25, 183, 170]}
                  onLayerClick={onLayerClick}
                >
                  <MapTooltip
                    primaryName="Earthquake - Total Day Injuries"
                    primaryField="injuriestotal_day"
                    secondaryName="Earthquake - Total Night Injuries"
                    secondaryField="injuriestotal_night"
                    formatPrimaryField={f => civicFormat[formatOption](f)}
                    formatSecondaryField={f => civicFormat[formatOption](f)}
                  />
                </MapOverlay>
              </BaseMap>
            )}
          </DemoJSONLoader>
        );
      },
      { notes }
    );
