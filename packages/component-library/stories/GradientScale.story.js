/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, array, select } from '@storybook/addon-knobs';
import { GradientScale } from '../src';

const displayName = 'GradientScale';

const colorScales = [
  'thermal',
  'space',
  'ocean',
  'planet',
  'earth',
];

export default () =>
  storiesOf('CIVIC Platform Components/Gradient Scale', module)
    .addDecorator(withKnobs)
    .add('Simple usage', () => {
      const domain = array('domain', [50, 90]);
      const primary = number('primary', 63);
      const colorScale = select('colorScale', colorScales, 'thermal');

      return (<GradientScale
        domain={domain}
        primary={primary}
        colorScale={colorScale}
      />);
    })
    .add('With secondary', () => {
      const domain = array('domain', [100, 600]);
      const primary = number('primary', 200);
      const secondary = array('secondary', [150, 400]);
      const colorScale = select('colorScale', colorScales, 'space');

      return (<GradientScale
        domain={domain}
        primary={primary}
        secondary={secondary}
        colorScale={colorScale}
      />);
    });
