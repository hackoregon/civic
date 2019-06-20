/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { BaseMap, CivicSandboxMap, DemoJSONLoader } from "../src";

const dataURLs = [
  "https://service.civicpdx.org/neighborhood-development/sandbox/foundations/over65/",
  "https://service.civicpdx.org/neighborhood-development/sandbox/foundations/under18/",
  "https://service.civicpdx.org/neighborhood-development/sandbox/slides/communitygardens/",
  "https://service.civicpdx.org/neighborhood-development/sandbox/slides/bikelanes/",
  "https://service.civicpdx.org/neighborhood-development/sandbox/slides/retailgrocers/"
];

const CivicSandboxMapStory = data => {
  if (data === null) return null;

  const [foundation1, foundation2, slide1, slide2, slide3] = data;

  const colorOptions = {
    Thermal:
      "[[255,255,204,255],[255,237,160,255],[254,217,118,255],[254,178,76,255],[253,141,60,255],[252,78,42,255],[227,26,28,255],[189,0,38,255],[128,0,38,255]]",
    Planet:
      "[[247,244,249,255],[231,225,239,255],[212,185,218,255],[201,148,199,255],[223,101,176,255],[231,41,138,255],[206,18,86,255],[152,0,67,255],[103,0,31,255]]",
    Space:
      "[[247,252,253,255],[224,236,244,255],[191,211,230,255],[158,188,218,255],[140,150,198,255],[140,107,177,255],[136,65,157,255],[129,15,124,255],[77,0,75,255]]",
    Earth:
      "[[255,247,251,255],[236,226,240,255],[208,209,230,255],[166,189,219,255],[103,169,207,255],[54,144,192,255],[2,129,138,255],[1,108,89,255],[1,70,54,255]]",
    Ocean:
      "[[255,255,217,255],[237,248,177,255],[199,233,180,255],[127,205,187,255],[65,182,196,255],[29,145,192,255],[34,94,168,255],[37,52,148,255],[8,29,88,255]]"
  };
  const colorScheme = select(
    "Color Schemes:",
    colorOptions,
    colorOptions.Earth
  );
  const colorSchemeArray = JSON.parse(colorScheme);

  const foundations = {
    "025-households-seniors": {
      mapType: "ChoroplethMap",
      id: "choropleth-layer-foundation-households-seniors",
      opacity: 0.7,
      data: foundation1.slide_data.features,
      getLineColor: () => [0, 0, 0, 255],
      getLineWidth: () => 0.1,
      scaleType: "equal",
      color: colorSchemeArray,
      getPropValue: f => f.properties.pc_household_with_individuals_65_ovr,
      propName: "pc_household_with_individuals_65_ovr",
      onLayerClick: info => action("Layer clicked:")(info.object),
      updateTriggers: { getFillColor: colorSchemeArray }
    },
    "015-household-children": {
      mapType: "ChoroplethMap",
      id: "choropleth-layer-foundation-household-children",
      opacity: 0.7,
      data: foundation2.slide_data.features,
      getLineColor: () => [0, 0, 0, 255],
      getLineWidth: () => 0.1,
      scaleType: "equal",
      color: colorSchemeArray,
      getPropValue: f => f.properties.pc_household_with_children_under_18,
      propName: "pc_household_with_children_under_18",
      onLayerClick: info => action("Layer clicked:")(info.object),
      updateTriggers: { getFillColor: colorSchemeArray }
    }
  };

  // SLIDES
  // 005 Community Gardens
  const gardensBoundary = {
    mapType: "BoundaryMap",
    id: "boundary-layer-gardens-slide",
    data: slide1.slide_meta.boundary,
    opacity: 1.0,
    getPolygon: f => f.coordinates,
    getLineColor: () => [25, 183, 170, 255],
    getLineWidth: () => 45,
    filled: false
  };
  const gardensMap = {
    mapType: "SmallPolygonMap",
    id: "polygon-layer-gardens-slide",
    pickable: true,
    data: slide1.slide_data.features,
    opacity: 1,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: () => [25, 183, 170, 255],
    getLineWidth: () => 5,
    stroked: true,
    getFillColor: () => [25, 183, 170, 255],
    filled: true,
    autoHighlight: true,
    highlightColor: [25, 183, 170, 25]
  };

  // 002 Bike Lanes
  const bikeLanesBoundary = {
    mapType: "BoundaryMap",
    id: "boundary-layer-bike-lanes",
    data: slide2.slide_meta.boundary,
    opacity: 1.0,
    getPolygon: f => f.coordinates,
    getLineColor: () => [255, 178, 38, 255],
    getLineWidth: () => 45,
    filled: false
  };
  const bikeLanesMap = {
    mapType: "PathMap",
    id: "path-layer-bike-lanes",
    pickable: true,
    data: slide2.slide_data.features,
    opacity: 1,
    getColor: () => [255, 178, 38, 255],
    getPath: f => f.geometry.coordinates,
    getWidth: () => 25,
    rounded: false,
    autoHighlight: true,
    highlightColor: [100, 100, 100, 100]
  };

  // 010 Grocery Stores
  const groceryBoundary = {
    mapType: "BoundaryMap",
    id: "boundary-layer-grocery",
    data: slide3.slide_meta.boundary,
    opacity: 1.0,
    getPolygon: f => f.coordinates,
    getLineColor: () => [114, 29, 124, 255],
    getLineWidth: () => 45,
    filled: false
  };
  const groceryMap = {
    mapType: "ScatterPlotMap",
    id: "scatterplot-layer-grocery",
    pickable: true,
    data: slide3.slide_data.features,
    getPosition: f => f.geometry.coordinates,
    opacity: 0.9,
    getFillColor: () => [114, 29, 124, 255],
    getLineColor: () => [114, 29, 124, 255],
    stroked: true,
    getRadius: () => 50,
    radiusScale: 1,
    radiusMinPixels: 1,
    autoHighlight: true,
    highlightColor: [100, 100, 100, 100],
    parameters: { depthTest: false }
  };

  // Foundations
  const foundationOptions = {
    "Households with Seniors": "025-households-seniors",
    "Households with Children": "015-household-children"
  };
  const foundationSelected = select(
    "Foundations:",
    foundationOptions,
    foundationOptions["Households with Seniors"]
  );

  // Slides
  const bikeLanesSlideVisible = boolean("Bike Lanes:", true);
  const gardensSlideVisible = boolean("Community Gardens:", true);
  const grocerySlideVisible = boolean("Grocery Stores:", true);

  const allMapLayers = [
    {
      data: foundations[foundationSelected],
      visible: true
    },
    {
      data: bikeLanesBoundary,
      visible: bikeLanesSlideVisible
    },
    {
      data: bikeLanesMap,
      visible: bikeLanesSlideVisible
    },
    {
      data: gardensBoundary,
      visible: gardensSlideVisible
    },
    {
      data: gardensMap,
      visible: gardensSlideVisible
    },
    {
      data: groceryBoundary,
      visible: grocerySlideVisible
    },
    {
      data: groceryMap,
      visible: grocerySlideVisible
    }
  ];

  const mapLayersArray = allMapLayers.filter(d => {
    if (d.visible === true) return d.data;
  });

  return (
    <div>
      <BaseMap initialZoom={10} updateViewport={false}>
        <CivicSandboxMap mapLayers={mapLayersArray} />
      </BaseMap>
    </div>
  );
};

export default () =>
  storiesOf("Component Lib|Maps/CIVIC Sandbox Map", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add("Simple usage", () => {
      return (
        <DemoJSONLoader urls={dataURLs}>
          {data => CivicSandboxMapStory(data)}
        </DemoJSONLoader>
      );
    });
