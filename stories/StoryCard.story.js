/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { StoryCard, Chart, ChartData, Pie } from '../src';
import { getRandomValuesArray, getColors, randomizer, wallOfRichText } from './shared';

const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
const width = 300;
const height = 300;
const tdDemo = () => (<StoryCard title={'A title goes here'}><p className="Description">{wallOfRichText}</p></StoryCard>);
const tdvDemo = () => (
  <StoryCard title={'A title goes here'}>
    <p className="Description">{wallOfRichText}</p>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Chart style={{ flex: 1 }} width={(width)} height={height}>
        <ChartData data={getRandomValuesArray(5, randomizer)}>
          <Pie
            innerRadius={75} outerRadius={110}
            onClick={(e, v, i) => console.log(`${labels[i]} clicked`)}
            style={(d, i) => ({ fill: getColors(i) })}
          >
            <text
              className="donut-title" textAnchor="middle"
              x={0} y={0} fontSize={'2em'}
            >
              {'Dataset A'}
            </text>
            <text
              className="donut-subtitle" textAnchor="middle"
              x={0} y={18} fontSize={'1em'}
            >
              {'subtitle'}
            </text>
          </Pie>
        </ChartData>
      </Chart>
      <Chart style={{ flex: 1 }} width={(width)} height={height}>
        <ChartData data={getRandomValuesArray(10, randomizer)}>
          <Pie
            innerRadius={75} outerRadius={110}
            onClick={(e, v, i) => console.log(`${labels[i]} clicked`)}
            style={(d, i) => ({ fill: getColors(i) })}
          >
            <text
              className="donut-title" textAnchor="middle"
              x={0} y={0} fontSize={'2em'}
            >
              {'Dataset B'}
            </text>
            <text
              className="donut-subtitle" textAnchor="middle"
              x={0} y={18} fontSize={'1em'}
            >
              {'subtitle'}
            </text>
          </Pie>
        </ChartData>
      </Chart>
    </div>
  </StoryCard>
);

export default () => storiesOf('StoryCard', module)
.addWithInfo(
  'Simple usage',
  'This is some basic usage with the StoryCard with just a title and descriptions',
  () => <StoryCard title={'Some title'}><p className="Description">some descriptions go here</p></StoryCard>,
  { inline: true, propTables: [StoryCard] },
  )
  .addWithInfo('with title & description', 'this time with title & desc', tdDemo)
  .addWithInfo('with title, description & visualization', 'this time with title, desc & vis', tdvDemo);
