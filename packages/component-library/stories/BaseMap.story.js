import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, selectV2 } from '@storybook/addon-knobs';
import { BaseMap } from '../src';

const displayName = BaseMap.displayName || 'BaseMap';

const optionsStyle = {
  'Hack Oregon Light': 'mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg',
  'Hack Oregon Dark': 'mapbox://styles/hackoregon/cjie02elo1vyw2rohd24kbtbd',
  'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
  'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
  'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
  'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
  'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
};

const demoMap = () => {
  const mapboxStyle = selectV2('Mapbox Style', optionsStyle, optionsStyle['Hack Oregon Light']);

  return (
    <BaseMap
      mapboxStyle={mapboxStyle}
    />
  );
};

const geocoderMap = () => {
  const mapboxStyle = selectV2('Mapbox Style', optionsStyle, optionsStyle['Hack Oregon Light']);

  return (
    <BaseMap
      mapboxStyle={mapboxStyle}
      geocoder
      geocoderOptions={{ placeholder: '🚀search to blast off✨', zoom: 9.5 }} // additional geocoder options https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md
      mapGLOptions={{ dragPan: false }} // additional react-map-gl options https://github.com/uber/react-map-gl/blob/master/src/components/interactive-map.js
    />
  );
};

const staticMap = () => {
  const mapboxStyle = selectV2('Mapbox Style', optionsStyle, optionsStyle['Hack Oregon Light']);

  return (
    <BaseMap
      mapboxStyle={mapboxStyle}
      navigation={false}
      mapGLOptions={{
        scrollZoom: false,
        dragPan: false,
        dragRotate: false,
        doubleClickZoom: false,
        touchZoom: false,
        touchRotate: false,
        keyboard: false,
      }}
    />
  );
};

export default () => storiesOf('Maps/Base Map', module)
  .addDecorator(withKnobs)
  .add(
    'Simple usage',
    (demoMap)
  )
  .add(
    'With geocoder usage',
    (geocoderMap)
  )
  .add(
    'No interactivity',
    (staticMap)
  );
