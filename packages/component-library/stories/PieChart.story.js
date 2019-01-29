import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import {
  withKnobs,
  text, number, object, array, boolean
} from '@storybook/addon-knobs';
import { PieChart } from '../src';
import { colors, getRandomValuesArray, objectRandomizer } from './shared';

const loading = () => (
  <PieChart loading />
);

export default () => storiesOf('/Charts/Pie/Donut Visualization', module).addDecorator(withKnobs)
.add(
  'Basic usage',
  // 'edit this visual in the knobs tab below and check click events in the actions tab',
  () => {
    const numberOfData = number('Amount of data values', 2);
    const values = getRandomValuesArray(numberOfData, objectRandomizer);

    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }} >
        <PieChart
          data={values}
        />
      </div>
    );
  }).add(
  'Simple usage',
  // 'edit this visual in the knobs tab below and check click events in the actions tab',
  () => {
    const sampleTitle = text('Title', 'Sample Title');
    const sampleSubtitle = text('Subtitle', 'Sample Subtitle');
    const numberOfData = number('Amount of data values', 3);
    const getRandomColors = array('Array of colors', colors.slice(0, numberOfData));
    const values = getRandomValuesArray(numberOfData, objectRandomizer);
    const chartHeight = number('Chart height', 450);
    const chartWidth = number('Chart width', 450);
    const innerRadius = number('Inner radius', 100);
    const halfDoughnut = boolean('halfDoughnut', true);

    return (
      <div style={{ display: 'flex', justifyContent: 'space-around'}} >
        <PieChart
          title={sampleTitle}
          subtitle={sampleSubtitle}
          data={values}
          colors={getRandomColors}
          width={chartWidth}
          height={chartHeight}
          innerRadius={innerRadius}
          halfDoughnut={halfDoughnut}
        />
      </div>
    );
  })
  .add('Loading', loading);
