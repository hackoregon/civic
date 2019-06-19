/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  text,
  number,
  select,
  object
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { extent } from "d3";
import { BaseMap, MultiLayerMap, DemoJSONLoader } from "../src";

import notes from "./multiLayerMap.notes";

const GROUP_IDS = {
  STANDARD: "Standard",
  CUSTOM: "Custom",
  DATA: "Data"
};

const civicCategoricalColorOptions = {
  civicBlue: "civicBlue",
  civicGreen: "civicGreen",
  civicPurple: "civicPurple",
  civicPink: "civicPink",
  civicYellow: "civicYellow"
};

const civicSequentialColorOptions = {
  thermal: "thermal",
  planet: "planet",
  space: "space",
  earth: "earth",
  ocean: "ocean"
};

const civicDivergingColorOptions = {
  purpleGreen: "purpleGreen",
  purpleOrange: "purpleOrange"
};

const opacityOptions = {
  range: true,
  min: 0.1,
  max: 1,
  step: 0.05
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

        const pathMapScaleTypeOptions = {
          "(none)": "",
          threshold: "threshold",
          equal: "equal",
          ordinal: "ordinal",
          quantile: "quantile"
        };

        const scaleTypeSelection = select(
          "Scale Type:",
          pathMapScaleTypeOptions,
          "",
          GROUP_IDS.CUSTOM
        );

        let lineColor;

        if (scaleTypeSelection === "") {
          lineColor = select(
            "Civic Color:",
            civicCategoricalColorOptions,
            civicCategoricalColorOptions.civicGreen,
            GROUP_IDS.STANDARD
          );
        } else if (scaleTypeSelection === "threshold") {
          lineColor = select(
            "Civic Color:",
            civicDivergingColorOptions,
            civicDivergingColorOptions.purpleGreen,
            GROUP_IDS.CUSTOM
          );
        } else if (
          scaleTypeSelection === "equal" ||
          scaleTypeSelection === "quantile"
        ) {
          lineColor = select(
            "Civic Color:",
            civicSequentialColorOptions,
            civicSequentialColorOptions.thermal,
            GROUP_IDS.CUSTOM
          );
        }

        const fieldName = text("Field Name:", "", GROUP_IDS.CUSTOM);

        const dataRange = object("Data Range:", [], GROUP_IDS.CUSTOM);

        const colorRange = object("Color Range:", [], GROUP_IDS.CUSTOM);

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

              const pathMap = {
                mapType: "PathMap",
                id: "storybook-pathmap-00",
                data: data.results.features,
                lineWidth,
                opacity,
                civicColor: lineColor,
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
                    initialZoom={12}
                    updateViewport={false}
                    civicMapStyle="dark"
                    useContainerHeight
                  >
                    <MultiLayerMap mapLayers={[pathMap]} />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {
        notes
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

        const scatterPlotMapColorScaleTypeOptions = {
          "(none)": "",
          ordinal: "ordinal"
        };

        const scaleTypeSelectionColor = select(
          "Scale Type (color):",
          scatterPlotMapColorScaleTypeOptions,
          "",
          GROUP_IDS.CUSTOM
        );

        let circleColor;

        if (scaleTypeSelectionColor === "") {
          circleColor = select(
            "Civic Color:",
            civicCategoricalColorOptions,
            civicCategoricalColorOptions.civicGreen,
            GROUP_IDS.STANDARD
          );
        }

        const fieldNameColor = text(
          "Field Name (color):",
          "",
          GROUP_IDS.CUSTOM
        );

        const dataRange = object("Data Range:", [], GROUP_IDS.CUSTOM);

        const colorRange = object("Color Range:", [], GROUP_IDS.CUSTOM);

        const scatterPlotMapAreaScaleTypeOptions = {
          "(none)": "",
          "circle area": "circle area"
        };

        const scaleTypeArea = select(
          "Scale Type (area):",
          scatterPlotMapAreaScaleTypeOptions,
          "",
          GROUP_IDS.CUSTOM
        );

        const fieldNameArea = text("Field Name (area):", "", GROUP_IDS.CUSTOM);

        const radiusScaleOptions = {
          range: true,
          min: 1,
          max: 100,
          step: 1
        };

        const circleRadiusScale = number(
          "Radius Scale:",
          1,
          radiusScaleOptions,
          GROUP_IDS.CUSTOM
        );

        const scatterPlotAPIURL =
          "https://service.civicpdx.org/neighborhood-development/api/trees" +
          "?format=json&limit=1500&offset=2000";
        const fetchAPIURL = text("API URL:", scatterPlotAPIURL, GROUP_IDS.DATA);

        const onLayerClick = info => action("Line Clicked:")(info);

        return (
          <DemoJSONLoader urls={[fetchAPIURL]}>
            {data => {
              // eslint-disable-next-line no-unused-vars
              const singleFeatureObj = object(
                "Data: First Feature Object from GeoJSON",
                data.results.features.slice(0, 1),
                GROUP_IDS.DATA
              );

              const scatterPlotMap = {
                mapType: "ScatterPlotMap",
                id: "storybook-scatterplotmap-00",
                data: data.results.features,
                radius: circleRadius,
                opacity: circleOpacity,
                civicColor: circleColor,
                scaleType: {
                  area: scaleTypeArea,
                  color: scaleTypeSelectionColor
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
                    initialZoom={12}
                    updateViewport={false}
                    civicMapStyle="dark"
                    useContainerHeight
                  >
                    <MultiLayerMap mapLayers={[scatterPlotMap]} />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {
        notes
      }
    )
    .add(
      "Screen Grid Map",
      () => {
        const squareColor = select(
          "CIVIC Colors:",
          civicSequentialColorOptions,
          civicSequentialColorOptions.thermal,
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

              const screenGridMap = {
                mapType: "ScreenGridMap",
                id: "storybook-screengridmap-00",
                data: data.results.features,
                sqaureSize: squareSize,
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
                    <MultiLayerMap mapLayers={[screenGridMap]} />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {
        notes
      }
    )
    .add(
      "Icon Map",
      () => {
        const iconSize = number("Icon Size:", 10, {}, GROUP_IDS.STANDARD);

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

        const iconMapScaleTypeOptions = {
          ordinal: "ordinal"
        };

        const scaleType = select(
          "Scale Type:",
          iconMapScaleTypeOptions,
          iconMapScaleTypeOptions.ordinal,
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

        const onLayerClick = info => action("Line Clicked:")(info);

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

              const iconMap = {
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
                    <MultiLayerMap mapLayers={[iconMap]} />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {
        notes
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

        const polygonMapScaleTypeOptions = {
          "(none)": "",
          threshold: "threshold",
          ordinal: "ordinal"
        };

        const scaleTypeSelection = select(
          "Scale Type:",
          polygonMapScaleTypeOptions,
          "",
          GROUP_IDS.CUSTOM
        );

        let polygonColor;

        if (scaleTypeSelection === "") {
          polygonColor = select(
            "Civic Color:",
            civicCategoricalColorOptions,
            civicCategoricalColorOptions.civicGreen,
            GROUP_IDS.STANDARD
          );
        } else if (scaleTypeSelection === "threshold") {
          polygonColor = select(
            "Civic Color:",
            civicDivergingColorOptions,
            civicDivergingColorOptions.purpleGreen,
            GROUP_IDS.CUSTOM
          );
        }

        const fieldName = text("Field Name:", "", GROUP_IDS.CUSTOM);

        const dataRange = object("Data Range:", [], GROUP_IDS.CUSTOM);

        const colorRange = object("Color Range:", [], GROUP_IDS.CUSTOM);

        const smallPolygonMapAPIURL =
          "https://service.civicpdx.org/neighborhood-development/api/parks" +
          "?format=json&limit=100";
        const fetchAPIURL = text(
          "API URL:",
          smallPolygonMapAPIURL,
          GROUP_IDS.DATA
        );

        const onLayerClick = info => action("Line Clicked:")(info.object);

        return (
          <DemoJSONLoader urls={[fetchAPIURL]}>
            {data => {
              // eslint-disable-next-line no-unused-vars
              const singleFeatureObj = object(
                "Data: First Feature Object from GeoJSON",
                data.results.features.slice(0, 1),
                GROUP_IDS.DATA
              );

              const smallPolygonMap = {
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
                    <MultiLayerMap mapLayers={[smallPolygonMap]} />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {
        notes
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

        const choroplethMapScaleTypeOptions = {
          equal: "equal",
          quantile: "quantile",
          threshold: "threshold",
          ordinal: "ordinal"
        };

        const scaleTypeSelection = select(
          "Scale Type:",
          choroplethMapScaleTypeOptions,
          "equal",
          GROUP_IDS.STANDARD
        );

        let polygonColor;

        if (scaleTypeSelection === "threshold") {
          polygonColor = select(
            "Civic Color:",
            civicDivergingColorOptions,
            civicDivergingColorOptions.purpleGreen,
            GROUP_IDS.STANDARD
          );
        } else if (
          scaleTypeSelection === "equal" ||
          scaleTypeSelection === "quantile"
        ) {
          polygonColor = select(
            "Civic Color:",
            civicSequentialColorOptions,
            civicSequentialColorOptions.thermal,
            GROUP_IDS.STANDARD
          );
        }

        const fieldName = text(
          "Field Name:",
          "dayoccupants",
          GROUP_IDS.STANDARD
        );

        const choroplethMapAPIURL =
          "https://service.civicpdx.org/disaster-resilience/api/DisasterNeighborhoodView/" +
          "?format=json&limit=102";

        const fetchURL = text("API URL:", choroplethMapAPIURL, GROUP_IDS.DATA);

        const onLayerClick = info => action("Line Clicked:")(info.object);

        return (
          <DemoJSONLoader urls={[fetchURL]}>
            {data => {
              // eslint-disable-next-line no-unused-vars
              const singleFeatureObj = object(
                "Data: First Feature Object from GeoJSON",
                data.results.features.slice(0, 1),
                GROUP_IDS.DATA
              );

              const minMax = extent(
                data.results.features,
                d => +d.properties[fieldName]
              );

              const dataRange = object(
                "Data Range:",
                minMax,
                GROUP_IDS.STANDARD
              );

              const colorRange = object("Color Range:", [], GROUP_IDS.STANDARD);

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
                    initialZoom={9.8}
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
        notes
      }
    );
