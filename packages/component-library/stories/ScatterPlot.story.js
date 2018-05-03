import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Scatterplot } from '../src';

const displayName = Scatterplot.displayName || 'Scatterplot';
const title = 'Simple usage';

export default () =>
  storiesOf(displayName, module)
    .addDecorator(withKnobs)
    .add(title, () => <Scatterplot />)
    .add('with label', () => {
      const titleText = text('Title text', 'Some title');
      return <Scatterplot label={titleText} />;
    });
