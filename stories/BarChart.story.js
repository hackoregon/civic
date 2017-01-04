import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { BarChart } from '../components';

const displayName = BarChart.displayName || 'BarChart';
const title = 'Simple usage';
const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;

const demoCode = () => (
  <BarChart data={[{ name: 'David', x: 200, y: 300 }]} />
);

const propDocs = { inline: true, propTables: [BarChart] };

export default () => storiesOf(displayName, module)
  .addWithInfo(
    title,
    description,
    demoCode,
    propDocs,
  );