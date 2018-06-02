import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, number, selectV2, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { PathMap } from '../src';

import data from '../src/PathMap/data.json';

const displayName = PathMap.displayName || 'PathMap';

const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';

const demoMap = () => {
  const mapStylesOptions = {
    'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
    'Label Maker': 'mapbox://styles/themendozaline/cjg627xuw08mk2spjsb8jmho7',
    'Moonlight': 'mapbox://styles/themendozaline/cjgq6r2lg00072rmqj1wocgdq',
    'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
    'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
    'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
    'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
  };
  const mapboxStyle = selectV2('Mapbox Style', mapStylesOptions, mapStylesOptions['Navigation Guidance Night']);

  const colorSchemeOptions = {
    'Blue Green': '[[237,248,251],[178,226,226],[102,194,164],[44,162,95],[0,109,44]]',
    'Red Purple': '[[254,235,226],[251,180,185],[247,104,161],[197,27,138],[122,1,119]]',
    'Purple Blue': '[[241,238,246],[189,201,225],[116,169,207],[43,140,190],[4,90,141]]',
    'Yellow Orange Red': '[[255,255,178],[254,204,92],[253,141,60],[240,59,32],[189,0,38]]',
    'Red Yellow Blue': '[[215,25,28],[253,174,97],[255,255,191],[171,217,233],[44,123,182]]',
  };
  const colorScheme = selectV2('Color Scheme:', colorSchemeOptions, colorSchemeOptions['Red Yellow Blue']);
  const colors = JSON.parse(colorScheme);

  const getColor = f => {
    const speedString = f.properties.avg_bike_speed.split('m')[0];
    const speed = parseFloat(speedString);
    return speed < 8 ? colors[0] :
      speed < 9 ? colors[1] :
      speed < 10 ? colors[2] :
      speed < 11 ? colors[3] : colors[4];
  };

  const opacityOptions = {
     range: true,
     min: 0,
     max: 1,
     step: 0.1,
  };
  const opacity = number('Opacity:', 0.9, opacityOptions);

  const getPath = f => f.geometry.coordinates;

  const getWidth = f => 45;

  const widthScaleOptions = {
     range: true,
     min: 1,
     max: 10,
     step: 0.5,
  };
  const widthScale = number('Width Scale:', 1, widthScaleOptions);

  const rounded = boolean('Rounded:', false);

  const autoHighlight = boolean('Auto Highlight:', true);

  const highlightColor = [125,125,125,125];

  const visible = boolean('Visible:', true);

  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
      initialZoom={11.5}
      initialLatitude={45.5683}
      initialLongitude={-122.6712}
    >
      <PathMap
        data={data.slide_data.features}
        getColor={getColor}
        opacity={opacity}
        getPath={getPath}
        getWidth={getWidth}
        widthScale={widthScale}
        rounded={rounded}
        autoHighlight={autoHighlight}
        highlightColor={highlightColor}
        onLayerClick={info => action('Layer clicked:', { depth: 2 })(info, info.object)}
        visible={visible}
      />
    </BaseMap>
  );
};

export default () => storiesOf(displayName, module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add('Simple usage',
    (demoMap)
  );
