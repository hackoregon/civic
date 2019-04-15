/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";
import { css } from "emotion";
import { BaseMap } from "../src";
import { CivicSandboxMap } from "../src";
import { CivicSandboxDashboard } from "../src";
import { wallOfText } from "./shared";
import { DemoJSONLoader } from "../src";

const dashboardDescription = css`
  padding: 0 1% 0 5%;
`;

const displayName =
  CivicSandboxDashboard.displayName || "CivicSandboxDashboard";

const dataURLs = [
  "https://service.civicpdx.org/neighborhood-development/sandbox/foundations/population/?format=json",
  "https://service.civicpdx.org/neighborhood-development/sandbox/slides/retailgrocers/?format=json"
];

const dashboardComponent = data => {
  if (data === null) return null;
  const [populationData, groceryData] = data;

  const planetColorScheme = [
    [247, 244, 249, 255],
    [231, 225, 239, 255],
    [212, 185, 218, 255],
    [201, 148, 199, 255],
    [223, 101, 176, 255],
    [231, 41, 138, 255],
    [206, 18, 86, 255],
    [152, 0, 67, 255],
    [103, 0, 31, 255]
  ];

  const foundation = {
    mapType: "ChoroplethMap",
    id: "choropleth-layer-foundation-population",
    pickable: true,
    data: populationData.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [0, 0, 0, 255],
    getLineWidth: f => 0.5,
    stroked: true,
    scaleType: "equal",
    color: planetColorScheme,
    getPropValue: f => parseFloat(f.properties.total_population),
    propName: "total_population",
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150]
  };

  const groceryBoundary = {
    mapType: "PolygonPlotMap",
    id: "boundary-layer-grocery",
    data: groceryData.slide_meta.boundary,
    opacity: 1,
    filled: false,
    getPolygon: f => f.coordinates,
    getLineColor: f => [138, 43, 226, 255],
    getLineWidth: f => 45,
    lineWidthScale: 1,
    lineJointRounded: false
  };
  const groceryMap = {
    mapType: "ScatterPlotMap",
    id: "scatterplot-layer-grocery",
    pickable: true,
    data: groceryData.slide_data.features,
    getPosition: f => f.geometry.coordinates,
    opacity: 0.9,
    getColor: f => [138, 43, 226, 255],
    getRadius: f => 75,
    radiusScale: 1,
    radiusMinPixels: 1,
    autoHighlight: true,
    parameters: { depthTest: false },
    highlightColor: [200, 200, 200, 255]
  };

  const mapLayers = [
    {
      data: foundation,
      visible: true
    },
    {
      data: groceryBoundary,
      visible: true
    },
    {
      data: groceryMap,
      visible: true
    }
  ];

  // Dashboard Data
  const textData = {
    visualizationType: "Text",
    title: "Population",
    data: 245450
  };

  const comarpisonBarData = {
    visualizationType: "ComparisonBar",
    title: "Total Population",
    data: [
      {
        name: "Downtown",
        value: 30639,
        sortOrder: 2
      },
      {
        name: "Average Total Population",
        value: 55000,
        sortOrder: 1
      }
    ],
    dataLabel: "name",
    dataValue: "value",
    sortOrder: "sortOrder",
    minimalist: true
  };

  const donutData = {
    visualizationType: "PercentDonut",
    title: "Households with Children",
    data: [
      {
        x: "Households with Children",
        y: 0.75
      },
      {
        x: null,
        y: 0.25
      }
    ]
  };

  const textVisible = boolean("Text:", true);
  const comarpisonBarsVisible = boolean("Comparison Bars:", true);
  const donutVisible = boolean("Percent Donut:", true);

  const dashboardArray = [
    {
      data: textData,
      visible: textVisible
    },
    {
      data: comarpisonBarData,
      visible: comarpisonBarsVisible
    },
    {
      data: donutData,
      visible: donutVisible
    }
  ];

  const dashboardData = dashboardArray.filter(d => d.visible).map(d => d.data);

  // Dashboard Description
  const dashboardInformation = (
    <div className={dashboardDescription}>
      <h2>
        How has ridership changed throughout Tri-Met's service area over time?
      </h2>
      <p>{wallOfText}</p>
      <p>{wallOfText}</p>
      <p>{wallOfText}</p>
      <p>{wallOfText}</p>
      <p>{wallOfText}</p>
      <p>{wallOfText}</p>
      <p>{wallOfText}</p>
      <p>{wallOfText}</p>
      <h4>Source: census.gov ACS</h4>
    </div>
  );
  const dashboardDescriptionVisible = boolean("Include Description:", true);

  return (
    <div>
      <div style={{ margin: "0 2%" }}>
        <BaseMap
          initialZoom={10.5}
          initialLatitude={45.5445}
          initialLongitude={-122.725}
          height={650}
        >
          <CivicSandboxMap mapLayers={mapLayers} />
        </BaseMap>
      </div>
      <div
        className={css(`
          position: absolute;
          top: 2%;
          left: 7.5%;
          width: 92.5%;
          height: 0;
          @media(max-width: 900px) {
            position: relative;
            left: 0;
            height: 100%;
          };
        `)}
      >
        <CivicSandboxDashboard data={dashboardData}>
          {dashboardDescriptionVisible ? dashboardInformation : null}
        </CivicSandboxDashboard>
      </div>
    </div>
  );
};

export default () =>
  storiesOf("CIVIC Platform Components/CIVIC Sandbox Dashboard", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add("Simple usage", () => (
      <DemoJSONLoader urls={dataURLs}>
        {data => dashboardComponent(data)}
      </DemoJSONLoader>
    ));
