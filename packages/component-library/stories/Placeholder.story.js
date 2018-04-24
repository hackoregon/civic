import React from 'react';
import { storiesOf } from '@storybook/react';
import { Placeholder } from '../src';

export default () => storiesOf('Placeholder')
  .add('default', () => <Placeholder />)
  .add('with a custom message', () => (
    <Placeholder>
      <h1>Why is this still here?</h1>
      <p>Shouldn't someone have done something by now?</p>
    </Placeholder>
  ));
