import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { BaseMap, ScatterPlotMap, MapTooltip, DemoJSONLoader } from "../src";

const opacityOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.05
};

const getPosition = f =>
  f.geometry ? f.geometry.coordinates : [-124.664355, 45.615779];

const getCircleColor = f =>
  f.properties.year_2017 > 1000 ? [255, 0, 0, 255] : [0, 0, 255, 255];

const getCircleRadius = f => Math.sqrt(f.properties.year_2017 / Math.PI) * 15;

const radiusScaleOptions = {
  range: true,
  min: 0,
  max: 25,
  step: 0.5
};

const strokeWidthOptions = {
  range: true,
  min: 0,
  max: 20,
  step: 0.5
};

const highlightColor = [255, 165, 0, 155];

const mapData = [
  "https://service.civicpdx.org/neighborhood-development/sandbox/slides/bikecounts/"
];

const demoMap = () => (
  <DemoJSONLoader urls={mapData}>
    {data => {
      const opacity = number("Opacity:", 0.1, opacityOptions);
      const radiusScale = number("Radius Scale:", 1, radiusScaleOptions);
      const outline = boolean("Stroke Only:", false);
      const strokeWidth = number("Stroke Width:", 1, strokeWidthOptions);
      return (
        <BaseMap>
          <ScatterPlotMap
            data={data.slide_data.features}
            getPosition={getPosition}
            opacity={opacity}
            getColor={getCircleColor}
            getRadius={getCircleRadius}
            radiusScale={radiusScale}
            outline={outline}
            strokeWidth={strokeWidth}
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

const tooltipMap = () => (
  <DemoJSONLoader urls={mapData}>
    {data => {
      const opacity = number("Opacity:", 0.1, opacityOptions);
      const radiusScale = number("Radius Scale:", 1, radiusScaleOptions);
      const outline = boolean("Stroke Only:", false);
      const strokeWidth = number("Stroke Width:", 1, strokeWidthOptions);
      return (
        <BaseMap>
          <ScatterPlotMap
            data={data.slide_data.features}
            getPosition={getPosition}
            opacity={opacity}
            getColor={getCircleColor}
            getRadius={getCircleRadius}
            radiusScale={radiusScale}
            outline={outline}
            strokeWidth={strokeWidth}
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

export default () =>
  storiesOf("Maps/Scatterplot Map", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add("Simple usage", demoMap)
    .add("With tooltip", tooltipMap);
