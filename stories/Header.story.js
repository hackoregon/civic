import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Header } from '../components';

const displayName = Header.displayName || 'Header';
const title = 'Simple usage';
const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;

const demoCode = () => (
  <Header onClick={action('clicked')} />
);

const propDocs = { inline: true, propTables: [Header] };

const altDemo = () => (
  <Header onClick={action('clicked')}>😀 😎 👍 💯</Header>
);

const altTitle = 'with some emoji';

export default () => storiesOf(displayName, module)
  .addWithInfo(
    title,
    description,
    demoCode,
    propDocs,
  )
  .add(altTitle, altDemo);