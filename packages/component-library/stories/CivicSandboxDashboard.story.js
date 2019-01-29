/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import * as d3 from 'd3';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { CivicSandboxMap } from '../src';
import { CivicSandboxDashboard } from '../src';
import { css } from 'emotion';
import { wallOfText } from './shared';

const dashboardDescription = css`
  padding: 0 1% 0 5%;
`;

const displayName = CivicSandboxDashboard.displayName || 'CivicSandboxDashboard';

class LoadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foundation1: null,
      slide1: null,
      error: null,
    };
  }

  componentDidMount() {
    let cmp = this;
    d3.queue()
      .defer(d3.json, this.props.urls[0])
      .defer(d3.json, this.props.urls[1])
      .await((error, foundation1, slide1) => {
        if (error) { cmp.setState({error: error}) }
        cmp.setState({foundation1, slide1});
      });
  }

  render() {
    if (this.state.foundation1 === null) { return null }
    const { foundation1, slide1 } = this.state;
    return this.props.children(foundation1, slide1);
  }
}

const dataURLs = [
  'https://gist.githubusercontent.com/mendozaline/f78b076ce13a9fd484f6b8a004065a95/raw/ff8bd893ba1890a6f6c20265f720587f9595a9c4/pop.json',
  'https://gist.githubusercontent.com/mendozaline/b3a75b40c9a60781b6adc77cebb9b400/raw/fa0aa13c75bfcc2fd92ccf1f3cc612af83d5d704/010-grocery.json',
];

const dashboardComponent = (foundationData1, slideData1) => {
  if (foundationData1 === null) { return null }

  const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';
  const mapboxStyle = 'mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg';
  const planetColorScheme = [[247,244,249,255],[231,225,239,255],[212,185,218,255],[201,148,199,255],[223,101,176,255],[231,41,138,255],[206,18,86,255],[152,0,67,255],[103,0,31,255]];

  const populationGetColor = f => {
    const population = parseFloat(f.properties.total_population);
    return population < 3000 ? planetColorScheme[0] :
      population < 8000 ? planetColorScheme[1] :
      population < 12000 ? planetColorScheme[2] :
      population < 16000 ? planetColorScheme[3] :
      population < 20000 ? planetColorScheme[4] :
      population < 24000 ? planetColorScheme[5] :
      population < 28000 ? planetColorScheme[6] :
      population < 32000 ? planetColorScheme[7] :
      planetColorScheme[8];
  };

  const foundation = {
    mapType: 'ChoroplethMap',
    id: 'choropleth-layer-foundation-population',
    pickable: true,
    data: foundationData1.slide_data.features,
    opacity: 0.5,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [0, 0, 0, 255],
    getLineWidth: f => 0.5,
    stroked: true,
    getFillColor: populationGetColor,
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
    updateTriggers: { getFillColor: populationGetColor },
  };

  const groceryBoundary = {
    mapType: 'PolygonPlotMap',
    id: 'boundary-layer-grocery',
    data: slideData1.slide_meta.boundary,
    opacity: 1,
    filled: false,
    getPolygon: f => f.coordinates,
    getLineColor: f => [138, 43, 226, 255],
    getLineWidth: f => 45,
    lineWidthScale: 1,
    lineJointRounded: false,
  };
  const groceryMap = {
    mapType: 'ScatterPlotMap',
    id: 'scatterplot-layer-grocery',
    pickable: true,
    data: slideData1.slide_data.features,
    getPosition: f => f.geometry.coordinates,
    opacity: 0.9,
    getColor: f => [138,43,226,255],
    getRadius: f => 75,
    radiusScale: 1,
    radiusMinPixels: 1,
    autoHighlight: true,
    parameters: { depthTest: false },
    highlightColor: [200, 200, 200, 255],
  };

  const mapLayers = [
    {
      data: foundation,
      visible: true,
    },
    {
      data: groceryBoundary,
      visible: true,
    },
    {
      data: groceryMap,
      visible: true,
    },
  ];

  // Dashboard Data
  const legendData = {
    "visualizationType": "Legend",
    "title": "Map Legend",
    "min": 2500,
    "max": 32000,
    "colors": [
      "rgba(247,244,249,1.0)",
      "rgba(231,225,239,1.0)",
      "rgba(212,185,218,1.0)",
      "rgba(201,148,199,1.0)",
      "rgba(223,101,176,1.0)",
      "rgba(231,41,138,1.0)",
      "rgba(206,18,86,1.0)",
      "rgba(152,0,67,1.0)",
      "rgba(103,0,31,1.0)",
    ],
  };

  const textData = {
    visualizationType: 'Text',
    title: 'Population',
    data: 245450,
  };

  const comarpisonBarData = {
    "visualizationType": "ComparisonBar",
    "title": "Total Population",
    "data": [
      {
        "name": "Downtown",
        "value": 30639,
        "sortOrder": 2,
      },
      {
        "name": "Average Total Population",
        "value": 55000,
        "sortOrder": 1,
      },
    ],
    "dataLabel": "name",
    "dataValue": "value",
    "sortOrder": "sortOrder",
    "minimalist": true,
  };

  const donutData = {
    "visualizationType": "PercentDonut",
    "title": "Households with Children",
    "data": [
      {
        "x": "Households with Children",
        "y": 0.75,
      },
      {
        "x": null,
        "y": 0.25,
      },
    ],
  };

  const legnendVisible = boolean('Legend:', true);
  const textVisible = boolean('Text:', true);
  const comarpisonBarsVisible = boolean('Comparison Bars:', true);
  const donutVisible = boolean('Percent Donut:', true);

  const dashboardArray = [
    {
      "data": legendData,
      "visible": legnendVisible,
    },
    {
      "data": textData,
      "visible": textVisible,
    },
    {
      "data": comarpisonBarData,
      "visible": comarpisonBarsVisible,
    },
    {
      "data": donutData,
      "visible": donutVisible,
    },
  ];

  const dashboardData = dashboardArray
    .filter(d => d.visible)
    .map(d => d.data);

  //Dashboard Description
  const dashboardInformation = (
    <div className={dashboardDescription}>
      <h2>How has ridership changed throughout Tri-Met's service area over time?</h2>
      <p>{ wallOfText }</p>
      <p>{ wallOfText }</p>
      <p>{ wallOfText }</p>
      <p>{ wallOfText }</p>
      <p>{ wallOfText }</p>
      <p>{ wallOfText }</p>
      <p>{ wallOfText }</p>
      <p>{ wallOfText }</p>
      <h4>Source: census.gov ACS</h4>
    </div>
  );
  const dashboardDescriptionVisible = boolean('Include Description:', true);

  return (
    <div>
      <div style={{ margin: '0 4%'}}>
        <BaseMap
          mapboxToken={mapboxToken}
          mapboxStyle={mapboxStyle}
          initialZoom={10.5}
          initialLatitude={45.5445}
          initialLongitude={-122.7250}
          height={650}
        >
            <CivicSandboxMap mapLayers={mapLayers}>
            </CivicSandboxMap>
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
          { dashboardDescriptionVisible ? dashboardInformation : null }
        </CivicSandboxDashboard>
      </div>
    </div>
  );
};


export default () => storiesOf('CIVIC Platform Components/CIVIC Sandbox Dashboard', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add('Simple usage', () => (
    <LoadData urls={dataURLs}>
      { (foundation1, slide1, slide2) => dashboardComponent(foundation1, slide1, slide2) }
    </LoadData>
  ));
