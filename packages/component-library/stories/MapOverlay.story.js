/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, selectV2 } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { MapOverlay } from '../src';
import { MapTooltip } from '../src';
import data from '../src/MapOverlay/mapoverlaydata.json'

const displayName = MapOverlay.displayName || 'MapOverlay';

const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';

const optionsStyle = {
  'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
  'Label Maker': 'mapbox://styles/themendozaline/cjg627xuw08mk2spjsb8jmho7',
  'Moonlight': 'mapbox://styles/themendozaline/cjgq6r2lg00072rmqj1wocgdq',
  'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
  'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
  'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
  'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
}

const strokeWidthOptions = {
   range: true,
   min: 0,
   max: 100,
   step: 1,
};

const opacityOptions = {
   range: true,
   min: 0,
   max: 1,
   step: 0.05,
};

const elevationOptions = {
   range: true,
   min: 1,
   max: 50,
   step: 1,
};

const opacity = number('Opacity:', 0.8, opacityOptions);
const strokeWidth = number('Stroke Width:', 1, strokeWidthOptions);
const elevation = number('Elevation:', 10, elevationOptions);
const extruded = boolean('Extruded:', true);
const filled = boolean('Filled:', true);
const pickable = boolean('Pickble:', true);
const stroked = boolean('Stroked:', true);
const wireframe = boolean('Wireframe:', true);

const mapboxStyle = selectV2('Mapbox Style', optionsStyle, optionsStyle['Label Maker']);

// without tooltip version
const demoMap = () => {
  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
    >
      <MapOverlay
        data={data.features}
        elevation={elevation}
        extruded={extruded}
        filled={filled}
        opacity={opacity}
        pickable={pickable}
        wireframe={wireframe}
        getPosition={f => f.geometry.coordinates}
        onLayerClick={info => action('Layer clicked:')(info)}
      />
    </BaseMap>
  );
};

// with tooltip version
const tooltipMap = () => {
  const opacity = number('Opacity:', 0.8, opacityOptions);
  const elevation = number('Elevation:', 10, elevationOptions);
  const extruded = boolean('Extruded:', true);
  const filled = boolean('Filled:', true);
  const pickable = boolean('Pickble:', true);
  const wireframe = boolean('Wireframe:', true);

  const mapboxStyle = selectV2('Mapbox Style', optionsStyle, optionsStyle['Label Maker']);

  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
    >
      <MapOverlay
        data={data.features}
        getPosition={f => f.geometry.coordinates}
        elevation={elevation}
        extruded={extruded}
        filled={filled}
        opacity={opacity}
        pickable={pickable}
        wireframe={wireframe}
        onLayerHover={info => action('Layer')(info.layer.props.data[info.index].properties.NAME)}
        autoHighlight={true}
        outline={false}
        visible={true}
      >
        <MapTooltip
          primaryName={"Name"}
          primaryField={"NAME"}
          secondaryName={"Length"}
          secondaryField={"Shape_Length"}
        />
      </MapOverlay>
    </BaseMap>
  );
};

export default () => storiesOf(displayName, module)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .add('Simple usage',(demoMap))
  .add('With tooltip',
    (tooltipMap)
  );

/*

TODO: hard coded mapboxToken for ease for now: best practice to use env vars from .env named REACT_APP_...
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

TODO: In the process of adding tooltip info onHover I noticed having opacityOptions, elevationOptions, opacity, filled, etc outside of each const would not allow storybooks knobs to function. Ideally this repeated code would be DRYed up, and likely pulled out of

TODO: knobs start by showing unuseful info that upon click disapears, ideally it would never appear

*/
