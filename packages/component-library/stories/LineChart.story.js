import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { LineChart } from '../src';

const displayName = LineChart.displayName || 'LineChart';

const sampleSimpleData = [
  { x: 0, y: 20 },
  { x: 10, y: 30 },
  { x: 20, y: 50 },
  { x: 30, y: 40 },
];

const sampleData = [
  { x: 0, y: 2, series: 'cat' },
  { x: 1, y: 3, series: 'cat' },
  { x: 2, y: 5, series: 'cat' },
  { x: 3, y: 4, series: 'cat' },
  { x: 4, y: 7, series: 'cat' },
  { x: 0, y: 4, series: 'dog' },
  { x: 1, y: 5, series: 'dog' },
  { x: 2, y: 2, series: 'dog' },
  { x: 3, y: 3, series: 'dog' },
  { x: 4, y: 4, series: 'dog' },
];
const sampleDataSeries = 'series';
const sampledataSeriesLabel = [
  { category: 'cat', label: 'Cat' },
  { category: 'dog', label: 'Dog' },
];
const sampleDomain = { x: [0, 6], y: [0, 8] };
const sampleSize = { key: 'y' };
const sampleSubtitle = 'A description of this chart.';
const sampleTitle = 'Some title';
const sampleXKey = 'x';
const sampleXLabel = 'Number of animals';
const sampleYKey = 'y';
const sampleYLabel = 'Cuteness rating';
const sampleDataKeyLabel = 'Animals';
const sampleDataValueLabel = 'Cuteness';

const sampleUnstructuredData = [
  { size: 0, age: 2000000, type: 'cat' },
  { size: 5, age: 3000000, type: 'cat' },
  { size: 10, age: 7000000, type: 'cat' },
  { size: 0, age: 5000320, type: 'fish' },
  { size: 5, age: 40002300, type: 'fish' },
  { size: 10, age: 5007000, type: 'fish' },
  { size: 0, age: 3000000, type: 'dog' },
  { size: 5, age: 3000500, type: 'dog' },
  { size: 10, age: 3000000.5, type: 'dog' },
];
const sampleUnstructuredXKey = 'size';
const sampleUnstructuredYKey = 'age';
const sampleUnstructuredDataSeries = 'type';
const sampleUnstructuredXLabel = 'Size (ft)';
const sampleUnstructuredYLabel = 'Age (yrs)';

export default () =>
  storiesOf(displayName, module)
    .addDecorator(withKnobs)
    .add('Simple usage', () => <LineChart data={sampleSimpleData} />)
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
        <LineChart
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
    .add('with some props and unstructured data', () => {
      const data = object('Data', sampleUnstructuredData);
      const dataKey = text('dataKey', sampleUnstructuredXKey);
      const dataValue = text('dataValue', sampleUnstructuredYKey);
      const dataSeries = text('dataSeries', sampleUnstructuredDataSeries);
      const subtitle = text('Subtitle', sampleSubtitle);
      const title = text('Title', sampleTitle);
      const xLabel = text('xLabel', sampleUnstructuredXLabel);
      const yLabel = text('yLabel', sampleUnstructuredYLabel);

      return (
        <LineChart
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
      const dataKeyLabel = text('dataKeyLabel', sampleDataKeyLabel);
      const dataValue = text('dataValue', sampleYKey);
      const dataValueLabel = text('dataValueLabel', sampleDataValueLabel);
      const dataSeries = text('dataSeries', sampleDataSeries);
      const dataSeriesLabel = object('Data Series Labels', sampledataSeriesLabel);
      const domain = object('Domain', sampleDomain);
      const size = object('Size', sampleSize);
      const subtitle = text('Subtitle', sampleSubtitle);
      const title = text('Title', sampleTitle);
      const xLabel = text('xLabel', sampleXLabel);
      const yLabel = text('yLabel', sampleYLabel);

      return (
        <LineChart
          data={data}
          dataKey={dataKey}
          dataKeyLabel={dataKeyLabel}
          dataValue={dataValue}
          dataValueLabel={dataValueLabel}
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
