/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { StoryCard, Chart, ChartData, Pie } from '../components';
import { getRandomValuesArray, getColors, randomizer, wallOfText } from './shared';

const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
const width = 300;
const height = 300;


export default () => storiesOf('StoryCard', module)
.addWithInfo(
  'Simple usage',
  'This is some basic usage with the StoryCard with just a title and descriptions',
  () => <StoryCard title={'Some title'} description={'some descriptions go here'} />,
  { inline: true, propTables: [StoryCard] },
  )
  .add('with title & description', () => (<StoryCard title={'A title goes here'} description={wallOfText} />))
  .add('with title, description & visualization', () => (
    <StoryCard title={'A title goes here'} description={wallOfText}>
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
    ));
