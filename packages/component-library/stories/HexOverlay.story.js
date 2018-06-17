import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, selectV2, number } from '@storybook/addon-knobs';
import { HexOverlay } from '../src';
import DeckGLOverlay from '../src/HexOverlay/hex-deckgl-overlay';
import MapGL from 'react-map-gl';
import { BaseMap } from '../src';
import { checkA11y } from '@storybook/addon-a11y';
import data from '../src/HexOverlay/bikeParkingAreaPoints.json';

const displayName = HexOverlay.displayName || 'HexOverlay';

// hard coded for ease for now:
const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';
// TODO: best practice to use env vars from .env named REACT_APP_...
// const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

const optionsStyle = {
  'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
  'Label Maker': 'mapbox://styles/themendozaline/cjg627xuw08mk2spjsb8jmho7',
  'Moonlight': 'mapbox://styles/themendozaline/cjgq6r2lg00072rmqj1wocgdq',
  'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
  'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
  'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
  'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
}

const opacityOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.05,
};

const radiusOptions = {
  range: true,
  min: 1,
  max: 1000,
  step: 0.1,
}

const elevationOptions = {
  range: true,
  min: 1,
  max: 50,
  step: 1,
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const lightSettings = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};


// const elevationScale = {min: 1, max: 50};


const demoMap = () => {
  const opacity = number('Opacity:', 0.8, opacityOptions);
  const radius = number('Inner radius', 500, radiusOptions);
  const elevation = number('Elevation:', 10, elevationOptions);
  const extruded = boolean('Extruded:', true);


  const mapboxStyle = selectV2('Mapbox Style', optionsStyle, optionsStyle['Label Maker']);
  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
    >
      <HexOverlay
        data={data.features}
        opacity={opacity}
        radius={radius}
        elevation={elevation}
        extruded={extruded}
        colorRange={colorRange}
        lightSettings={lightSettings}
      />
    </BaseMap>
  );
};

export default () => storiesOf(displayName, module)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .add('Simple usage',(demoMap))
