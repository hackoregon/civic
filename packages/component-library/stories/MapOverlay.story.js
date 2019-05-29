/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  select,
  object,
  boolean,
  number
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { scaleQuantize, extent } from "d3";
import { BaseMap, MapOverlay, MapTooltip, DemoJSONLoader } from "../src";
import notes from "./mapOverlay.notes.md";

const GROUP_IDS = {
  MARKER: "Polygon",
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

const CIVIC_API_URL =
  "http://service.civicpdx.org/disaster-resilience/api/DisasterNeighborhoodView/?format=json&limit=100";

export default () =>
  storiesOf("Component Lib|Maps/Map Overlay", module)
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
              // eslint-disable-next-line
              const singleFeatureObj = object(
                "Data: First Feature Object from GeoJSON",
                data.results.features.slice(0, 1),
                GROUP_IDS.DATA
              );
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

        const filled = boolean("Filled", true, GROUP_IDS.CUSTOM);
        const stroked = boolean("Stroked", true, GROUP_IDS.CUSTOM);
        const autoHighlight = boolean("autoHighlight", true, GROUP_IDS.CUSTOM);
        const highlightColor = object(
          "highlightColor",
          [255, 255, 0, 155],
          GROUP_IDS.CUSTOM
        );
        const onLayerClick = info => action("Layer Clicked:")(info);
        return (
          <DemoJSONLoader urls={[CIVIC_API_URL]}>
            {data => {
              // eslint-disable-next-line
              const singleFeatureObj = object(
                "Data: First Feature Object from GeoJSON",
                data.results.features.slice(0, 1),
                GROUP_IDS.DATA
              );
              return (
                <BaseMap>
                  <MapOverlay
                    data={data.results.features}
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
        const propertyFieldName = "injuriestotal_day";

        return (
          <DemoJSONLoader urls={[CIVIC_API_URL]}>
            {data => {
              const findDataMinMax = extent(data.results.features, f =>
                parseFloat(f.properties[propertyFieldName])
              );
              const colorScale = scaleQuantize()
                .domain(findDataMinMax)
                .range(colorSchemeOptions[colorScheme]);

              return (
                <BaseMap>
                  <MapOverlay
                    data={data.results.features}
                    getFillColor={f =>
                      colorScale(f.properties[propertyFieldName])
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
      "Example: With Tooltip",
      () => {
        return (
          <DemoJSONLoader urls={[CIVIC_API_URL]}>
            {data => (
              <BaseMap>
                <MapOverlay
                  data={data.results.features}
                  getFillColor={[25, 183, 170]}
                >
                  <MapTooltip
                    primaryName="Earthquake - Total Day Injuries"
                    primaryField="injuriestotal_day"
                    secondaryName="Earthquake - Total Night Injuries"
                    secondaryField="injuriestotal_night"
                  />
                </MapOverlay>
              </BaseMap>
            )}
          </DemoJSONLoader>
        );
      },
      { notes }
    );
