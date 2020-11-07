import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean, color } from "@storybook/addon-knobs";

import { BaseMap, BoundaryMap, PathMap, DemoJSONLoader } from "../src";

const mapData = [
  "https://service.civicpdx.org/neighborhood-development/sandbox/slides/bikelanes/"
];

const demoMap = () => (
  <DemoJSONLoader urls={mapData}>
    {data => {
      const getPolygon = d => d.coordinates;

      const colorPicker = color("Boundary Color:", "#19B7AA");

      const colorOption1 = colorPicker
        .slice(5, -1)
        .split(",")
        .map(n => parseInt(n, 10))
        .filter((n, i) => i < 3);

      const colorOption2 = [25, 183, 170, 255];

      const boundaryColor =
        colorPicker.charAt(0) !== "#" ? colorOption1 : colorOption2;

      const getLineColor = () => boundaryColor;

      const getLineWidth = () => 45;

      const lineWidthScaleOptions = {
        range: true,
        min: 1,
        max: 10,
        step: 1
      };

      const lineWidthScale = number(
        "Boundary Width Scale:",
        1,
        lineWidthScaleOptions
      );

      const filled = boolean("Boundary Filled:", false);

      return (
        <BaseMap initialZoom={10.25} initialLatitude={45.5381}>
          <BoundaryMap
            data={data.slide_meta.boundary}
            opacity={1.0}
            filled={filled}
            getPolygon={getPolygon}
            getLineColor={getLineColor}
            getFillColor={getLineColor}
            getLineWidth={getLineWidth}
            lineWidthScale={lineWidthScale}
          />
          <PathMap
            data={data.slide_data.features}
            getColor={() => [255, 178, 38, 255]}
            opacity={1}
            getPath={f => f.geometry.coordinates}
            getWidth={() => 40}
            widthScale={1}
            rounded
            highlightColor={[200, 200, 200, 85]}
          />
        </BaseMap>
      );
    }}
  </DemoJSONLoader>
);

export default () =>
  storiesOf("Component Lib/Maps/Boundary Map", module)
    .addDecorator(withKnobs)
    .add("Simple usage", demoMap);
