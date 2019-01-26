import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import {
  withKnobs,
  text, number, object, array,
} from '@storybook/addon-knobs';
import { BarChart } from '../src';

const displayName = BarChart.displayName || 'BarChart';

const sampleSimpleData = [
  { x: 5, y: 20 },
  { x: 10, y: 30 },
  { x: 15, y: 50 },
  { x: 20, y: 40 },
];

export default () => storiesOf('Charts/Bar Chart', module).addDecorator(withKnobs)
  .add('Simple usage', () => <BarChart data={sampleSimpleData} />)
  .add('Basic usage', (() => {
    const data = object('Data', [
      { ye: 1994, population: 2000 },
      { ye: 1995, population: 8000 },
      { ye: 1996, population: 6000 },
      { ye: 1997, population: 3000 },
      { ye: 1998, population: 1000 }
    ]);
    const dataKey = text('Data key', 'ye');
    const dataValue = text('Data values', 'population');
    const xLabel = text('xLabel', 'Year');
    const yLabel = text('yLabel', 'Dogs');

    return (
      <BarChart
        data={data}
        dataKey={dataKey}
        dataValue={dataValue}
        title={'Dogs with Money'}
        subtitle={'Dogs in Portland with a net worth greater than $1,000'}
        xLabel={xLabel}
        yLabel={yLabel}
      />
    );
  }));
