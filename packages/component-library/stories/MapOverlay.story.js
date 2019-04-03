/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { MapOverlay } from '../src';
import { MapTooltip } from '../src';
import { DemoJSONLoader } from '../src';

const displayName = MapOverlay.displayName || 'MapOverlay';

const demoMap = () => {
  return (
    <DemoJSONLoader urls={['http://service.civicpdx.org/neighborhood-development/sandbox/foundations/under18/']}>
      {data => {
        return (
          <BaseMap>
            <MapOverlay
              data={data.slide_data.features}
              opacity={0.1}
              filled={true}
              getPosition={f => f.geometry.coordinates}
              onLayerClick={info => action('Layer clicked:')(info)}
              getElevation={f => f.properties.pc_household_with_children_under_18 * 100}
              getFillColor={f => [0, 100, 255, 255]}
              getLineColor={f => [0, 0, 0, 0]}
            />
          </BaseMap>
        );
      }}
    </DemoJSONLoader>
  );
};

const tooltipMap = () => {
  return (
    <DemoJSONLoader urls={['http://service.civicpdx.org/neighborhood-development/sandbox/foundations/under18/']}>
      {data => {
        return (
          <BaseMap>
            <MapOverlay
              data={data.slide_data.features}
              getPosition={f => f.geometry.coordinates}
              opacity={1.0}
              filled={true}
              onLayerHover={info =>
                action('Layer')(info.layer.props.data[info.index].properties.NAME)
              }
              getElevation={f => f.properties.pc_household_with_children_under_18 * 100}
              getFillColor={f => [0, 100, 255, 255]}
              getLineColor={f => [0, 0, 0, 0]}
            >
              <MapTooltip
                primaryName={'Percent of Households with Children under 18'}
                primaryField={'pc_household_with_children_under_18'}
                secondaryName={'Year'}
                secondaryField={'year'}
              />
            </MapOverlay>
          </BaseMap>
        );
      }}
    </DemoJSONLoader>
    );
};

export default () =>
  storiesOf('Maps/Map Overlay', module)
    .addDecorator(checkA11y)
    .addDecorator(withKnobs)
    .add('Simple usage', demoMap)
    .add('With tooltip', tooltipMap);
