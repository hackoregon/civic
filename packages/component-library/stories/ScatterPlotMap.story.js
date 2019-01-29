import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, number, selectV2, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { ScatterPlotMap } from '../src';
import { MapTooltip } from '../src';

import trimet from '../src/ScatterPlotMap/trimet.json';
import busStops from '../src/ScatterPlotMap/busStops.json';

const displayName = ScatterPlotMap.displayName || 'ScatterPlotMap';

const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';

const mapStylesOptions = {
    'Hack Oregon Light': 'mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg',
    'Hack Oregon Dark': 'mapbox://styles/hackoregon/cjie02elo1vyw2rohd24kbtbd',
    'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
    'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
    'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
    'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
    'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
};

const demoMap = () => {
  const mapboxStyle = selectV2('Mapbox Style', mapStylesOptions, mapStylesOptions['Lè Shine']);

  const opacityOptions = {
    range: true,
    min: 0,
    max: 1,
    step: 0.05,
  };
  const opacity = number('Opacity:', 0.1, opacityOptions);

  const getCircleColor = f => f.properties.TYPE === 'MAX' && f.properties.LINE === 'R' ? [255,0,0] :
    f.properties.TYPE === 'MAX' && f.properties.LINE === 'B' ? [0,0,255] :
    f.properties.TYPE === 'MAX' && f.properties.LINE === 'G' ? [0,255,0] :
    f.properties.TYPE === 'MAX' && f.properties.LINE === 'Y' ? [255,215,0] :
    f.properties.TYPE === 'MAX' && f.properties.LINE === 'O' ? [255,69,0] :
    [148,0,211];

  const radiusScaleOptions = {
    range: true,
    min: 0,
    max: 15,
    step: 0.5,
  };
  const radiusScale = number('Radius Scale:', 1, radiusScaleOptions);

  const outline = boolean('Stroke Only:', false);

  const strokeWidthOptions = {
    range: true,
    min: 0,
    max: 20,
    step: 0.5,
  };
  const strokeWidth = number('Stroke Width:', 1, strokeWidthOptions);

  const autoHighlight = boolean('Auto Highlight:', false);

  const visible = boolean('Visible:', true);

  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
    >
      <ScatterPlotMap
        data={trimet.features}
        getPosition={f => f.geometry.coordinates}
        opacity={opacity}
        getColor={getCircleColor}
        getRadius={f => Math.floor(Math.random() * (250 - 50 + 1) + 50)}
        radiusScale={radiusScale}
        outline={outline}
        strokeWidth={strokeWidth}
        autoHighlight={autoHighlight}
        onLayerClick={info => action('Layer clicked:', { depth: 2 })(info, info.object)}
        visible={visible}
      />
    </BaseMap>
  );
};

const tooltipMap = () => {
  const mapboxStyle = selectV2('Mapbox Style', mapStylesOptions, mapStylesOptions['Scenic']);

  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
      initialLatitude={45.5699447}
      initialLongitude={-122.67341}
      initialZoom={11}
    >
      <ScatterPlotMap
        data={busStops.slide_data.features}
        getPosition={f => f.geometry.coordinates}
        opacity={1}
        getColor={f => [220,20,60,255]}
        getRadius={f => 250}
        radiusScale={1}
        outline={false}
        autoHighlight={true}
        onLayerClick={info => action('Layer clicked:', { depth: 2 })(info, info.object)}
        visible={true}
      >
        <MapTooltip
          primaryName={"average wait time"}
          primaryField={"avg_wait"}
          secondaryName={"bus route"}
          secondaryField={"route"}
        />
      </ScatterPlotMap>
    </BaseMap>
  );
};

export default () => storiesOf('Maps/Scatterplot Map', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add('Simple usage',
    (demoMap)
  )
  .add('With tooltip',
    (tooltipMap)
  );
