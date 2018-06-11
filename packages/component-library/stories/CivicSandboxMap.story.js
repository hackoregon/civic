import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, selectV2, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { CivicSandboxMap } from '../src';
import CivicSandboxTooltip from '../src/CivicSandboxMap/CivicSandboxTooltip';

import neighborhoodsData from '../src/CivicSandboxMap/neighborhoods.json';
import voterPrecinctsData from '../src/CivicSandboxMap/voterPrecincts.json';
import zipCodesData from '../src/CivicSandboxMap/zipCodes.json';
import propertyValuesData from '../src/CivicSandboxMap/propertyValues.json';

import bikePathData from '../src/PathMap/data.json';
import busStopsData from '../src/ScatterPlotMap/busStops.json';
import sweepsData from '../src/CivicSandboxMap/sweeps.json';
import gardensData from '../src/CivicSandboxMap/gardens.json';
import parksData from '../src/CivicSandboxMap/parks.json';
import multiTrailsData from '../src/CivicSandboxMap/multiTrails.json';
import bikeParkingData from '../src/CivicSandboxMap/bikeParking.json';

const displayName = CivicSandboxMap.displayName || 'CivicSandboxMap';

const demoMap = () => {
  const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';

  //Bike Lanes Color Function
  const colors = [[255,120,1],[255,210,159],[255,255,255],[147,207,210],[30,130,135]];
  const getPathColor = f => {
    const speedString = f.properties.avg_bike_speed.split('m')[0];
    const speed = parseFloat(speedString);
    return speed < 8 ? colors[0] :
      speed < 9 ? colors[1] :
      speed < 10 ? colors[2] :
      speed < 11 ? colors[3] : colors[4];
  };

  const foundations = {
    "neighborhoods": {
      mapType: "ChoroplethMap",
      id: "polygon-layer-foundation-neighborhoods",
      pickable:true,
      data: neighborhoodsData.slide_data.features,
      opacity: 1,
      getPolygon: f => f.geometry.coordinates,
      getLineColor: f => [255,255,255,255],
      getLineWidth: f => 50,
      lineWidthMinPixels: 1,
      stroked: true,
      getFillColor: f => [30,144,255,50],
      filled: true,
      onClick: info => action("Layer clicked:", { depth: 2 })(info, info.object),
      autoHighlight: true,
      highlightColor: [200,200,200,150],
    },
    "voter precincts": {
      mapType: "ChoroplethMap",
      id: "polygon-layer-foundation-voter-precincts",
      pickable:true,
      data: voterPrecinctsData.slide_data.features,
      opacity: 1,
      getPolygon: f => f.geometry.coordinates,
      getLineColor: f => [255,255,255,255],
      getLineWidth: f => 50,
      lineWidthMinPixels: 1,
      stroked: true,
      getFillColor: f => [255,144,30,50],
      filled: true,
      onClick: info => action("Layer clicked:", { depth: 2 })(info, info.object),
      autoHighlight: true,
      highlightColor: [200,200,200,150],
    },
    "zip codes": {
      mapType: "ChoroplethMap",
      id: "polygon-layer-foundation-zip-codes",
      pickable:true,
      data: zipCodesData.slide_data.features,
      opacity: 1,
      getPolygon: f => f.geometry.coordinates,
      getLineColor: f => [255,255,255,255],
      getLineWidth: f => 50,
      lineWidthMinPixels: 1,
      stroked: true,
      getFillColor: f => [30,255,255,50],
      filled: true,
      onClick: info => action("Layer clicked:", { depth: 2 })(info, info.object),
      autoHighlight: true,
      highlightColor: [200,200,200,150],
    },
    "property values": {
      mapType: "ChoroplethMap",
      id: "polygon-layer-foundation-property-values",
      pickable:true,
      data: propertyValuesData.slide_data.features,
      opacity: 1,
      getPolygon: f => f.geometry.coordinates,
      getLineColor: f => [255,255,255,255],
      getLineWidth: f => 50,
      lineWidthMinPixels: 1,
      stroked: true,
      getFillColor: f => [255,55,255,50],
      filled: true,
      onClick: info => action("Layer clicked:", { depth: 2 })(info, info.object),
      autoHighlight: true,
      highlightColor: [200,200,200,150],
    }
  };

  const gardensBoundary = {
    mapType: "ChoroplethMap",
    id: "polygon-layer-gardens-slide-boundary",
    data: gardensData.slide_meta.boundary,
    opacity: 0.5,
    filled: false,
    getPolygon: f => f.coordinates,
    getLineColor: f => [0,255,0,255],
    getLineWidth: f => 25,
    lineWidthScale: 1,
    lineJointRounded: false,
  };
  const gardensMap = {
    mapType: "ChoroplethMap",
    id: "polygon-layer-gardens-slide",
    pickable: true,
    data: gardensData.slide_data.features,
    opacity: 1,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [0,255,0,255],
    getLineWidth: f => 50,
    lineWidthMinPixels: 1,
    stroked: true,
    getFillColor: f => [0,255,0,255],
    filled: true,
    onClick: info => action("Layer clicked:", { depth: 2 })(info, info.object),
    autoHighlight: true,
    highlightColor: [100,100,100,255],
  };

  const parksBoundary = {
    mapType: "ChoroplethMap",
    id: "polygon-layer-parks-boundary",
    data: parksData.slide_meta.boundary,
    opacity: 0.5,
    filled: false,
    getPolygon: f => f.coordinates,
    getLineColor: f => [0,255,0,255],
    getLineWidth: f => 25,
    lineWidthScale: 1,
    lineJointRounded: false,
  };
  const parksMap = {
    mapType: "ChoroplethMap",
    id: "polygon-layer-parks-slide",
    pickable: true,
    data: parksData.slide_data.features,
    opacity: 1,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [0,255,0,255],
    getLineWidth: f => 50,
    lineWidthMinPixels: 1,
    stroked: true,
    getFillColor: f => [0,255,0,255],
    filled: true,
    onClick: info => action("Layer clicked:", { depth: 2 })(info, info.object),
    autoHighlight: true,
    highlightColor: [100,100,100,255],
  };

  const bikeMapBoundary = {
    mapType: "ChoroplethMap",
    id: "polygon-layer-bike-lanes-boundary",
    data: [bikePathData.slide_meta.boundary],
    opacity: 0.75,
    filled: false,
    getPolygon: f => f.coordinates,
    getLineColor: f => [255,165,0,255],
    getLineWidth: f => 25,
    lineWidthScale: 1,
    lineJointRounded: false,
  };
  const bikeMap = {
    mapType: "PathMap",
    id: "path-layer-bike-lanes",
    pickable: true,
    data: bikePathData.slide_data.features,
    opacity: 1,
    getColor: getPathColor,
    getPath: f => f.geometry.coordinates,
    getWidth: f => 75,
    widthScale: 1,
    widthMinPixels: 1,
    rounded: true,
    autoHighlight: true,
    highlightColor: [200,200,200,100],
    onClick: info => action("Layer clicked:", { depth: 2 })(info, info.object),
  };

  const multiTrailsBoundary = {
    mapType: "ChoroplethMap",
    id: "polygon-layer-multi-trails-boundary",
    data: multiTrailsData.slide_meta.boundary,
    opacity: 0.5,
    filled: false,
    getPolygon: f => f.coordinates,
    getLineColor: f => [255,0,0,255],
    getLineWidth: f => 25,
    lineWidthScale: 1,
    lineJointRounded: false,
  };
  const multiTrailsMap = {
    mapType: "PathMap",
    id: "path-layer-multi-trails",
    pickable: true,
    data: multiTrailsData.slide_data.features,
    opacity: 1,
    getColor: f => [255,0,0,255],
    getPath: f => f.geometry.coordinates,
    getWidth: f => 50,
    widthScale: 1,
    widthMinPixels: 1,
    rounded: false,
    autoHighlight: true,
    highlightColor: [200,200,200,255],
    onClick: info => action("Layer clicked:", { depth: 2 })(info, info.object),
  };

  const busStopMapBoundary = {
    mapType: "ChoroplethMap",
    id: "points-layer-bus-stops-boundary",
    data: busStopsData.slide_meta.boundary,
    opacity: 0.5,
    filled: false,
    getPolygon: f => f.coordinates,
    getLineColor: f => [138,43,226,255],
    getLineWidth: f => 25,
    lineWidthScale: 1,
    lineJointRounded: false,
  };
  const busStopsMap = {
    mapType: "ScatterPlotMap",
    id: "scatterplot-layer-bus-stops",
    pickable: true,
    data: busStopsData.slide_data.features,
    getPosition: f => f.geometry.coordinates,
    opacity: 0.9,
    getColor: f => [138,43,226,255],
    getRadius: f => 75,
    radiusScale: 1,
    radiusMinPixels: 1,
    autoHighlight: true,
    onClick: info => action("Layer clicked:", { depth: 2 })(info, info.object),
    parameters: {depthTest: false},
    highlightColor: [200,200,200,255],
  };

  const sweepsMapBoundary = {
    mapType: "ChoroplethMap",
    id: "points-layer-sweeps-boundary",
    data: sweepsData.slide_meta.boundary,
    opacity: 0.9,
    filled: false,
    getPolygon: f => f.coordinates,
    getLineColor: f => [255,128,0,255],
    getLineWidth: f => 25,
    lineWidthScale: 1,
    lineJointRounded: false,
  };
  const sweepsMap = {
    mapType: "ScatterPlotMap",
    id: "scatterplot-layer-sweeps",
    pickable: true,
    data: sweepsData.slide_data.features,
    getPosition: f => f.geometry.coordinates,
    opacity: 0.33,
    getColor: f => [255,128,0,255],
    getRadius: f => 75,
    radiusScale: 1,
    radiusMinPixels: 1,
    autoHighlight: true,
    onClick: info => action("Layer clicked:", { depth: 2 })(info, info.object),
    parameters: {depthTest: false},
    highlightColor: [200,200,200,150],
  };

  const bikeParkingBoundary = {
    mapType: "ChoroplethMap",
    id: "points-layer-bike-parrking",
    data: bikeParkingData.slide_meta.boundary,
    opacity: 0.9,
    filled: false,
    getPolygon: f => f.coordinates,
    getLineColor: f => [255,255,0,255],
    getLineWidth: f => 25,
    lineWidthScale: 1,
    lineJointRounded: false,
  };
  const bikeParkingMap = {
    mapType: "ScreenGridMap",
    id: "screengrid-layer-bike-parrking",
    pickable: true,
    data: bikeParkingData.slide_data.features,
    getPosition: f => f.geometry.coordinates,
    opacity: 0.33,
    colorRange: [[237,248,251],[178,226,226],[102,194,164],[35,139,69]],
    cellSizePixels: 40,
    autoHighlight: true,
    onClick: info => action("Layer clicked:", { depth: 2 })(info, info.object),
    highlightColor: [200,200,200,150],
  };

  const foundationOptions = {
    "Neighborhoods": '"neighborhoods"',
    "Property Values": '"property values"',
    "Voter Precincts": '"voter precincts"',
    "Zip Codes": '"zip codes"',
  };
  const foundationSelected = selectV2("Foundations:", foundationOptions, foundationOptions["Neighborhoods"]);

  const gardensSlideVisible = boolean("Slide #1 Gardens:", true);
  const bikeLanesSlideVisible = boolean("Slide #2 Bike Lanes:", false);
  const busStopsSlideVisible = boolean("Slide #3 Bus Stop:", false);
  const sweepsSlideVisible = boolean("Slide #4 Sweeps:", false);
  const multiTrailsVisible = boolean("Slide #5 Multi-Use Trails:", false);
  const bikeParkingVisible = boolean("Slide #6 Bike Parking:", false);
  const parksSlideVisible = boolean("Slide #7 Parks:", false);

  const allDataMapLayers = [
    {
      "data": foundations[JSON.parse(foundationSelected)],
      "visible": true,
    },
    {
      "data": gardensBoundary,
      "visible": gardensSlideVisible,
    },
    {
      "data": gardensMap,
      "visible": gardensSlideVisible,
    },
    {
      "data": parksBoundary,
      "visible": parksSlideVisible,
    },
    {
      "data": parksMap,
      "visible": parksSlideVisible,
    },
    {
        "data": bikeMapBoundary,
        "visible": bikeLanesSlideVisible,
     },
     {
        "data": bikeMap,
        "visible": bikeLanesSlideVisible,
     },
     {
        "data": multiTrailsBoundary,
        "visible": multiTrailsVisible,
     },
     {
        "data": multiTrailsMap,
        "visible": multiTrailsVisible,
     },
     {
       "data": busStopMapBoundary,
        "visible": busStopsSlideVisible,
     },
     {
        "data": busStopsMap,
        "visible": busStopsSlideVisible,
     },
     {
       "data": sweepsMapBoundary,
        "visible": sweepsSlideVisible,
     },
     {
        "data": sweepsMap,
        "visible": sweepsSlideVisible,
     },
     {
       "data": bikeParkingBoundary,
        "visible": bikeParkingVisible,
     },
     {
        "data": bikeParkingMap,
        "visible": bikeParkingVisible,
     },
  ];

  const dataMapLayers = allDataMapLayers.filter(d => {
    if (d.visible === true) { return d.data }
  });

  return (
    <div>
      <BaseMap
        mapboxToken={mapboxToken}
        mapboxStyle={"mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7"}
        initialZoom={10.5}
      >
        <CivicSandboxMap
          mapLayers={dataMapLayers}
        >
          <CivicSandboxTooltip/>
        </CivicSandboxMap>
      </BaseMap>
    </div>
  );
};

export default () => storiesOf(displayName, module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add("Simple usage",
    (demoMap)
  );
