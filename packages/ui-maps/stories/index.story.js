/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";

// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator import injection
import polygonPreviewStory from "./PolygonPreview.story"; // TODO: Move this to the appropriate location
import baseMapStory from "./BaseMap.story";
import boundaryMapStory from "./BoundaryMap.story";
import multiLayerMapStory from "./MultiLayerMap.story";
import comparisonMapStory from "./ComparisonMap.story";
import heatMapStory from "./HeatMap.story";
import iconMapStory from "./IconMap.story";
import mapOverlayStory from "./MapOverlay.story";
import pathMapStory from "./PathMap.story";
import scatterPlotMapStory from "./ScatterPlotMap.story";
import screenGridMapStory from "./ScreenGridMap.story";
import vectorTilesMapStory from "./VectorTilesMap.story";

// maps
storiesOf("Component Lib/Maps", module)
  .addParameters({ options: { showPanel: false } })
  .addDecorator(checkA11y);
// .add("Maps Style Guide", () => <MapsStyle />);
baseMapStory();
boundaryMapStory();
heatMapStory();
iconMapStory();
mapOverlayStory();
pathMapStory();
scatterPlotMapStory();
screenGridMapStory();
multiLayerMapStory();
comparisonMapStory();
vectorTilesMapStory();
polygonPreviewStory();
