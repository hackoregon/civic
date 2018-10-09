/* eslint-disable no-console */
import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { text, array, number, withKnobs } from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';
import { CivicCardStack, HorizontalBarChart } from '../src';
import { wallOfText } from './shared';

const data = array('Data', [
  { sortOrder: 1, population: 2000, label: 'Labrador Retriever' },
  { sortOrder: 2, population: 8000, label: 'Standard Poodle' },
  { sortOrder: 3, population: 6000, label: 'French Bulldog' },
  { sortOrder: 4, population: 3000, label: 'Afghan Hound' },
  { sortOrder: 5, population: 1000, label: 'Jack Russell Terrier' },
]);
const dataKey = text('Data key', 'sortOrder');
const dataValue = text('Data values', 'population');
const dataKeyLabel = text('Data key labels', 'label');

const Container = ({ children }) => (
  <div style={{ padding: '30px' }}>{children}</div>
);

const collapsableDemo = () => (
  <Container>
    <CivicCardStack>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <HorizontalBarChart
          data={data}
          dataKey={dataKey}
          dataValue={dataValue}
          dataKeyLabel={dataKeyLabel}
        />
      </div>
    </CivicCardStack>
  </Container>
);

export default () =>
  storiesOf('CivicCardStack', module)
    .addDecorator(checkA11y)
    .addDecorator(withKnobs)
    .add(
      'Simple usage',
      // 'This is some basic usage with the CivicCardStack with just a title and descriptions')(
      () => {
        const cards = number('Number of cards', 3);
        return (
          <Container>
            <CivicCardStack cards={cards}>
              <p className="Description">{wallOfText}</p>
            </CivicCardStack>
          </Container>
        );
      }
    )
    .add('with collapsable sections', collapsableDemo);
