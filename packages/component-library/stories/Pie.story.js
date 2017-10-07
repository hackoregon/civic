import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import {
  withKnobs,
  text, number, object, array,
} from '@storybook/addon-knobs';
import { Chart, ChartData, Pie } from '../src';
import { colors, getRandomValuesArray, randomizer } from './shared';

export default () => storiesOf('Pie/Donut visualization').addDecorator(withKnobs)

.add(
  'simple usage',
  // 'edit this visual in the knobs tab below and check click events in the actions tab',
  () => {
    const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
    const numberOfData = number('Amount of data values', 3);
    const getRandomColors = array('Array of colors', colors.slice(0, numberOfData));
    const getColors = (datum, idx) =>
    (arguments.length === 2 ? getRandomColors[idx] : getRandomColors[datum]);
    const values = getRandomValuesArray(numberOfData, randomizer);
    const style = object('Chart Width and Height', {
      width: 600,
      height: 250,
    });
    const titleText = text('Title text', 'Some title');
    const subtitleText = text('Subtitle text', 'Some subtitle');
    const titleFontSize = number('Title font size', 24);
    const subtitleFontSize = number('Subtitle font size', 14);
    const innerRadius = number('Inner Radius', 75);

    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10% auto' }} >
        <Chart width={style.width} height={style.height}>
          <ChartData data={values}>
            <Pie
              innerRadius={innerRadius} outerRadius={110}
              onClick={action((e, v, i) => console.log(`${labels[i]} clicked`))}
              style={(d, i) => ({ fill: getColors(i) })}
            >
              <text
                className="donut-title" textAnchor="middle"
                x={0} y={0} fontSize={titleFontSize}
              >
                {titleText}
              </text>
              <text
                className="donut-subtitle" textAnchor="middle"
                x={0} y={18} fontSize={subtitleFontSize}
              >
                {subtitleText}
              </text>
            </Pie>
          </ChartData>
        </Chart>
      </div>
    );
  });
