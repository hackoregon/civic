import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, selectV2 } from '@storybook/addon-knobs';
import { MapOverlay } from '../src';
import DeckGLOverlay from '../src/MapOverlay/map-deckgl-overlay';
import MapGL from 'react-map-gl';
import { checkA11y } from '@storybook/addon-a11y';

const displayName = MapOverlay.displayName || 'MapOverlay';

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

const demoMap = () => { optionsStyle
  const mapboxStyle = selectV2('Mapbox Style', optionsStyle, optionsStyle['Label Maker']);
  return (
    <MapOverlay
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
    />
  );
};

export default () => storiesOf(displayName)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .add('Simple usage',(demoMap))
