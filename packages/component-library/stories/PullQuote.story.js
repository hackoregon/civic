import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PullQuote } from '../src';

const displayName = PullQuote.displayName || 'PullQuote';
const title = 'Simple usage';
const description = `
  This is some basic usage with the button with providing a label to show the text.
  Clicking should trigger an action.`;

const quoteText = 'Hack Oregon is fun. A super super super super super long quote';
const quoteAttribution = 'Susannah';

const demoCode = () => (
  <PullQuote
    quoteText={quoteText}
    quoteAttribution={quoteAttribution}
  />
);

const altDemo = () => (
  <PullQuote
    quoteText={quoteText}
  />
);

const urlDemo = () => (
  <PullQuote
    quoteText={quoteText}
    url={'http://www.hackoregon.org'}
  />
);

const altTitle = 'Without attribution';
const urlTitle = 'With custom URL';

export default () => storiesOf('CIVIC Platform Components/Pull Quote', module)
  .add(
    title,
    demoCode
  )
  .add(altTitle, altDemo)
  .add(urlTitle, urlDemo);

