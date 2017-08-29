import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '../src';

const displayName = Button.displayName || 'Button';
const title = 'Simple usage';
const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;

const demoCode = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
);

const altDemo = () => (
  <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
);

const altTitle = 'with some emoji';

export default () => storiesOf(displayName, module)
  .add(
    title,
    demoCode
  )
  .add(altTitle, altDemo);
