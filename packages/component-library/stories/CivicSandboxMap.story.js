/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import * as d3 from 'd3';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { CivicSandboxMap } from '../src';
import CivicSandboxTooltip from '../src/CivicSandboxMap/CivicSandboxTooltip';

class LoadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null,
    };
  }

  componentDidMount() {
    const cmp = this;
    d3.queue()
      .defer(d3.json, this.props.urls[0])
      .defer(d3.json, this.props.urls[1])
      .defer(d3.json, this.props.urls[2])
      .defer(d3.json, this.props.urls[3])
      .defer(d3.json, this.props.urls[4])
      .defer(d3.json, this.props.urls[5])
      .defer(d3.json, this.props.urls[6])
      .defer(d3.json, this.props.urls[7])
      .await(
        (
          error,
          foundation1,
          foundation2,
          foundation3,
          slide1,
          slide2,
          slide3,
          slide4,
          slide5
        ) => {
          if (error) {
            return this.setState({ error });
          }
          cmp.setState({
            data: {
              foundation1,
              foundation2,
              foundation3,
              slide1,
              slide2,
              slide3,
              slide4,
              slide5,
            },
          });
        }
      );
  }

  render() {
    if (this.state.data === null) {
      return null;
    }
    return this.props.children(this.state.data);
  }
}

const displayName = CivicSandboxMap.displayName || 'CivicSandboxMap';

const dataURLs = [
  'https://gist.githubusercontent.com/mendozaline/f78b076ce13a9fd484f6b8a004065a95/raw/ff8bd893ba1890a6f6c20265f720587f9595a9c4/property-values.json',
  'https://gist.githubusercontent.com/mendozaline/f78b076ce13a9fd484f6b8a004065a95/raw/ff8bd893ba1890a6f6c20265f720587f9595a9c4/pop.json',
  'https://gist.githubusercontent.com/mendozaline/f78b076ce13a9fd484f6b8a004065a95/raw/ff8bd893ba1890a6f6c20265f720587f9595a9c4/children.json',
  'https://gist.githubusercontent.com/mendozaline/b3a75b40c9a60781b6adc77cebb9b400/raw/fa0aa13c75bfcc2fd92ccf1f3cc612af83d5d704/005-gardens.json',
  'https://gist.githubusercontent.com/mendozaline/b3a75b40c9a60781b6adc77cebb9b400/raw/fa0aa13c75bfcc2fd92ccf1f3cc612af83d5d704/002-bike-lanes.json',
  'https://gist.githubusercontent.com/mendozaline/b3a75b40c9a60781b6adc77cebb9b400/raw/fa0aa13c75bfcc2fd92ccf1f3cc612af83d5d704/010-grocery.json',
  'https://gist.githubusercontent.com/mendozaline/b3a75b40c9a60781b6adc77cebb9b400/raw/fa0aa13c75bfcc2fd92ccf1f3cc612af83d5d704/017-building-permits.json',
  'https://gist.githubusercontent.com/mendozaline/b3a75b40c9a60781b6adc77cebb9b400/raw/11dd037d964b0b444cafdc060691a219deebdf21/016-points-interest.json',
];

