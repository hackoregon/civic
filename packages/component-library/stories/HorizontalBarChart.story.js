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
import { percentage } from '../src/utils/formatters';

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

const sampleMinimalistData = [
      {sortOrder: 1, population: 2000, label: 'Labrador Retriever'},
      {sortOrder: 2, population: 8000, label: 'Standard Poodle'},
    ];

const sampleUnsortedData = [
      {population: 2000, label: 'Labrador Retriever'},
      {population: 8000, label: 'Standard Poodle'},
      {population: 6000, label: 'French Bulldog'},
      {population: 3000, label: 'Afghan Hound'},
      {population: 1000, label: 'Jack Russell Terrier'},
    ];

export default () => storiesOf('Charts/Horizontal Bar Chart', module)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
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
  })
  .add('Minimalist', () => {
    const data = object('Data', sampleMinimalistData);
    const sortOrder = text('Data series', 'sortOrder');
    const dataValue = text('Data values', 'population');
    const dataLabel = text('Data series labels', 'label');

    return (
      <HorizontalBarChart
        data={data}
        sortOrder={sortOrder}
        dataValue={dataValue}
        dataLabel={dataLabel}
        minimalist
      />
    );
  })
  .add('Simple usage', () => {
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
  .add('With negative values', () => {
    const data = object('Data', [
      {delta: 0.1, label: 'Labrador Retriever'},
      {delta: 0.3, label: 'Standard Poodle'},
      {delta: -0.1, label: 'French Bulldog'},
      {delta: -0.2, label: 'Afghan Hound'},
      {delta: 0.0, label: 'Jack Russell Terrier'},
    ]);
    const dataValue = text('Data value', 'delta');
    const dataLabel = text('Data series labels', 'label');
    const xLabel = text('xLabel', '% Change in Population');
    const yLabel = text('yLabel', 'Breed');

    return (
      <HorizontalBarChart
        data={data}
        dataValue={dataValue}
        dataLabel={dataLabel}
        title={'Dogs and their Money'}
        subtitle={'As of January 2017'}
        xLabel={xLabel}
        yLabel={yLabel}
        dataValueFormatter={percentage}
      />
    );
  });
