import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import {
  withKnobs,
  text, number, object, array,
} from '@storybook/addon-knobs';
import { PieChart } from '../src';
import { colors, getRandomValuesArray, objectRandomizer } from './shared';

export default () => storiesOf('Pie/Donut visualization').addDecorator(withKnobs)

.add(
  'simple usage',
  // 'edit this visual in the knobs tab below and check click events in the actions tab',
  () => {
    const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
    const numberOfData = number('Amount of data values', 3);
    const getRandomColors = array('Array of colors', colors.slice(0, numberOfData));
    const values = getRandomValuesArray(numberOfData, objectRandomizer);
    const chartHeight = number('Chart Height');
    const chartWidth = number('Chart width');
    const innerRadius = number('Inner Radius', 100);

    const optionalProps = {

    }

    return (
      <div style={{ display: 'flex', justifyContent: 'space-around'}} >
        <PieChart
          data={values}
          colors={getRandomColors}
          width={chartWidth}
          height={chartHeight}
          innerRadius={innerRadius}
        />
      </div>
    );
  });
