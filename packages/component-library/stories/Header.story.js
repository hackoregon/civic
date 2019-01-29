import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Header } from '../src';
import Hero from '../src/Hero/Hero';
import { checkA11y } from '@storybook/addon-a11y';

const displayName = Header.displayName || 'Header';
const title = 'Simple usage';
const description = `
  a basic nav with logo & nav controls`;

const demoCode = () => (
  <Header title="Civic" />
);

const altTitle = 'With Hero section';

const altDemo = () => (
  <div><Header title="Civic" /><Hero /></div>
);

const overlayDemo = () => (
  <div>
    <Header title="Civic" overlay />
    <div style={{ background: '#7CD', height: '50vh', display: 'flex', alignItems: 'center' }}>
      <h1 style={{ padding: '3em' }}>Impressive words here</h1>
    </div>
  </div>
);

// const propDocs = { inline: true, propTables: [Header] };

export default () => storiesOf('CIVIC Platform Components/Header', module)
  .addDecorator(checkA11y)
  .add(title, demoCode)
  .add(altTitle, altDemo)
  .add('In overlay mode', overlayDemo);
