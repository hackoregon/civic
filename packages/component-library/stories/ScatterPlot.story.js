import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { ScatterPlot } from '../src';

const displayName = ScatterPlot.displayName || 'ScatterPlot';
const sampleData = [
  { x: 1, y: 2, fill: 'red', series: 'cat' },
  { x: 2, y: 3, fill: 'red', series: 'cat' },
  { x: 3, y: 5, fill: 'blue', series: 'fish' },
  { x: 4, y: 4, fill: 'blue', series: 'fish' },
  { x: 5, y: 7, fill: 'red', series: 'cat' },
  { x: 1, y: 3, fill: 'green', series: 'dog' },
  { x: 3, y: 3, fill: 'green', series: 'dog' },
];
const sampleDomain = { x: [0, 6], y: [0, 8] };
const sampleTitle = 'Some title';
const sampleSubtitle = 'A description of this chart.';
const sampleXKey = 'x';
const sampleXLabel = 'Number';
const sampleYKey = 'y';
const sampleYLabel = 'Rating';
const sampleDataSeries = ['cat', 'dog', 'fish'];
// X data
// X title
// x axis labels
// tick labels (non-numerical)
// data labels
// number formatting option (see #67)
// x domain for axes

export default () =>
  storiesOf(displayName, module)
    .addDecorator(withKnobs)
    .add('Simple usage', () => (
      <ScatterPlot data={sampleData} x="x name" y="y name" />
    ))
    .add('with props', () => {
      const title = text('Title', sampleTitle);
      const subtitle = text('Subtitle', sampleSubtitle);
      const data = object('Data', sampleData);
      const dataSeries = object('Data', sampleDataSeries);
      const domain = object('Domain', sampleDomain);
      const xKey = text('xKey', sampleXKey);
      const xLabel = text('xLabel', sampleXLabel);
      const yKey = text('yKey', sampleYKey);
      const yLabel = text('yLabel', sampleYLabel);

      const props = {
        data,
        dataSeries,
        domain,
        subtitle,
        title,
        xKey,
        xLabel,
        yKey,
        yLabel,
      };

      return <ScatterPlot {...props} />;
    });
