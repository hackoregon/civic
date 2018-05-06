import React from 'react';
import { storiesOf } from '@storybook/react';
import { LineChart } from '../src';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  text, number, object, array,
} from '@storybook/addon-knobs';

const displayName = LineChart.displayName || 'Line Chart';
const title = 'Simple usage';
const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;

export default () => storiesOf(displayName, module).addDecorator(withKnobs)
  .add('Basic Usage', (() => {
    const data = object('Data', [
      { year: 2015, population: 12 },
      { year: 2016, population: 13 },
      { year: 2017, population: 14 },
    ]);
    const categories = array('Categories', data.map(d => `${d.year}`))
    const dataKey = text('Data key', 'year');
    const xLabel = text('Data key', 'Year');
    const yLabel = text('Data key', 'Population');
    const dataValue = text('Data values', 'population');
    const dataKeyLabel = text('Data key labels', 'label');

    return (
      <LineChart
        data={data}
        xLabel={xLabel}
        yLabel={yLabel}
        categories={categories}
        dataKey={dataKey}
        dataValue={dataValue}
        dataKeyLabel={dataKeyLabel}
      />
    );
  }))
  .add('no props', (() => (
    <LineChart />
  )));
