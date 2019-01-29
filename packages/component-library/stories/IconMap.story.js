import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, number, selectV2, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { IconMap } from '../src';
import { MapTooltip } from '../src';
import data from '../src/IconMap/data.json';

const displayName = IconMap.displayName || 'IconMap';

const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';

const demoMap = () => {
  const optionsStyle = {
    'Hack Oregon Light': 'mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg',
    'Hack Oregon Dark': 'mapbox://styles/hackoregon/cjie02elo1vyw2rohd24kbtbd',
    'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
    'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
    'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
    'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
    'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
  };
  const mapboxStyle = selectV2('Mapbox Style', optionsStyle, optionsStyle['Scenic']);

  const opacityOptions = {
     range: true,
     min: 0,
     max: 1,
     step: 0.1,
  };
  const opacity = number('Opacity:', 1, opacityOptions);

  const iconAtlas = 'https://i.imgur.com/29Kt7Ii.png';

  const iconMapping = {
    "School": {
      "x": 0,
      "y": 0,
      "width": 250,
      "height": 250,
      "mask": true,
    },
    "Hospital": {
      "x": 250,
      "y": 0,
      "width": 250,
      "height": 250,
      "mask": true,
    },
    "Fire Station": {
      "x": 0,
      "y": 250,
      "width": 250,
      "height": 250,
      "mask": true,
    },
    "Pin": {
      "x": 250,
      "y": 250,
      "width": 250,
      "height": 250,
      "mask": true,
    },
  };

  const zoomScale = zoom => zoom > 11.5 ? 12.5 :
    zoom > 10.5 ? 10 :
    zoom > 9.5 ? 7.5 :
    zoom > 8.5 ? 5 :
    zoom > 7.5 ? 2.5 :
    1;

  const getPosition = d => d.geometry.coordinates;

  const getIcon = d => d.properties.ICON;

  const iconSizeOptions = {
     range: true,
     min: 1,
     max: 15,
     step: 1,
  };
  const iconSize = number('Icon Size:', 10, iconSizeOptions);

  const getSize = f => iconSize;

  const getColor = d => d.properties.ICON === 'Hospital' ? [30,144,255] :
    d.properties.ICON === 'School' ? [255,165,0] :
    d.properties.ICON === 'Fire Station' ? [220,20,60] :
    [50, 205, 50];

  const autoHighlight = boolean('Auto Highlight:', false);

  const visible = boolean('Visible:', true);

  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
    >
      <IconMap
        data={data.features}
        opacity={opacity}
        iconAtlas={iconAtlas}
        iconMapping={iconMapping}
        iconSizeScale={zoomScale}
        getPosition={getPosition}
        getIcon={getIcon}
        getSize={getSize}
        getColor={getColor}
        autoHighlight={autoHighlight}
        onLayerClick={info => action('Layer clicked:', { depth: 2 })(info, info.object)}
        visible={visible}
      />
    </BaseMap>
  );
};

const tooltipMap = () => {
  const iconAtlas = 'https://i.imgur.com/29Kt7Ii.png';

  const iconMapping = {
    "School": {
      "x": 0,
      "y": 0,
      "width": 250,
      "height": 250,
      "mask": true,
    },
    "Hospital": {
      "x": 250,
      "y": 0,
      "width": 250,
      "height": 250,
      "mask": true,
    },
    "Fire Station": {
      "x": 0,
      "y": 250,
      "width": 250,
      "height": 250,
      "mask": true,
    },
    "Pin": {
      "x": 250,
      "y": 250,
      "width": 250,
      "height": 250,
      "mask": true,
    },
  };

  const zoomScale = zoom => zoom > 11.5 ? 12.5 :
    zoom > 10.5 ? 10 :
    zoom > 9.5 ? 7.5 :
    zoom > 8.5 ? 5 :
    zoom > 7.5 ? 2.5 :
    1;

  const getColor = d => d.properties.ICON === 'Hospital' ? [30,144,255] :
    d.properties.ICON === 'School' ? [255,165,0] :
    d.properties.ICON === 'Fire Station' ? [220,20,60] :
    [50, 205, 50];

  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={"mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva"}
    >
      <IconMap
        data={data.features}
        opacity={1}
        iconAtlas={iconAtlas}
        iconMapping={iconMapping}
        iconSizeScale={zoomScale}
        getPosition={d => d.geometry.coordinates}
        getIcon={d => d.properties.ICON}
        getSize={d => 9}
        getColor={getColor}
        autoHighlight={false}
        onLayerClick={info => action('Layer clicked:', { depth: 2 })(info, info.object)}
      >
        <MapTooltip
          primaryName={"Site Name"}
          primaryField={"SITE_NAME"}
          secondaryName={"Icon type"}
          secondaryField={"ICON"}
        />
      </IconMap>
    </BaseMap>
  );
};

export default () => storiesOf('Maps/Icon Map', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Simple usage',
    (demoMap)
  )
  .add(
    'With tooltip',
    (tooltipMap)
  );
