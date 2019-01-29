import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dropdown } from '../src';
import { checkA11y } from '@storybook/addon-a11y';

const displayName = Dropdown.displayName || 'Dropdown';
const title = 'Simple usage';
const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;

const demoCode = () => (
  <Dropdown
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

// const propDocs = { inline: true, propTables: [Dropdown] };

export default () => storiesOf("UI Components/Dropdown List", module)
  .addDecorator(checkA11y)
  .add(title, (demoCode))
