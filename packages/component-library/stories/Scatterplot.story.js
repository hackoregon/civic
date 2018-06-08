import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { Scatterplot } from '../src';

const displayName = Scatterplot.displayName || 'Scatterplot';
const sampleData = [
  { x: 1, y: 2, series: 'cat' },
  { x: 2, y: 3, series: 'cat' },
  { x: 3, y: 5, series: 'fish' },
  { x: 4, y: 4, series: 'fish' },
  { x: 5, y: 7, series: 'cat' },
  { x: 1, y: 3, series: 'dog' },
  { x: 3, y: 3, series: 'dog' },
];
const sampleDataSeries = 'series';
const sampledataSeriesLabel = [
  { category: 'cat', label: 'Cat' },
  { category: 'dog', label: 'Dog' },
  { category: 'fish', label: 'Fish' },
];
const sampleDomain = { x: [0, 6], y: [0, 8] };
const sampleSize = { key: 'y' };
const sampleSubtitle = 'A description of this chart.';
const sampleTitle = 'Some title';
const sampleXKey = 'x';
const sampleXLabel = 'Number';
const sampleYKey = 'y';
const sampleYLabel = 'Rating';


export default () =>
  storiesOf(displayName, module)
    .addDecorator(withKnobs)
    .add('Simple usage', () => <Scatterplot data={sampleData} />)
    .add('with some props', () => {
      const data = object('Data', sampleData);
      const dataKey = text('dataKey', sampleXKey);
      const dataValue = text('dataValue', sampleYKey);
      const dataSeries = text('dataSeries', sampleDataSeries);
      const subtitle = text('Subtitle', sampleSubtitle);
      const title = text('Title', sampleTitle);
      const xLabel = text('xLabel', sampleXLabel);
      const yLabel = text('yLabel', sampleYLabel);

      return (
        <Scatterplot
          data={data}
          dataKey={dataKey}
          dataValue={dataValue}
          dataSeries={dataSeries}
          subtitle={subtitle}
          title={title}
          xLabel={xLabel}
          yLabel={yLabel}
        />
      );
    })
    .add('with more optional props', () => {
      const data = object('Data', sampleData);
      const dataKey = text('dataKey', sampleXKey);
      const dataValue = text('dataValue', sampleYKey);
      const dataSeries = text('dataSeries', sampleDataSeries);
      const dataSeriesLabel = object('Data Series Labels', sampledataSeriesLabel);
      const domain = object('Domain', sampleDomain);
      const size = object('Size', sampleSize);
      const subtitle = text('Subtitle', sampleSubtitle);
      const title = text('Title', sampleTitle);
      const xLabel = text('xLabel', sampleXLabel);
      const yLabel = text('yLabel', sampleYLabel);

      return (
        <Scatterplot
          data={data}
          dataKey={dataKey}
          dataValue={dataValue}
          dataSeries={dataSeries}
          dataSeriesLabel={dataSeriesLabel}
          domain={domain}
          size={size}
          subtitle={subtitle}
          title={title}
          xLabel={xLabel}
          yLabel={yLabel}
        />
      );
    });

