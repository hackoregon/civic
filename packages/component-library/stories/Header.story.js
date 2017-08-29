import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Header } from '../src';
import Hero from '../src/Hero/Hero';

const displayName = Header.displayName || 'Header';
const title = 'Simple usage';
const description = `
  a basic nav with logo & nav controls`;

const demoCode = () => (
  <Header title="Civic" />
);

const altTitle = 'with Hero section';

const altDemo = () => (
  <div><Hero /><Header title="Civic" /></div>
);

// const propDocs = { inline: true, propTables: [Header] };

export default () => storiesOf(displayName, module)
  .add(title, demoCode)
  .add(altTitle, altDemo);
