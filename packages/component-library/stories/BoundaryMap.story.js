import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, number, selectV2, boolean, color } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { BoundaryMap } from '../src';
import { PathMap } from '../src';

import boundaryData from '../src/BoundaryMap/data.json';
import pathData from '../src/PathMap/data.json';

const displayName = BoundaryMap.displayName || 'BoundaryMap';

const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';

const demoMap = () => {
  const mapStylesOptions = {
    'Hack Oregon Light': 'mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg',
    'Hack Oregon Dark': 'mapbox://styles/hackoregon/cjie02elo1vyw2rohd24kbtbd',
    'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
    'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
    'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
    'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
    'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
  };
  const mapboxStyle = selectV2('Mapbox Style', mapStylesOptions, mapStylesOptions['Navigation Guidance Night']);

  const opacityOptions = {
     range: true,
     min: 0,
     max: 1,
     step: 0.1,
  };
  const opacity = number('Boundary Opacity:', 0.9, opacityOptions);

  const getPolygon = d => d.coordinates;

  const colorPicker = color('Boundary Color:', '#00ff00');

  const colorOption1 = colorPicker.slice(5,-1)
    .split(',')
    .map(n => parseInt(n, 10))
    .filter((n,i) => i < 3);

  const colorOption2 = [50,205,50,255];

  const boundaryColor = colorPicker.charAt(0) !== '#' ? colorOption1 : colorOption2;

  const getLineColor = d => boundaryColor;

  const getLineWidth = d => 40;

  const lineWidthScaleOptions = {
     range: true,
     min: 1,
     max: 15,
     step: 1,
  };
  const lineWidthScale= number('Boundary Width Scale:', 1, lineWidthScaleOptions);

  const lineJointRounded = boolean('Boundary Rounded:', false);

  const getFillColor = d => boundaryColor;

  const filled = boolean('Boundary Filled:', false);

  const arrayData = [boundaryData.slide_meta.boundary];


  const pathColorSchemeOptions = {
    'Blue Green': '[[237,248,251],[178,226,226],[102,194,164],[44,162,95],[0,109,44]]',
    'Red Purple': '[[254,235,226],[251,180,185],[247,104,161],[197,27,138],[122,1,119]]',
    'Purple Blue': '[[241,238,246],[189,201,225],[116,169,207],[43,140,190],[4,90,141]]',
    'Yellow Orange Red': '[[255,255,178],[254,204,92],[253,141,60],[240,59,32],[189,0,38]]',
    'Red Yellow Blue': '[[215,25,28],[253,174,97],[255,255,191],[171,217,233],[44,123,182]]',
  };
  const pathColorScheme = selectV2('Path Color Scheme:', pathColorSchemeOptions, pathColorSchemeOptions['Red Yellow Blue']);
  const colors = JSON.parse(pathColorScheme);

  const getPathColor = f => {
    const speedString = f.properties.avg_bike_speed.split('m')[0];
    const speed = parseFloat(speedString);
    return speed < 8 ? colors[0] :
      speed < 9 ? colors[1] :
      speed < 10 ? colors[2] :
      speed < 11 ? colors[3] : colors[4];
  };

  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
      initialZoom={10.9}
      initialLatitude={45.5895}
      initialLongitude={-122.6712}
    >
      <BoundaryMap
        data={arrayData}
        opacity={opacity}
        filled={filled}
        getPolygon={getPolygon}
        getFillColor={getFillColor}
        getLineColor={getLineColor}
        getLineWidth={getLineWidth}
        lineWidthScale={lineWidthScale}
        lineJointRounded={lineJointRounded}
      />
      <PathMap
        data={pathData.slide_data.features}
        getColor={getPathColor}
        opacity={1}
        getPath={f => f.geometry.coordinates}
        getWidth={f => 55}
        widthScale={1}
        rounded={false}
        autoHighlight={true}
        highlightColor={[200,200,200,85]}
        onLayerClick={info => action('Layer clicked:', { depth: 2 })(info, info.object)}
      />
    </BaseMap>
  );
};

export default () => storiesOf('Maps/Boundary Map', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add('Simple usage',
    (demoMap)
  );
