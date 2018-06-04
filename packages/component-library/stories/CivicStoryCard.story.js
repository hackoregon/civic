/* eslint-disable no-console */
import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  text, number, object, array,
} from '@storybook/addon-knobs';
import { CivicStoryCard, Chart, ChartData, Pie, HorizontalBarChart } from '../src';
import { getRandomValuesArray, getColors, randomizer, wallOfRichText, wallOfText } from './shared';

const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
const width = 300;
const height = 300;

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

const Container = ({ children }) => (
  <div style={{padding:'30px'}}>
    {children}
  </div>
);

const tdDemo = () => (
  <Container>
    <CivicStoryCard title={'A title goes here'}>
      <p className="Description">{wallOfRichText}</p>
    </CivicStoryCard>
  </Container>
);
const tdvDemo = () => (
  <Container>
    <CivicStoryCard title={'Dogs x Income'}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <HorizontalBarChart
          data={data}
          dataKey={dataKey}
          dataValue={dataValue}
          dataKeyLabel={dataKeyLabel}
        />
      </div>
      <p className="Description">{wallOfRichText}</p>
    </CivicStoryCard>
  </Container>
);

export default () => storiesOf('CivicStoryCard', module)
  .add(
    'Simple usage',
    // 'This is some basic usage with the CivicStoryCard with just a title and descriptions')(
    () => (
      <Container>
        <CivicStoryCard title={'Campsite Reports & income levels of a community'}>
          <p className="Description">{wallOfText}</p>
        </CivicStoryCard>
      </Container>
    )
  )
  .add('with title & description', tdDemo)
  .add('with title, description & visualization', tdvDemo);
