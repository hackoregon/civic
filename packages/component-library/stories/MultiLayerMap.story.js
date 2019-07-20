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
import { BaseMap, MultiLayerMap, DemoJSONLoader } from "../src";

import notes from "./multiLayerMap.notes";

const GROUP_IDS = {
  STANDARD: "Standard",
  CUSTOM: "Custom",
  DATA: "Data"
};

const CIVIC_CATEGORICAL_COLORS = {
  civicBlue: "civicBlue",
  civicGreen: "civicGreen",
  civicPurple: "civicPurple",
  civicPink: "civicPink",
  civicYellow: "civicYellow"
};

const CIVIC_SEQUENTIAL_COLORS = {
  thermal: "thermal",
  planet: "planet",
  space: "space",
  earth: "earth",
  ocean: "ocean"
};

const CIVIC_DIVERGING_COLORS = {
  purpleGreen: "purpleGreen",
  purpleOrange: "purpleOrange"
};

const opacityOptions = {
  range: true,
  min: 0.1,
  max: 1,
  step: 0.05
};

const radiusScaleOptions = {
  range: true,
  min: 1,
  max: 100,
  step: 1
};

const iconSizeOptions = {
  range: true,
  min: 1,
  max: 100,
  step: 1
};

export default () =>
  storiesOf("Component Lib|Maps/MultiLayer Map", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add(
      "Path Map",
      () => {
        const lineWidth = number("Line Width:", 25, {}, GROUP_IDS.STANDARD);

        const opacity = number(
          "Opacity:",
          0.7,
          opacityOptions,
          GROUP_IDS.STANDARD
        );

        const PATH_MAP_SCALE_TYPE_COLOR_OPTIONS = {
          none: "",
          threshold: "threshold",
          ordinal: "ordinal",
          equal: "equal"
        };

        const scaleTypeColor = options(
          "Scale Type:",
          PATH_MAP_SCALE_TYPE_COLOR_OPTIONS,
          "",
          {
            display: "inline-radio"
          },
          GROUP_IDS.CUSTOM
        );

        let lineColor;
        let fieldName;
        let dataRange;
        let colorRange;

        if (scaleTypeColor === "") {
          lineColor = select(
            "Civic Color:",
            CIVIC_CATEGORICAL_COLORS,
            CIVIC_CATEGORICAL_COLORS.civicGreen,
            GROUP_IDS.STANDARD
          );
        } else if (scaleTypeColor === "threshold") {
          lineColor = select(
            "Civic Color:",
            CIVIC_DIVERGING_COLORS,
            CIVIC_DIVERGING_COLORS.purpleGreen,
            GROUP_IDS.CUSTOM
          );

          fieldName = text("Field Name:", "shape_leng", GROUP_IDS.CUSTOM);

          dataRange = object(
            "Data Range:",
            [50, 100, 250, 300, 350, 400, 450, 500],
            GROUP_IDS.CUSTOM
          );

          colorRange = object("Color Range:", [], GROUP_IDS.CUSTOM);
        } else if (scaleTypeColor === "ordinal") {
          lineColor = select(
            "Civic Color:",
            CIVIC_CATEGORICAL_COLORS,
            CIVIC_CATEGORICAL_COLORS.civicGreen,
            GROUP_IDS.STANDARD
          );

          fieldName = text("Field Name:", "facility", GROUP_IDS.CUSTOM);

          dataRange = object("Data Range:", ["NG", "ESR"], GROUP_IDS.CUSTOM);

          colorRange = object(
            "Color Range:",
            [[0, 0, 255], [255, 0, 0]],
            GROUP_IDS.CUSTOM
          );
        } else if (scaleTypeColor === "equal") {
          lineColor = select(
            "Civic Color:",
            CIVIC_SEQUENTIAL_COLORS,
            CIVIC_SEQUENTIAL_COLORS.thermal,
            GROUP_IDS.CUSTOM
          );

          fieldName = text("Field Name:", "shape_leng", GROUP_IDS.CUSTOM);
          dataRange = object("Data Range:", [], GROUP_IDS.CUSTOM);
          colorRange = object("Color Range:", [], GROUP_IDS.CUSTOM);
        }

        const pathMapAPIURL =
          "https://service.civicpdx.org/neighborhood-development/api/bike_greenways" +
          "?format=json&limit=280";

        const fetchURL = text("API URL:", pathMapAPIURL, GROUP_IDS.DATA);

        const onLayerClick = info => action("Line Clicked:")(info);

        return (
          <DemoJSONLoader urls={[fetchURL]}>
            {data => {
              // eslint-disable-next-line no-unused-vars
              const singleFeatureObj = object(
                "Data: First Feature Object from GeoJSON",
                data.results.features.slice(0, 1),
                GROUP_IDS.DATA
              );

              const pathMapLayer = {
                mapType: "PathMap",
                id: "storybook-pathmap-00",
                data: data.results.features,
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
                onLayerClick,
                pickable: 10
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
        const circleRadius = number("radius:", 25, {}, GROUP_IDS.STANDARD);

        const circleOpacity = number(
          "opacity:",
          0.7,
          opacityOptions,
          GROUP_IDS.STANDARD
        );

        const SCATTERPLOT_SCALE_TYPE_COLOR_OPTIONS = {
          none: "",
          ordinal: "ordinal"
        };

        const scaleTypeColor = options(
          "Scale Type (color):",
          SCATTERPLOT_SCALE_TYPE_COLOR_OPTIONS,
          "",
          {
            display: "inline-radio"
          },
          GROUP_IDS.CUSTOM
        );

        let circleColor;
        let fieldNameColor;
        let dataRange;
        let colorRange;

        if (scaleTypeColor === "") {
          circleColor = select(
            "Civic Color:",
            CIVIC_CATEGORICAL_COLORS,
            CIVIC_CATEGORICAL_COLORS.civicGreen,
            GROUP_IDS.STANDARD
          );
        } else if (scaleTypeColor === "ordinal") {
          fieldNameColor = text(
            "Field Name (color):",
            "condition",
            GROUP_IDS.CUSTOM
          );

          dataRange = object(
            "Data Range:",
            ["Dead", "Poor", "Fair", "Good"],
            GROUP_IDS.CUSTOM
          );

          colorRange = object(
            "Color Range:",
            [[255, 0, 0], [255, 128, 0], [255, 255, 0], [0, 255, 0]],
            GROUP_IDS.CUSTOM
          );
        }

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
          GROUP_IDS.CUSTOM
        );

        let fieldNameArea;
        let circleRadiusScale;

        if (scaleTypeArea === "") {
          fieldNameArea = text("Field Name (area):", "", GROUP_IDS.CUSTOM);
          circleRadiusScale = number(
            "Radius Scale:",
            1,
            radiusScaleOptions,
            GROUP_IDS.CUSTOM
          );
        } else if (scaleTypeArea === "circle area") {
          fieldNameArea = text("Field Name (area):", "dbh", GROUP_IDS.CUSTOM);
          circleRadiusScale = number(
            "Radius Scale:",
            20,
            radiusScaleOptions,
            GROUP_IDS.CUSTOM
          );
        }

        const scatterPlotAPIURL =
          "https://service.civicpdx.org/neighborhood-development/api/trees" +
          "?format=json&limit=1500&offset=2000";

        const fetchAPIURL = text("API URL:", scatterPlotAPIURL, GROUP_IDS.DATA);

        const onLayerClick = info => action("Circle Clicked:")(info);

        return (
          <DemoJSONLoader urls={[fetchAPIURL]}>
            {data => {
              // eslint-disable-next-line no-unused-vars
              const singleFeatureObj = object(
                "Data: First Feature Object from GeoJSON",
                data.results.features.slice(0, 1),
                GROUP_IDS.DATA
              );

              const scatterPlotMapLayer = {
                mapType: "ScatterPlotMap",
                id: "storybook-scatterplotmap-00",
                data: data.results.features,
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
                radiusScale: circleRadiusScale,
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
          CIVIC_SEQUENTIAL_COLORS,
          CIVIC_SEQUENTIAL_COLORS.thermal,
          GROUP_IDS.STANDARD
        );

        const squareSize = number("Square Size:", 10, {}, GROUP_IDS.STANDARD);

        const squareOpacity = number(
          "Opacity:",
          0.7,
          opacityOptions,
          GROUP_IDS.STANDARD
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
              // eslint-disable-next-line no-unused-vars
              const singleFeatureObj = object(
                "Data: First Feature Object from GeoJSON",
                data.results.features.slice(0, 1),
                GROUP_IDS.DATA
              );

              const screenGridMapLayer = {
                mapType: "ScreenGridMap",
                id: "storybook-screengridmap-00",
                data: data.results.features,
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
          GROUP_IDS.STANDARD
        );

        const iconOpacity = number(
          "Opacity:",
          0.7,
          opacityOptions,
          GROUP_IDS.STANDARD
        );

        const iconAtlas = text(
          "Icon Atlas:",
          "https://i.imgur.com/xgTAROe.png",
          GROUP_IDS.STANDARD
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
          GROUP_IDS.STANDARD
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
          GROUP_IDS.STANDARD
        );

        const fieldName = text("Field Name:", "type", GROUP_IDS.STANDARD);

        const dataRange = object(
          "Data Range:",
          ["BEECN", "COMMCTR", "Fire Station", "School", "Hospital"],
          GROUP_IDS.STANDARD
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
          GROUP_IDS.STANDARD
        );

        const iconMapAPIURL =
          "https://service.civicpdx.org/disaster-resilience/sandbox/slides/poi/";

        const fetchAPIURL = text("API URL:", iconMapAPIURL, GROUP_IDS.DATA);

        const onLayerClick = info => action("Icon Clicked:")(info);

        return (
          <DemoJSONLoader urls={[fetchAPIURL]}>
            {data => {
              // eslint-disable-next-line no-unused-vars
              const singleFeatureObj = object(
                "Data: First Feature Object from GeoJSON",
                data.slide_data.features.slice(0, 1),
                GROUP_IDS.DATA
              );

              const dataFilterNulls = data.slide_data.features.filter(
                d => d.geometry
              );

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
          GROUP_IDS.STANDARD
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
          GROUP_IDS.CUSTOM
        );

        let polygonColor;
        let fieldName;
        let dataRange;
        let colorRange;

        if (scaleTypeSelection === "") {
          polygonColor = select(
            "Civic Color:",
            CIVIC_CATEGORICAL_COLORS,
            CIVIC_CATEGORICAL_COLORS.civicGreen,
            GROUP_IDS.STANDARD
          );
        } else if (scaleTypeSelection === "threshold") {
          fieldName = text("Field Name:", "acres", GROUP_IDS.CUSTOM);

          dataRange = object("Data Range:", [10], GROUP_IDS.CUSTOM);

          colorRange = object(
            "Color Range:",
            [[255, 0, 0], [0, 255, 0]],
            GROUP_IDS.CUSTOM
          );
        } else if (scaleTypeSelection === "ordinal") {
          fieldName = text("Field Name:", "name", GROUP_IDS.CUSTOM);

          dataRange = object(
            "Data Range:",
            ["Grant Park", "Holladay Park"],
            GROUP_IDS.CUSTOM
          );

          colorRange = object(
            "Color Range:",
            [[0, 255, 255], [255, 255, 0]],
            GROUP_IDS.CUSTOM
          );
        }

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
              // eslint-disable-next-line no-unused-vars
              const singleFeatureObj = object(
                "Data: First Feature Object from GeoJSON",
                data.results.features.slice(0, 1),
                GROUP_IDS.DATA
              );

              const smallPolygonMapLayer = {
                mapType: "SmallPolygonMap",
                id: "storybook-small-polygon-map",
                data: data.results.features,
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
          GROUP_IDS.STANDARD
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
          GROUP_IDS.STANDARD
        );

        const choroplethMapAPIURL =
          "https://service.civicpdx.org/disaster-resilience/api/DisasterNeighborhoodView/" +
          "?format=json&limit=102";

        const fetchURL = text("API URL:", choroplethMapAPIURL, GROUP_IDS.DATA);

        const onLayerClick = info => action("Polygon Clicked:")(info);

        return (
          <DemoJSONLoader urls={[fetchURL]}>
            {data => {
              // eslint-disable-next-line no-unused-vars
              const singleFeatureObj = object(
                "Data: First Feature Object from GeoJSON",
                data.results.features.slice(0, 1),
                GROUP_IDS.DATA
              );

              let polygonColor;
              let fieldName;
              let dataRange;
              let colorRange;

              if (scaleTypeSelection === "equal") {
                polygonColor = select(
                  "Civic Color:",
                  CIVIC_SEQUENTIAL_COLORS,
                  CIVIC_SEQUENTIAL_COLORS.thermal,
                  GROUP_IDS.STANDARD
                );

                fieldName = text(
                  "Field Name:",
                  "dayoccupants",
                  GROUP_IDS.STANDARD
                );

                dataRange = object("Data Range:", [], GROUP_IDS.STANDARD);

                colorRange = object("Color Range:", [], GROUP_IDS.STANDARD);
              } else if (scaleTypeSelection === "threshold") {
                polygonColor = select(
                  "Civic Color:",
                  CIVIC_DIVERGING_COLORS,
                  CIVIC_DIVERGING_COLORS.purpleGreen,
                  GROUP_IDS.STANDARD
                );

                fieldName = text(
                  "Field Name:",
                  "fatalitiestotal_day",
                  GROUP_IDS.STANDARD
                );

                dataRange = object(
                  "Data Range:",
                  [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                  GROUP_IDS.STANDARD
                );

                colorRange = object("Color Range:", [], GROUP_IDS.STANDARD);
              } else if (scaleTypeSelection === "ordinal") {
                // eslint-disable-next-line no-unused-expressions
                polygonColor;

                fieldName = text("Field Name:", "quadrant", GROUP_IDS.STANDARD);

                dataRange = object(
                  "Data Range:",
                  ["Northeast", "Southeast", "North", "Southwest", "Northwest"],
                  GROUP_IDS.STANDARD
                );

                colorRange = object(
                  "Color Range:",
                  [
                    [255, 0, 0],
                    [255, 255, 0],
                    [255, 0, 255],
                    [0, 255, 255],
                    [255, 255, 255]
                  ],
                  GROUP_IDS.STANDARD
                );
              }

              const choroplethMap = {
                mapType: "ChoroplethMap",
                id: "storybook-choropleth-map",
                data: data.results.features,
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
