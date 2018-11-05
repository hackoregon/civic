import React from 'react';
import * as d3 from 'd3';
import { CivicSandboxCard } from '@hackoregon/component-library';

const wallOfText =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const dataURLs = [
  'https://gist.githubusercontent.com/mendozaline/f78b076ce13a9fd484f6b8a004065a95/raw/ff8bd893ba1890a6f6c20265f720587f9595a9c4/pop.json',
  'https://gist.githubusercontent.com/mendozaline/b3a75b40c9a60781b6adc77cebb9b400/raw/fa0aa13c75bfcc2fd92ccf1f3cc612af83d5d704/010-grocery.json',
];

class ViolentShakingAndGroundDeformation extends React.Component {
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
      .defer(d3.json, dataURLs[0])
      .defer(d3.json, dataURLs[1])
      .await((error, foundation1, slide1) => {
        if (error) {
          cmp.setState({ error: error });
        }
        cmp.setState({ foundation1, slide1 });
      });
  }

  render() {
    if (this.state.foundation1 === null) {
      return null;
    }
    const { foundation1, slide1 } = this.state;
    return dashboardComponent(foundation1, slide1);
  }
}

const dashboardComponent = (foundationData1, slideData1) => {
  if (foundationData1 === null) {
    return null;
  }

  const mapboxToken =
    'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';
  const mapboxStyle = 'mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg';
  const planetColorScheme = [
    [247, 244, 249, 255],
    [231, 225, 239, 255],
    [212, 185, 218, 255],
    [201, 148, 199, 255],
    [223, 101, 176, 255],
    [231, 41, 138, 255],
    [206, 18, 86, 255],
    [152, 0, 67, 255],
    [103, 0, 31, 255],
  ];

  const populationGetColor = f => {
    const population = parseFloat(f.properties.total_population);
    return population < 3000
      ? planetColorScheme[0]
      : population < 8000
        ? planetColorScheme[1]
        : population < 12000
          ? planetColorScheme[2]
          : population < 16000
            ? planetColorScheme[3]
            : population < 20000
              ? planetColorScheme[4]
              : population < 24000
                ? planetColorScheme[5]
                : population < 28000
                  ? planetColorScheme[6]
                  : population < 32000
                    ? planetColorScheme[7]
                    : planetColorScheme[8];
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
    getColor: f => [138, 43, 226, 255],
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
    visualizationType: 'Legend',
    title: 'Map Legend',
    min: 2500,
    max: 32000,
    colors: [
      'rgba(247,244,249,1.0)',
      'rgba(231,225,239,1.0)',
      'rgba(212,185,218,1.0)',
      'rgba(201,148,199,1.0)',
      'rgba(223,101,176,1.0)',
      'rgba(231,41,138,1.0)',
      'rgba(206,18,86,1.0)',
      'rgba(152,0,67,1.0)',
      'rgba(103,0,31,1.0)',
    ],
  };

  const textData = {
    visualizationType: 'Text',
    title: 'Population',
    data: 245450,
  };

  const comparisonBarData = {
    visualizationType: 'ComparisonBar',
    title: 'Total Population',
    data: [
      {
        name: 'Downtown',
        value: 30639,
        sortOrder: 2,
      },
      {
        name: 'Average Total Population',
        value: 55000,
        sortOrder: 1,
      },
    ],
    dataLabel: 'name',
    dataValue: 'value',
    sortOrder: 'sortOrder',
    minimalist: true,
  };

  const donutData = {
    visualizationType: 'PercentDonut',
    title: 'Households with Children',
    data: [
      {
        x: 'Households with Children',
        y: 0.75,
      },
      {
        x: null,
        y: 0.25,
      },
    ],
  };

  const desktop = true;
  const legendVisible = true;
  const textVisible = true;
  const comparisonBarsVisible = true;
  const donutVisible = true;

  const dashboardArray = [
    {
      data: legendData,
      visible: legendVisible,
    },
    {
      data: textData,
      visible: textVisible,
    },
    {
      data: comparisonBarData,
      visible: comparisonBarsVisible,
    },
    {
      data: donutData,
      visible: donutVisible,
    },
  ];

  const dashboardData = dashboardArray.filter(d => d.visible).map(d => d.data);

  //Dashboard Description
  const title = 'Severe Shaking and Ground Deformation';
  const dashboardContents = (
    <div>
      <p>
        Based on developed models, scientists can estimate what will happen to
        the ground in a 9.0 Cascadia Subduction Zone earthquake. The below maps
        apply these models to Portland based on a calculated average for each
        neighborhood, based on the following:
      </p>
      <ul>
        <li>
          <p>
            Shaking intensity, how much the surface of the earth moves during an
            earthquake, is represented using a{' '}
            <a href="https://earthquake.usgs.gov/learn/topics/mercalli.php">
              Modified Mercalli (MM) Intensity scale.
            </a>
          </p>
        </li>
        <li>
          <p>
            Total Deformation (average of liquefaction/landslide combined)
            during a wet season is impacted by both landslide potential and
            liquefaction potential. Landslide potential is based on topography
            and soil conditions. Liquefaction potential estimates the potential
            for saturated (wet), unconsolidated/loose ground materials to
            liquefy or give way during an earthquake.
          </p>
        </li>
        <li>
          <p>
            Total Deformation (average of landslide - there’s no liquefaction)
            during a dry season season is impacted by landslide potential based
            on topography. The lack of moisture in the ground will lessen the
            impact of the event.
          </p>
        </li>
      </ul>
      <h4>
        Source:{' '}
        <a href="http://www.oregongeology.org/pubs/ofr/p-O-18-02.htm">DOGAMI</a>
      </h4>
    </div>
  );

  return (
    <CivicSandboxCard
      mapLayers={mapLayers}
      dashboardData={dashboardData}
      title={title}
    >
      {dashboardContents}
    </CivicSandboxCard>
  );
};

ViolentShakingAndGroundDeformation.displayName =
  'ViolentShakingAndGroundDeformation';

// Connect this to the redux store when necessary
export default ViolentShakingAndGroundDeformation;
