/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  text,
  number,
  select,
  object,
  optionsKnob as options
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { at } from "lodash";
import { BaseMap, MultiLayerMap, DemoJSONLoader } from "../src";

import notes from "./multiLayerMap.notes";

const GROUP_IDS = {
  DESIGN: "Design",
  DATA: "Data"
};

const CIVIC_COLORS = {
  "(none)": "",
  civicBlue: "civicBlue",
  civicGreen: "civicGreen",
  civicPurple: "civicPurple",
  civicPink: "civicPink",
  civicYellow: "civicYellow",
  thermal: "thermal",
  planet: "planet",
  space: "space",
  earth: "earth",
  ocean: "ocean",
  purpleGreen: "purpleGreen",
  purpleOrange: "purpleOrange"
};

const opacityOptions = {
  range: true,
  min: 0.1,
  max: 1,
  step: 0.05
};

const iconSizeOptions = {
  range: true,
  min: 1,
  max: 100,
  step: 1
};

export default () =>
  storiesOf("Component Lib/Maps/MultiLayer Map", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add(
      "Path Map",
      () => {
        const lineWidth = number("Line Width:", 25, {}, GROUP_IDS.DESIGN);

        const opacity = number(
          "Opacity:",
          0.7,
          opacityOptions,
          GROUP_IDS.DESIGN
        );

        const PATH_MAP_SCALE_TYPE_COLOR_OPTIONS = {
          none: "",
          threshold: "threshold",
          ordinal: "ordinal",
          equal: "equal"
        };

        const lineColor = select(
          "CIVIC Color:",
          CIVIC_COLORS,
          CIVIC_COLORS.civicGreen,
          GROUP_IDS.DESIGN
        );

        const scaleTypeColor = options(
          "Scale Type:",
          PATH_MAP_SCALE_TYPE_COLOR_OPTIONS,
          "",
          {
            display: "inline-radio"
          },
          GROUP_IDS.DESIGN
        );

        const fieldName = text("Field Name:", "shape_leng", GROUP_IDS.DESIGN);

        const dataRange = object("Data Range:", [], GROUP_IDS.DESIGN);

        const colorRange = object("Color Range:", [], GROUP_IDS.DESIGN);

        const pathMapAPIURL =
          "https://service.civicpdx.org/neighborhood-development/api/bike_greenways" +
          "?format=json&limit=280";

        const fetchURL = text("API URL:", pathMapAPIURL, GROUP_IDS.DATA);

        const onLayerClick = info => action("Line Clicked:")(info);

        return (
          <DemoJSONLoader urls={[fetchURL]}>
            {data => {
              const featuresArrayPath = text(
                "Features Array Path:",
                "results.features",
                GROUP_IDS.DATA
              );

              const featuresData = at(data, featuresArrayPath)[0];

              const pathMapLayer = {
                mapType: "PathMap",
                id: "storybook-pathmap-00",
                data: featuresData,
                lineWidth,
                opacity,
                civicColor: lineColor,
                scaleType: {
                  color: scaleTypeColor
                },
                fieldName: {
                  color: fieldName
                },
                dataRange,
                colorRange,
                onLayerClick
              };

              return (
                <div style={{ height: "100vh" }}>
                  <BaseMap
                    initialZoom={12.8}
                    initialLongitude={-122.7150944}
                    initialLatitude={45.4761333}
                    updateViewport={false}
                    civicMapStyle="dark"
                    useContainerHeight
                  >
                    <MultiLayerMap mapLayers={[pathMapLayer]} />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {
        notes: notes.pathNotes
      }
    )
    .add(
      "ScatterPlot Map",
      () => {
        const circleRadius = number("radius:", 25, {}, GROUP_IDS.DESIGN);

        const circleOpacity = number(
          "opacity:",
          0.7,
          opacityOptions,
          GROUP_IDS.DESIGN
        );

        const SCATTERPLOT_SCALE_TYPE_COLOR_OPTIONS = {
          none: "",
          ordinal: "ordinal",
          threshold: "threshold"
        };

        const circleColor = select(
          "CIVIC Color:",
          CIVIC_COLORS,
          CIVIC_COLORS.civicGreen,
          GROUP_IDS.DESIGN
        );

        const scaleTypeColor = options(
          "Scale Type (color):",
          SCATTERPLOT_SCALE_TYPE_COLOR_OPTIONS,
          "",
          {
            display: "inline-radio"
          },
          GROUP_IDS.DESIGN
        );

        const fieldNameColor = text(
          "Field Name (color):",
          "condition",
          GROUP_IDS.DESIGN
        );

        const dataRange = object("Data Range:", [], GROUP_IDS.DESIGN);

        const colorRange = object("Color Range:", [], GROUP_IDS.DESIGN);

        const SCATTERPLOT_SCALE_TYPE_AREA_OPTIONS = {
          none: "",
          "circle area": "circle area"
        };

        const scaleTypeArea = options(
          "Scale Type (area):",
          SCATTERPLOT_SCALE_TYPE_AREA_OPTIONS,
          "",
          {
            display: "inline-radio"
          },
          GROUP_IDS.DESIGN
        );

        const fieldNameArea = text(
          "Field Name (area):",
          "dbh",
          GROUP_IDS.DESIGN
        );

        const radiusScaleKnob = number(
          "Radius Scale:",
          50,
          {},
          GROUP_IDS.DESIGN
        );
        const radiusScale = radiusScaleKnob || 1;

        const scatterPlotAPIURL =
          "https://service.civicpdx.org/neighborhood-development/api/trees" +
          "?format=json&limit=1500&offset=2000";

        const fetchAPIURL = text("API URL:", scatterPlotAPIURL, GROUP_IDS.DATA);

        const onLayerClick = info => action("Circle Clicked:")(info);

        return (
          <DemoJSONLoader urls={[fetchAPIURL]}>
            {data => {
              const featuresArrayPath = text(
                "Features Array Path:",
                "results.features",
                GROUP_IDS.DATA
              );

              const featuresData = at(data, featuresArrayPath)[0];

              const scatterPlotMapLayer = {
                mapType: "ScatterPlotMap",
                id: "storybook-scatterplotmap-00",
                data: featuresData,
                radius: circleRadius,
                opacity: circleOpacity,
                civicColor: circleColor,
                scaleType: {
                  area: scaleTypeArea,
                  color: scaleTypeColor
                },
                fieldName: {
                  area: fieldNameArea,
                  color: fieldNameColor
                },
                radiusScale,
                dataRange,
                colorRange,
                onLayerClick
              };

              return (
                <div style={{ height: "100vh" }}>
                  <BaseMap
                    initialZoom={14}
                    initialLatitude={45.5298276}
                    initialLongitude={-122.698753}
                    updateViewport={false}
                    civicMapStyle="dark"
                    useContainerHeight
                  >
                    <MultiLayerMap mapLayers={[scatterPlotMapLayer]} />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {
        notes: notes.scatterPlotNotes
      }
    )
    .add(
      "Screen Grid Map",
      () => {
        const squareColor = select(
          "CIVIC Colors:",
          CIVIC_COLORS,
          CIVIC_COLORS.thermal,
          GROUP_IDS.DESIGN
        );

        const squareSize = number("Square Size:", 10, {}, GROUP_IDS.DESIGN);

        const squareOpacity = number(
          "Opacity:",
          0.7,
          opacityOptions,
          GROUP_IDS.DESIGN
        );

        const fieldNameWeight = text(
          "Field Name (weight):",
          "",
          GROUP_IDS.DESIGN
        );

        const screenGridMapAPIURL =
          "https://service.civicpdx.org/neighborhood-development/api/retail_locations" +
          "?format=json&limit=500";

        const fetchAPIURL = text(
          "API URL:",
          screenGridMapAPIURL,
          GROUP_IDS.DATA
        );

        return (
          <DemoJSONLoader urls={[fetchAPIURL]}>
            {data => {
              const featuresArrayPath = text(
                "Features Array Path:",
                "results.features",
                GROUP_IDS.DATA
              );

              const featuresData = at(data, featuresArrayPath)[0];

              const screenGridMapLayer = {
                mapType: "ScreenGridMap",
                id: "storybook-screengridmap-00",
                data: featuresData,
                fieldName: {
                  weight: fieldNameWeight
                },
                squareSize,
                opacity: squareOpacity,
                civicColor: squareColor
              };

              return (
                <div style={{ height: "100vh" }}>
                  <BaseMap
                    initialZoom={10}
                    updateViewport={false}
                    civicMapStyle="dark"
                    useContainerHeight
                  >
                    <MultiLayerMap mapLayers={[screenGridMapLayer]} />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {
        notes: notes.screenGridNotes
      }
    )
    .add(
      "Icon Map",
      () => {
        const iconSize = number(
          "Icon Size:",
          10,
          iconSizeOptions,
          GROUP_IDS.DESIGN
        );

        const iconOpacity = number(
          "Opacity:",
          0.7,
          opacityOptions,
          GROUP_IDS.DESIGN
        );

        const iconAtlas = text(
          "Icon Atlas:",
          "https://i.imgur.com/xgTAROe.png",
          GROUP_IDS.DESIGN
        );

        const iconMapping = object(
          "Icon Mapping:",
          {
            School: {
              x: 0,
              y: 0,
              width: 250,
              height: 250,
              mask: true
            },
            Hospital: {
              x: 250,
              y: 0,
              width: 250,
              height: 250,
              mask: true
            },
            BEECN: {
              x: 500,
              y: 0,
              width: 250,
              height: 250,
              mask: true
            },
            "Fire Station": {
              x: 0,
              y: 250,
              width: 250,
              height: 250,
              mask: true
            },
            Pin: {
              x: 250,
              y: 250,
              width: 250,
              height: 250,
              mask: true
            },
            COMMCTR: {
              x: 500,
              y: 250,
              width: 250,
              height: 250,
              mask: true
            }
          },
          GROUP_IDS.DESIGN
        );

        const ICON_SCALE_TYPE_COLOR_OPTIONS = {
          ordinal: "ordinal"
        };

        const scaleType = options(
          "Scale Type:",
          ICON_SCALE_TYPE_COLOR_OPTIONS,
          "ordinal",
          {
            display: "inline-radio"
          },
          GROUP_IDS.DESIGN
        );

        const fieldName = text("Field Name:", "type", GROUP_IDS.DESIGN);

        const dataRange = object(
          "Data Range:",
          ["BEECN", "COMMCTR", "Fire Station", "School", "Hospital"],
          GROUP_IDS.DESIGN
        );

        const colorRange = object(
          "Color Range:",
          [
            [0, 0, 0],
            [114, 29, 124],
            [220, 69, 86],
            [255, 178, 38],
            [30, 98, 189]
          ],
          GROUP_IDS.DESIGN
        );

        const iconMapAPIURL =
          "https://service.civicpdx.org/disaster-resilience/sandbox/slides/poi/";

        const fetchAPIURL = text("API URL:", iconMapAPIURL, GROUP_IDS.DATA);

        const onLayerClick = info => action("Icon Clicked:")(info);

        return (
          <DemoJSONLoader urls={[fetchAPIURL]}>
            {data => {
              const featuresArrayPath = text(
                "Features Array Path:",
                "slide_data.features",
                GROUP_IDS.DATA
              );

              const featuresData = at(data, featuresArrayPath)[0];
              const dataFilterNulls = featuresData
                ? featuresData.filter(d => d.geometry)
                : [];

              const iconMapLayer = {
                mapType: "IconMap",
                id: "storybook-icon-map",
                data: dataFilterNulls,
                iconSize,
                opacity: iconOpacity,
                iconAtlas,
                iconMapping,
                scaleType: {
                  color: scaleType
                },
                fieldName: {
                  color: fieldName
                },
                dataRange,
                colorRange,
                onLayerClick
              };

              return (
                <div style={{ height: "100vh" }}>
                  <BaseMap
                    initialZoom={10}
                    updateViewport={false}
                    civicMapStyle="dark"
                    useContainerHeight
                  >
                    <MultiLayerMap mapLayers={[iconMapLayer]} />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {
        notes: notes.iconNotes
      }
    )
    .add(
      "Small Polygon Map",
      () => {
        const polygonOpacity = number(
          "Opacity:",
          0.7,
          opacityOptions,
          GROUP_IDS.DESIGN
        );

        const polygonColor = select(
          "Civic Color:",
          CIVIC_COLORS,
          CIVIC_COLORS.civicGreen,
          GROUP_IDS.DESIGN
        );

        const POLYGON_SCALE_TYPE_COLOR_OPTIONS = {
          none: "",
          threshold: "threshold",
          ordinal: "ordinal"
        };

        const scaleTypeSelection = options(
          "Scale Type:",
          POLYGON_SCALE_TYPE_COLOR_OPTIONS,
          "",
          {
            display: "inline-radio"
          },
          GROUP_IDS.DESIGN
        );

        const fieldName = text("Field Name:", "acres", GROUP_IDS.DESIGN);

        const dataRange = object("Data Range:", [], GROUP_IDS.DESIGN);

        const colorRange = object("Color Range:", [], GROUP_IDS.DESIGN);

        const smallPolygonMapAPIURL =
          "https://service.civicpdx.org/neighborhood-development/api/parks" +
          "?format=json&limit=100";

        const fetchAPIURL = text(
          "API URL:",
          smallPolygonMapAPIURL,
          GROUP_IDS.DATA
        );

        const onLayerClick = info => action("Polygon Clicked:")(info);

        return (
          <DemoJSONLoader urls={[fetchAPIURL]}>
            {data => {
              const featuresArrayPath = text(
                "Features Array Path:",
                "results.features",
                GROUP_IDS.DATA
              );

              const featuresData = at(data, featuresArrayPath)[0];

              const smallPolygonMapLayer = {
                mapType: "SmallPolygonMap",
                id: "storybook-small-polygon-map",
                data: featuresData,
                opacity: polygonOpacity,
                civicColor: polygonColor,
                scaleType: {
                  color: scaleTypeSelection
                },
                fieldName: {
                  color: fieldName
                },
                dataRange,
                colorRange,
                onLayerClick
              };

              return (
                <div style={{ height: "100vh" }}>
                  <BaseMap
                    initialZoom={10}
                    updateViewport={false}
                    civicMapStyle="dark"
                    useContainerHeight
                  >
                    <MultiLayerMap mapLayers={[smallPolygonMapLayer]} />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {
        notes: notes.smallPolygonNotes
      }
    )
    .add(
      "Choropleth Map",
      () => {
        const polygonOpacity = number(
          "Opacity:",
          0.7,
          opacityOptions,
          GROUP_IDS.DESIGN
        );

        const polygonColor = select(
          "CIVIC Color:",
          CIVIC_COLORS,
          CIVIC_COLORS.thermal,
          GROUP_IDS.DESIGN
        );

        const CHOROPLETH_SCALE_TYPE_COLOR_OPTIONS = {
          equal: "equal",
          threshold: "threshold",
          ordinal: "ordinal"
        };

        const scaleTypeSelection = options(
          "Scale Type:",
          CHOROPLETH_SCALE_TYPE_COLOR_OPTIONS,
          "equal",
          {
            display: "inline-radio"
          },
          GROUP_IDS.DESIGN
        );

        const choroplethMapAPIURL =
          "https://service.civicpdx.org/disaster-resilience/api/DisasterNeighborhoodView/" +
          "?format=json&limit=102";

        const fetchURL = text("API URL:", choroplethMapAPIURL, GROUP_IDS.DATA);

        const onLayerClick = info => action("Polygon Clicked:")(info);

        return (
          <DemoJSONLoader urls={[fetchURL]}>
            {data => {
              const fieldName = text(
                "Field Name:",
                "dayoccupants",
                GROUP_IDS.DESIGN
              );

              const dataRange = object("Data Range:", [], GROUP_IDS.DESIGN);

              const colorRange = object("Color Range:", [], GROUP_IDS.DESIGN);

              const featuresArrayPath = text(
                "Features Array Path:",
                "results.features",
                GROUP_IDS.DATA
              );

              const featuresData = at(data, featuresArrayPath)[0];

              const choroplethMap = {
                mapType: "ChoroplethMap",
                id: "storybook-choropleth-map",
                data: featuresData,
                opacity: polygonOpacity,
                civicColor: polygonColor,
                scaleType: {
                  color: scaleTypeSelection
                },
                fieldName: {
                  color: fieldName
                },
                dataRange,
                colorRange,
                onLayerClick
              };

              return (
                <div style={{ height: "100vh" }}>
                  <BaseMap
                    initialZoom={9.6}
                    initialLatitude={45.5401}
                    updateViewport={false}
                    civicMapStyle="dark"
                    useContainerHeight
                  >
                    <MultiLayerMap mapLayers={[choroplethMap]} />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {
        notes: notes.choroplethNotes
      }
    );
