import React from 'react';
import { storiesOf } from '@storybook/react';
import { LineChart } from '../src';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  text, number, object, array,
} from '@storybook/addon-knobs';

const displayName = LineChart.displayName || 'Line Chart';
const title = 'Simple usage';
const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;

// const propDocs = { inline: true, propTables: [LineChart] };

export default () => storiesOf(displayName, module).addDecorator(withKnobs)
  .add('Basic Usage', (() => {
    const data = object('Data',[
      { x: 0, y: 0 },
      { x: 2, y: 2 },
      { x: 4, y: 2 },
      { x: 8, y: 3 },
    ]);
    const dataKey = text('Data key', 'sortOrder');
    const dataValue = text('Data values', 'population');
    const dataKeyLabel = text('Data key labels', 'label');

    return (<LineChart 
      data={data}
      dataKey={dataKey}
      dataValue={dataValue}
      dataKeyLabel={dataKeyLabel}
    />);
  }))
  .add('no props', (() => (
    <LineChart />
  )))