export default () =>
  storiesOf('Maps/CIVIC Sandbox Map', module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add('Simple usage', () => (
      <LoadData urls={dataURLs}>
        {data => {
          if (data === null) {
            return null;
          }

          const {
            foundation1,
            foundation2,
            foundation3,
            slide1,
            slide2,
            slide3,
            slide4,
            slide5,
          } = data;

          const mapboxToken =
            'pk.eyJ1IjoiaGFja29yZWdvbiIsImEiOiJjamk0MGZhc2cwNDl4M3FsdHAwaG54a3BnIn0.Fq1KA0IUwpeKQlFIoaEn_Q';

          const mapStyleOptions = {
            'Hack Oregon Light':
              'mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg',
            'Hack Oregon Dark':
              'mapbox://styles/hackoregon/cjie02elo1vyw2rohd24kbtbd',
            Scenic: 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
            'Navigation Guidance Night':
              'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
            'Lè Shine':
              'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
            'North Star':
              'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
            Odyssey: 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
          };
          const mapboxStyle = select(
            'Mapbox Style',
            mapStyleOptions,
            mapStyleOptions['Hack Oregon Light']
          );

          const opacityOptions = {
            range: true,
            min: 0,
            max: 1,
            step: 0.05,
          };
          const opacity = number('Opacity:', 0.75, opacityOptions);

          const colorOptions = {
            Thermal:
              '[[255,255,204,255],[255,237,160,255],[254,217,118,255],[254,178,76,255],[253,141,60,255],[252,78,42,255],[227,26,28,255],[189,0,38,255],[128,0,38,255]]',
            Planet:
              '[[247,244,249,255],[231,225,239,255],[212,185,218,255],[201,148,199,255],[223,101,176,255],[231,41,138,255],[206,18,86,255],[152,0,67,255],[103,0,31,255]]',
            Space:
              '[[247,252,253,255],[224,236,244,255],[191,211,230,255],[158,188,218,255],[140,150,198,255],[140,107,177,255],[136,65,157,255],[129,15,124,255],[77,0,75,255]]',
            Earth:
              '[[255,247,251,255],[236,226,240,255],[208,209,230,255],[166,189,219,255],[103,169,207,255],[54,144,192,255],[2,129,138,255],[1,108,89,255],[1,70,54,255]]',
            Ocean:
              '[[255,255,217,255],[237,248,177,255],[199,233,180,255],[127,205,187,255],[65,182,196,255],[29,145,192,255],[34,94,168,255],[37,52,148,255],[8,29,88,255]]',
          };
          const colorScheme = select(
            'Color Schemes:',
            colorOptions,
            colorOptions.Earth
          );
          const colorSchemeArray = JSON.parse(colorScheme);

          const screenGridcolorScheme = select(
            'ScreenGrid Color Schemes:',
            colorOptions,
            colorOptions.Thermal
          );
          const screenGridcolorSchemeArray = JSON.parse(screenGridcolorScheme);

          const propertyValueGetColor = f => {
            const propertyValue = parseFloat(f.properties.prop_value);
            return propertyValue < 250000
              ? colorSchemeArray[0]
              : propertyValue < 500000
              ? colorSchemeArray[1]
              : propertyValue < 750000
              ? colorSchemeArray[2]
              : propertyValue < 1000000
              ? colorSchemeArray[3]
              : propertyValue < 1250000
              ? colorSchemeArray[4]
              : propertyValue < 1500000
              ? colorSchemeArray[5]
              : propertyValue < 1750000
              ? colorSchemeArray[6]
              : propertyValue < 2000000
              ? colorSchemeArray[7]
              : colorSchemeArray[8];
          };

          const populationGetColor = f => {
            const population = parseFloat(f.properties.total_population);
            return population < 3000
              ? colorSchemeArray[0]
              : population < 8000
              ? colorSchemeArray[1]
              : population < 12000
              ? colorSchemeArray[2]
              : population < 16000
              ? colorSchemeArray[3]
              : population < 20000
              ? colorSchemeArray[4]
              : population < 24000
              ? colorSchemeArray[5]
              : population < 28000
              ? colorSchemeArray[6]
              : population < 32000
              ? colorSchemeArray[7]
              : colorSchemeArray[8];
          };

          const householdChildrenGetColor = f => {
            const householdChildren = parseFloat(
              f.properties.pc_household_with_children_under_18
            );
            return householdChildren < 0.04
              ? colorSchemeArray[0]
              : householdChildren < 0.08
              ? colorSchemeArray[1]
              : householdChildren < 0.12
              ? colorSchemeArray[2]
              : householdChildren < 0.16
              ? colorSchemeArray[3]
              : householdChildren < 0.2
              ? colorSchemeArray[4]
              : householdChildren < 0.24
              ? colorSchemeArray[5]
              : householdChildren < 0.28
              ? colorSchemeArray[6]
              : householdChildren < 0.32
              ? colorSchemeArray[7]
              : colorSchemeArray[8];
          };

          const foundations = {
            '006-property-values': {
              mapType: 'ChoroplethMap',
              id: 'choropleth-layer-foundation-property-values',
              pickable: true,
              data: foundation1.slide_data.features,
              opacity,
              getPolygon: f => f.geometry.coordinates,
              getLineColor: f => [0, 0, 0, 255],
              getLineWidth: f => 40,
              stroked: true,
              getFillColor: propertyValueGetColor,
              filled: true,
              onClick: info =>
                action('Layer clicked:', { depth: 2 })(info, info.object),
              autoHighlight: true,
              highlightColor: [200, 200, 200, 150],
              updateTriggers: { getFillColor: propertyValueGetColor },
            },
            '007-population': {
              mapType: 'ChoroplethMap',
              id: 'choropleth-layer-foundation-population',
              pickable: true,
              data: foundation2.slide_data.features,
              opacity,
              getPolygon: f => f.geometry.coordinates,
              getLineColor: f => [0, 0, 0, 255],
              getLineWidth: f => 40,
              stroked: true,
              getFillColor: populationGetColor,
              filled: true,
              onClick: info =>
                action('Layer clicked:', { depth: 2 })(info, info.object),
              autoHighlight: true,
              highlightColor: [200, 200, 200, 150],
              updateTriggers: { getFillColor: populationGetColor },
            },
            '015-household-children': {
              mapType: 'ChoroplethMap',
              id: 'choropleth-layer-foundation-household-children',
              pickable: true,
              data: foundation3.slide_data.features,
              opacity,
              getPolygon: f => f.geometry.coordinates,
              getLineColor: f => [255, 255, 255, 255],
              getLineWidth: f => 40,
              stroked: true,
              getFillColor: householdChildrenGetColor,
              filled: true,
              onClick: info =>
                action('Layer clicked:', { depth: 2 })(info, info.object),
              autoHighlight: true,
              highlightColor: [200, 200, 200, 150],
              updateTriggers: { getFillColor: householdChildrenGetColor },
            },
          };

          // SLIDES
          // 005 Community Gardens
          const gardensBoundary = {
            mapType: 'PolygonPlotMap',
            id: 'boundary-layer-gardens-slide',
            data: slide1.slide_meta.boundary,
            opacity: 1,
            filled: false,
            getPolygon: f => f.coordinates,
            getLineColor: f => [25, 183, 170, 255],
            getLineWidth: f => 45,
            lineWidthScale: 1,
            lineJointRounded: false,
          };
          const gardensMap = {
            mapType: 'SmallPolygonMap',
            id: 'polygon-layer-gardens-slide',
            pickable: true,
            data: slide1.slide_data.features,
            opacity: 1,
            getPolygon: f => f.geometry.coordinates,
            getLineColor: f => [25, 183, 170, 255],
            getLineWidth: f => 50,
            stroked: true,
            getFillColor: f => [25, 183, 170, 255],
            filled: true,
            autoHighlight: true,
            highlightColor: [100, 100, 100, 255],
          };

          // 002 Bike Lanes
          const bikeLanesBoundary = {
            mapType: 'PolygonPlotMap',
            id: 'boundary-layer-bike-lanes',
            data: slide2.slide_meta.boundary,
            opacity: 1,
            filled: false,
            getPolygon: f => f.coordinates,
            getLineColor: f => [220, 69, 86, 255],
            getLineWidth: f => 45,
            lineWidthScale: 1,
            lineJointRounded: false,
          };
          const bikeLanesMap = {
            mapType: 'PathMap',
            id: 'path-layer-bike-lanes',
            pickable: true,
            data: slide2.slide_data.features,
            opacity: 1,
            getColor: f => [220, 69, 86, 255],
            getPath: f => f.geometry.coordinates,
            getWidth: f => 40,
            rounded: false,
            autoHighlight: true,
            highlightColor: [100, 100, 100, 255],
          };

          // 010 Grocery Stores
          const groceryBoundary = {
            mapType: 'PolygonPlotMap',
            id: 'boundary-layer-grocery',
            data: slide3.slide_meta.boundary,
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
            data: slide3.slide_data.features,
            getPosition: f => f.geometry.coordinates,
            opacity: 0.9,
            getColor: f => [138, 43, 226, 255],
            getRadius: f => 50,
            radiusScale: 1,
            radiusMinPixels: 1,
            autoHighlight: true,
            highlightColor: [100, 100, 100, 100],
            parameters: { depthTest: false },
          };

          // 017 Building Permits
          const buildingPermitsMap = {
            mapType: 'ScreenGridMap',
            id: 'screengrid-layer-building-permits',
            pickable: true,
            data: slide4.slide_data.features,
            getPosition: f => f.geometry.coordinates,
            opacity: 0.75,
            colorRange: screenGridcolorSchemeArray,
            cellSizePixels: 40,
            autoHighlight: true,
            highlightColor: [100, 100, 100, 255],
            updateTriggers: { instanceColors: screenGridcolorSchemeArray },
          };

          // 016 Points of Interest
          const poiBoundary = {
            mapType: 'PolygonPlotMap',
            id: 'boundary-layer-poi',
            data: slide5.slide_meta.boundary,
            opacity: 1,
            filled: false,
            getPolygon: f => f.coordinates,
            getLineColor: f => [0, 0, 0, 255],
            getLineWidth: f => 45,
            lineWidthScale: 1,
            lineJointRounded: false,
          };

          const iconMapping = {
            School: {
              x: 0,
              y: 0,
              width: 250,
              height: 250,
              mask: true,
            },
            Hospital: {
              x: 250,
              y: 0,
              width: 250,
              height: 250,
              mask: true,
            },
            BEECN: {
              x: 500,
              y: 0,
              width: 250,
              height: 250,
              mask: true,
            },
            'Fire Station': {
              x: 0,
              y: 250,
              width: 250,
              height: 250,
              mask: true,
            },
            Pin: {
              x: 250,
              y: 250,
              width: 250,
              height: 250,
              mask: true,
            },
            COMMCTR: {
              x: 500,
              y: 250,
              width: 250,
              height: 250,
              mask: true,
            },
          };

          const iconZoomScale = zoom =>
            zoom > 11.5
              ? 10
              : zoom > 10.5
              ? 8
              : zoom > 9.5
              ? 6
              : zoom > 8.5
              ? 4
              : zoom > 7.5
              ? 2
              : 1;

          const getIconColor = f =>
            f.properties.type === 'BEECN'
              ? [25, 183, 170, 255]
              : f.properties.type === 'COMMCTR'
              ? [114, 29, 124, 255]
              : f.properties.type === 'Fire Station'
              ? [220, 69, 86, 255]
              : f.properties.type === 'School'
              ? [255, 178, 38, 255]
              : f.properties.type === 'Hospital'
              ? [30, 98, 189, 255]
              : [0, 0, 0, 255];

          const poiMap = {
            mapType: 'IconMap',
            id: 'icon-layer-poi',
            pickable: true,
            data: slide5.slide_data.features,
            opacity: 1,
            iconAtlas: 'https://i.imgur.com/l9URQ58.png',
            iconMapping,
            sizeScale: iconZoomScale,
            getPosition: f => f.geometry.coordinates,
            getIcon: f => f.properties.type,
            getSize: f => 10,
            getColor: getIconColor,
            autoHighlight: true,
            highlightColor: [0, 0, 0, 255],
          };

          const foundationOptions = {
            'Property Values': '006-property-values',
            Population: '007-population',
            'Households with Children': '015-household-children',
          };
          const foundationSelected = select(
            'Foundations:',
            foundationOptions,
            foundationOptions.Population
          );

          const bikeLanesSlideVisible = boolean('Bike Lanes:', true);
          const gardensSlideVisible = boolean('Community Gardens:', false);
          const grocerySlideVisible = boolean('Grocery Stores:', false);
          const poiSlideVisible = boolean('Points of Interest:', true);
          const buildingPermitsSlideVisible = boolean(
            'Building Permits:',
            false
          );

          const allMapLayers = [
            {
              data: foundations[foundationSelected],
              visible: true,
            },
            {
              data: buildingPermitsMap,
              visible: buildingPermitsSlideVisible,
            },
            {
              data: bikeLanesBoundary,
              visible: bikeLanesSlideVisible,
            },
            {
              data: bikeLanesMap,
              visible: bikeLanesSlideVisible,
            },
            {
              data: gardensBoundary,
              visible: gardensSlideVisible,
            },
            {
              data: gardensMap,
              visible: gardensSlideVisible,
            },
            {
              data: groceryBoundary,
              visible: grocerySlideVisible,
            },
            {
              data: groceryMap,
              visible: grocerySlideVisible,
            },
            {
              data: poiBoundary,
              visible: poiSlideVisible,
            },
            {
              data: poiMap,
              visible: poiSlideVisible,
            },
          ];

          const mapLayersArray = allMapLayers.filter(d => {
            if (d.visible === true) {
              return d.data;
            }
          });

          return (
            <div>
              <BaseMap
                mapboxToken={mapboxToken}
                mapboxStyle={mapboxStyle}
                initialZoom={10.1}
                initialLatitude={45.5445}
              >
                <CivicSandboxMap mapLayers={mapLayersArray}>
                  <CivicSandboxTooltip />
                </CivicSandboxMap>
              </BaseMap>
            </div>
          );
        }}
      </LoadData>
    ));
