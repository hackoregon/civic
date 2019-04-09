import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { BaseMap } from '../src';
import { css } from 'emotion';

const displayName = BaseMap.displayName || 'BaseMap';

const containerWrapper = css`
  height: 100vh;
  min-height: 500px;
`;

const optionsStyle = {
  'Hack Oregon Light': 'mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg',
  'Hack Oregon Dark': 'mapbox://styles/hackoregon/cjie02elo1vyw2rohd24kbtbd',
  'Navigation Guidance Night v2': 'mapbox://styles/mapbox/navigation-guidance-night-v2',
  'Dark v9': 'mapbox://styles/mapbox/dark-v9',
};

const demoMap = () => {
  const mapboxStyle = select(
    'Mapbox Style',
    optionsStyle,
    optionsStyle['Hack Oregon Light']
  );

  return <BaseMap mapboxStyle={mapboxStyle} />;
};

const geocoderMap = () => {
  const mapboxStyle = select(
    'Mapbox Style',
    optionsStyle,
    optionsStyle['Hack Oregon Light']
  );

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
  const mapboxStyle = select(
    'Mapbox Style',
    optionsStyle,
    optionsStyle['Hack Oregon Light']
  );

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

const containerHeightMap = () => {
  const mapboxStyle = select(
    'Mapbox Style',
    optionsStyle,
    optionsStyle['Hack Oregon Light']
  );

  return (
    <div className={containerWrapper}>
      <BaseMap
        mapboxStyle={mapboxStyle}
        useContainerHeight={true}
      />
    </div>
  );
};

export default () =>
  storiesOf('Maps/Base Map', module)
    .addDecorator(withKnobs)
    .add('Simple usage', demoMap)
    .add('With geocoder usage', geocoderMap)
    .add('No interactivity', staticMap)
    .add('Use container height', containerHeightMap);
