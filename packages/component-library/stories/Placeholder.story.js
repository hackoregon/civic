import React from 'react';
import { storiesOf } from '@storybook/react';
import { Placeholder } from '../src';
import { checkA11y } from '@storybook/addon-a11y';

export default () => storiesOf('Placeholder', module)
  .addDecorator(checkA11y)
  .add('default', () => <Placeholder />)
  .add('with a custom message', () => (
    <Placeholder>
      <h1>Why is this still here?</h1>
      <p>Shouldn't someone have done something by now?</p>
    </Placeholder>
  ));
