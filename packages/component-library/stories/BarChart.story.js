import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { BarChart } from '../src';

const displayName = BarChart.displayName || 'BarChart';
const title = 'Simple usage';
const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;

// const propDocs = { inline: true, propTables: [BarChart] };

export default () => storiesOf(displayName, module)
  .add(title, (() => (
    <BarChart data={[{ name: 'David', x: 200, y: 300 }]} />
  )));
