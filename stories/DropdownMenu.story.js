import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { DropdownMenu } from '../components';

const displayName = DropdownMenu.displayName || 'DropdownMenu';
const title = 'Simple usage';
const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;

const demoCode = () => (
  <DropdownMenu
    dispatch={dispatch => action => dispatch(action)}
    reduxAction={payload => console.log({ type: 'ACTION', payload })}
    options={[
      { value: '0', label: 'David' },
      { value: '1', label: 'Daniel' },
      { value: '2', label: 'Last' },
      { value: '3', label: 'Name' },
    ]}
  />
);

const propDocs = { inline: true, propTables: [DropdownMenu] };

export default () => storiesOf(displayName, module)
  .addWithInfo(
    title,
    description,
    demoCode,
    propDocs,
  );