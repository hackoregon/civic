/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, array } from '@storybook/addon-knobs';
import { GradientScale } from '../src';

const displayName = 'GradientScale';

export default () =>
  storiesOf(displayName, module)
    .addDecorator(withKnobs)
    .add('Basic Usage', () => {
      const domain = array('domain', [50, 90]);
      const primary = number('primary', 63);

      return <GradientScale domain={domain} primary={primary} />;
    });
