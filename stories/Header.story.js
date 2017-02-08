import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Header } from '../components';
import Hero from '../components/Hero/Hero';

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

const propDocs = { inline: true, propTables: [Header] };

export default () => storiesOf(displayName, module)
  .addWithInfo(
    title,
    description,
    demoCode,
    propDocs,
  )
  .add(altTitle, altDemo);