/* eslint-disable no-console */
import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, number, object, array } from '@storybook/addon-knobs';
import { CivicStoryCard, Chart, ChartData, Pie, HorizontalBarChart, PageLayout } from '../src';
import { getRandomValuesArray, getColors, randomizer, wallOfRichText } from './shared';

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


const housingExample = () => (
  <PageLayout
    teamTitle='Transportation'
    heroTitle='Housing'
    heroSubtitle='A look into the housing rental income disparity.'
    mainProjectColor='#7CD'
  >
    <section style={{ margin: '80px 0' }} id='chart-1' >
      <p className="Description" style={{ maxWidth: '600px', margin: '100px auto', lineHeight: '2.5' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <CivicStoryCard>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <HorizontalBarChart
            data={data}
            dataKey={dataKey}
            dataValue={dataValue}
            dataKeyLabel={dataKeyLabel}
            title={'Dogs x Income'}
          />
        </div>
        <p className="Description">{wallOfRichText}</p>
      </CivicStoryCard>
    </section>
    <section style={{ margin: '80px 0' }} id='pullquote-1' >
      <blockquote className="Pullquote" style={{ maxWidth: '600px', margin: '100px auto', }}>
        "This is an example of a pullquote where someone has something important to say."
      </blockquote>
    </section>
    <section style={{ margin: '80px 0' }} id='transition-narrative' >
      <img width="100%" src="https://images.unsplash.com/photo-1500331882646-91f0854732b3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b4c11afc54567512b21bbb4be177da8a&auto=format&fit=crop&w=2978&q=80" />
    </section>
    <section style={{ margin: '80px 0' }} id='chart-2' >
      <CivicStoryCard>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <HorizontalBarChart
            data={data}
            dataKey={dataKey}
            dataValue={dataValue}
            dataKeyLabel={dataKeyLabel}
            title={'Dogs x Income'}
          />
        </div>
        <p className="Description">{wallOfRichText}</p>
      </CivicStoryCard>
    </section>
    <section style={{ margin: '80px 0' }} id='transition-narrative-2' >
      <p className="Description" style={{ maxWidth: '1000px', margin: '100px auto', }}>{wallOfRichText}</p>
    </section>
  </PageLayout>
);

const campaignFinanceExample = () => (
  <PageLayout
    heroTitle='Campaign Finance'
    heroSubtitle="A look into how money is raised and distributed in Portland's political campaigns."
    mainProjectColor='#b2df8a'
  >
    <section style={{ margin: '80px 0' }} id='pullquote-1' >
      <blockquote className="Pullquote" style={{ maxWidth: '600px', margin: '100px auto', }}>
        "Political finance in Oregon has, up until now, been a black box."
      </blockquote>
      <p className="Description" style={{ maxWidth: '600px', margin: '100px auto', lineHeight: '2.5' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </section>
    <section style={{ margin: '80px 0' }} id='transition-narrative' >
      <img width="100%" src="https://images.unsplash.com/photo-1520452112805-c6692c840af0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3f493d4dcbbdcffb506e841399797d25&auto=format&fit=crop&w=2773&q=80" />
    </section>
    <section style={{ margin: '80px 0' }} id='chart-2'>
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
    </section>
    <section style={{ margin: '80px 0' }} id='transition-narrative-2' >
      <p className="Description" style={{ maxWidth: '1000px', margin: '100px auto', }}>{wallOfRichText}</p>
    </section>
  </PageLayout>
);

export default () => storiesOf('CIVIC Platform Components/Page Layout', module)
  .add('A potential example of Housing Project', housingExample)
  .add('A potential example of Campaign Finance Project', campaignFinanceExample);
