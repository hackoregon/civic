import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { Button } from '../src';
import { styles } from './storyStyles.js';

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

const altTitle = 'With some emoji';

export default () => storiesOf('UI Components/Button', module)
  .addDecorator(checkA11y)
  .addDecorator(story => 
    <div style={styles.storyGrid}>
      <div style={styles.storyGridItem}>
        {story()}
      </div>
    </div>)
  .add(title, demoCode)
  .add(altTitle, altDemo);
