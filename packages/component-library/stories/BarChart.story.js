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
const title = 'Simple usage';
const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;

// const propDocs = { inline: true, propTables: [BarChart] };

// const data = [
//   {sortOrder: 1, population: 9000, label: 'Labrador Retriever'},
//   {sortOrder: 2, population: 8000, label: 'Standard Poodle'},
//   {sortOrder: 3, population: 6000, label: 'French Bulldog'},
//   {sortOrder: 4, population: 3000, label: 'Afghan Hound'},
//   {sortOrder: 5, population: 1000, label: 'Jack Russell Terrier'}
// ];

// var result = objArray.map(a => a.foo);

export default () => storiesOf(displayName, module).addDecorator(withKnobs)
  .add('Basic Usage', (() => {
    const data = array('Data',[
      {sortOrder: 1, population: 2000, label: 'Labrador Retriever'},
      {sortOrder: 2, population: 8000, label: 'Standard Poodle'},
      {sortOrder: 3, population: 6000, label: 'French Bulldog'},
      {sortOrder: 4, population: 3000, label: 'Afghan Hound'},
      {sortOrder: 5, population: 1000, label: 'Jack Russell Terrier'}
    ]);
    const dataKey = text('Data key', 'sortOrder');
    const dataValue = text('Data values', 'population');
    const dataKeyLabel = text('Data key labels', 'label');

    return (
      <BarChart
        data={data}
        dataKey={dataKey}
        dataValue={dataValue}
        dataKeyLabel={dataKeyLabel}
        title={'Dogs and their Money'}
        subtitle={'As of January 2017'}
      />
    );
  }))
  .add('no props', (() => (
    <BarChart />
  )))
