import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, number, selectV2, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { ScreenGridMap } from '../src';

import fireHydrants from '../src/ScreenGridMap/data';

const displayName = ScreenGridMap.displayName || 'ScreenGridMap';

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

  const position = f => f.geometry.coordinates;

  const opacityOptions = {
     range: true,
     min: 0,
     max: 1,
     step: 0.05,
  };
  const opacity = number('Opacity:', 0.4, opacityOptions);

  const colorSchemeOptions = {
    'Blue Green': '[[237,248,251],[178,226,226],[102,194,164],[35,139,69]]',
    'Blue Purple': '[[237,248,251],[179,205,227],[140,150,198],[136,65,157]]',
    'Green Blue': '[[240,249,232],[186,228,188],[123,204,196],[43,140,190]]',
    'Orange Red': '[[254,240,217],[253,204,138],[252,141,89],[215,48,31]]',
    'Red Purple': '[[254,235,226],[251,180,185],[247,104,161],[174,1,126]]',
  };
  const colorScheme = selectV2('Color Scheme:', colorSchemeOptions, colorSchemeOptions['Red Purple']);
  const colorSchemeArray = JSON.parse(colorScheme);

  const cellSizeOptions = {
     range: true,
     min: 1,
     max: 100,
     step: 1,
  };
  const cellSize = number('Cell Size:', 10, cellSizeOptions);

  const autoHighlight = boolean('Auto Highlight?', false);

  const onLayerClick = info => action('Layer clicked:')(info.object);

  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
    >
      <ScreenGridMap
        data={fireHydrants.features}
        getPosition={position}
        opacity={opacity}
        colorRange={colorSchemeArray}
        cellSizePixels={cellSize}
        autoHighlight={autoHighlight}
        onLayerClick={onLayerClick}
      />
    </BaseMap>
  );
};

export default () => storiesOf(displayName, module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Simple usage',
    (demoMap)
  );
