import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, number, selectV2, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { PathMap } from '../src';
import { MapTooltip } from '../src';
import { DemoJSONLoader } from '../src';
import * as d3 from 'd3';


const displayName = PathMap.displayName || 'PathMap';

const optionsStyle = {
  'Hack Oregon Light': 'mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg',
  'Hack Oregon Dark': 'mapbox://styles/hackoregon/cjie02elo1vyw2rohd24kbtbd',
  'Navigation Guidance Night v2': 'mapbox://styles/mapbox/navigation-guidance-night-v2',
  'Dark v9': 'mapbox://styles/mapbox/dark-v9',
};

const colorSchemeOptions = {
  'purpleGreen':
    '[[115, 41, 125, 255],[149, 86, 156, 255],[181, 139, 186, 255],[214, 193, 217, 255],[215, 215, 215, 255],[192, 227, 213, 255],[135, 205, 179, 255],[77, 184, 144, 255],[18, 164, 110, 255]]',
  'orangeTeal':
    '[[244, 120, 32, 255],[247, 143, 69, 255],[244, 165, 130, 255],[245, 206, 189, 255],[247, 247, 247, 255],[197, 222, 235, 255],[147, 197, 222, 255],[94, 177, 192, 255],[43, 156, 161, 255]]',
  'yellowBlue':
    '[[252, 178, 40, 255],[254, 197, 94, 255],[251, 213, 143, 255],[248, 229, 196, 255],[247, 247, 247, 255],[195, 211, 233, 255],[140, 175, 220, 255],[88, 139, 200, 255],[49, 103, 178, 255]]'
};

const opacityOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.05,
};

const widthScaleOptions = {
  range: true,
  min: 1,
  max: 10,
  step: 0.5,
};

const mapData = ['https://service.civicpdx.org/transportation-systems/sandbox/slides/routechange/'];

const demoMap = () => (
  <DemoJSONLoader urls={mapData}>
    {data => {
      const mapboxStyle = selectV2(
        'Mapbox Style',
        optionsStyle,
        optionsStyle['Hack Oregon Light']
      );

      const colorScheme = selectV2(
        'Color Scheme:',
        colorSchemeOptions,
        colorSchemeOptions['purpleGreen']
      );
      const colors = JSON.parse(colorScheme);

      const divergingScale = d3.scaleThreshold()
        .domain([-80, -60, -40, -20, 20, 40, 60, 80])
        .range(colors);

      const getPathColor = f => {
        const value = f.properties.pct_change;
        return divergingScale(value);
      };

      const opacity = number('Opacity:', 0.95, opacityOptions);
      const getPath = f => f.geometry.coordinates;
      const getWidth = f => 15;
      const widthScale = number('Width Scale:', 1, widthScaleOptions);
      const rounded = boolean('Rounded:', true);
      const highlightColor = [125, 125, 125, 125];

      return (
        <BaseMap
          mapboxStyle={mapboxStyle}
          initialZoom={12}
          initialLatitude={45.523027}
          initialLongitude={-122.670370}
        >
          <PathMap
            data={data.slide_data.features}
            getColor={getPathColor}
            opacity={opacity}
            getPath={getPath}
            getWidth={getWidth}
            widthScale={widthScale}
            rounded={rounded}
            highlightColor={highlightColor}
            onLayerClick={info => action('Layer clicked:', { depth: 2 })(info, info.object) }
          />
        </BaseMap>
      );
    }}
  </DemoJSONLoader>
);

const tooltipMap = () => (
 <DemoJSONLoader urls={mapData}>
    {data => {
      const mapboxStyle = selectV2(
        'Mapbox Style',
        optionsStyle,
        optionsStyle['Hack Oregon Light']
      );

      const colorScheme = selectV2(
        'Color Scheme:',
        colorSchemeOptions,
        colorSchemeOptions['purpleGreen']
      );
      const colors = JSON.parse(colorScheme);

      const divergingScale = d3.scaleThreshold()
        .domain([-80, -60, -40, -20, 20, 40, 60, 80])
        .range(colors);

      const getPathColor = f => {
        const value = f.properties.pct_change;
        return divergingScale(value);
      };

      const opacity = number('Opacity:', 0.95, opacityOptions);
      const getPath = f => f.geometry.coordinates;
      const getWidth = f => 15;
      const widthScale = number('Width Scale:', 1, widthScaleOptions);
      const rounded = boolean('Rounded:', true);
      const highlightColor = [125, 125, 125, 125];

      return (
        <BaseMap
          mapboxStyle={mapboxStyle}
          initialZoom={12}
          initialLatitude={45.523027}
          initialLongitude={-122.670370}
        >
          <PathMap
            data={data.slide_data.features}
            getColor={getPathColor}
            opacity={opacity}
            getPath={getPath}
            getWidth={getWidth}
            widthScale={widthScale}
            rounded={rounded}
            highlightColor={highlightColor}
            onLayerClick={info => action('Layer clicked:', { depth: 2 })(info, info.object) }
          >
            <MapTooltip
              primaryName={'Percent Change'}
              primaryField={'pct_change'}
            />
          </PathMap>
        </BaseMap>
      );
    }}
  </DemoJSONLoader>
);

export default () =>
  storiesOf('Maps/Path Map', module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add('Simple usage', demoMap)
    .add('With tooltip', tooltipMap);
