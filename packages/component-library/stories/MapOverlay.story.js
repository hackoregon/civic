/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, selectV2 } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { MapOverlay } from '../src';
import { BaseMap } from '../src';
import MapGL from 'react-map-gl';
import { checkA11y } from '@storybook/addon-a11y';
import data from '../src/MapOverlay/mapoverlaydata.json'

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

const opacityOptions = {
   range: true,
   min: 0,
   max: 1,
   step: 0.05,
};

const elevationOptions = {
   range: true,
   min: 1,
   max: 100,
   step: 1,
};

const demoMap = () => {
  const opacity = number('Opacity:', 0.8, opacityOptions);
  const elevation = number('Elevation:', 10, elevationOptions);
  const filled = boolean('Filled:', true);
  const wireframe = boolean('Wireframe:', true);
  const extruded = boolean('Extruded:', true);

  const mapboxStyle = selectV2('Mapbox Style', optionsStyle, optionsStyle['Label Maker']);

  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
    >
      <MapOverlay
        data={data.features}
        mapboxToken={mapboxToken}
        mapboxStyle={mapboxStyle}
        opacity={opacity}
        filled={filled}
        wireframe={wireframe}
        extruded={extruded}
        elevation={elevation}
        getPosition={f => f.geometry.coordinates}
        onLayerClick={info => action('Layer clicked:')(info)}
        onLayerHover={info => action('Layer')(info.layer.props.data[info.index].properties.NAME)}
      />
    </BaseMap>
);
};

export default () => storiesOf(displayName, module)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .add('Simple usage',(demoMap))
