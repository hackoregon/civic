import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { checkA11y } from '@storybook/addon-a11y';
import {
  withKnobs,
  text, number, object, array,
} from '@storybook/addon-knobs';
import { HorizontalBarChart } from '../src';

const displayName = HorizontalBarChart.displayName || 'HorizontalBarChart';
const title = 'Simple usage';
const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;
const sampleData = [
      {sortOrder: 1, population: 2000, label: 'Labrador Retriever'},
      {sortOrder: 2, population: 8000, label: 'Standard Poodle'},
      {sortOrder: 3, population: 6000, label: 'French Bulldog'},
      {sortOrder: 4, population: 3000, label: 'Afghan Hound'},
      {sortOrder: 5, population: 1000, label: 'Jack Russell Terrier'},
    ];

const sampleUnsortedData = [
      {population: 2000, label: 'Labrador Retriever'},
      {population: 8000, label: 'Standard Poodle'},
      {population: 6000, label: 'French Bulldog'},
      {population: 3000, label: 'Afghan Hound'},
      {population: 1000, label: 'Jack Russell Terrier'},
    ];

export default () => storiesOf(displayName, module)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .add('Basic Usage', () => {
    const data = object('Data', sampleData);
    const sortOrder = text('Data series', 'sortOrder');
    const dataValue = text('Data value', 'population');
    const dataLabel = text('Data series labels', 'label');
    const xLabel = text('xLabel', 'Dollars');
    const yLabel = text('yLabel', 'Dogs');

    return (
      <HorizontalBarChart
        data={data}
        sortOrder={sortOrder}
        dataValue={dataValue}
        dataLabel={dataLabel}
        title={'Dogs and their Money'}
        subtitle={'As of January 2017'}
        xLabel={xLabel}
        yLabel={yLabel}
      />
    );
  })
  .add('Default sort order', () => {
    const data = object('Data', sampleUnsortedData);
    const dataValue = text('Data values', 'population');
    const dataLabel = text('Data series labels', 'label');

    return (
        <HorizontalBarChart
          data={data}
          dataValue={dataValue}
          dataLabel={dataLabel}
        />
      );
  })
  .add('No title', () => {
    const data = object('Data', sampleData);
    const sortOrder = text('Data series', 'sortOrder');
    const dataValue = text('Data values', 'population');
    const dataLabel = text('Data series labels', 'label');

    return (
        <HorizontalBarChart
          data={data}
          sortOrder={sortOrder}
          dataValue={dataValue}
          dataLabel={dataLabel}
        />
      );
  });
