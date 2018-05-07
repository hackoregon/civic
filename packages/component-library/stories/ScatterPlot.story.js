import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { ScatterPlot } from '../src';

const displayName = ScatterPlot.displayName || 'ScatterPlot';
const sampleData = [
  { x: 1, y: 2, fill: 'red' },
  { x: 2, y: 3, fill: 'red' },
  { x: 3, y: 5, fill: 'blue' },
  { x: 4, y: 4, fill: 'blue' },
  { x: 5, y: 7, fill: 'red' },
];

export default () =>
  storiesOf(displayName, module)
    .addDecorator(withKnobs)
    .add('Simple usage', () => <ScatterPlot data={sampleData} x="x" y="y" />)
    .add('with props', () => {
      const title = text('Title text', 'Some title');
      const data = object('Data', sampleData);

      return <ScatterPlot title={title} data={data} />;
    });
