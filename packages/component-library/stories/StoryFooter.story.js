import React from 'react';

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';

import { withKnobs, text } from '@storybook/addon-knobs';
import StoryFooter from '../src/StoryCard/StoryFooter';
// import { ICONS } from '../src/styleConstants';

const collectionId = 'collection-id';
const cardId = 'cardId';

// const propTableOptions = { inline: true, propTables: [StoryFooter] };
// const wrapperStyle = { width: '30%', padding: '10%', margin: '0 auto' };
// `Made with 2 <StoryLink /> components, 1 allows navigating to the card page & 1 copies the link for sharing.
 // Since the links are made with card id and collection id, change the values in the knobs below,
 // copy via the link then try pasting from your clipboard.
// `
export default () => storiesOf('StoryFooter', module)
  .addDecorator(withKnobs)
  .add(
    'default usage', () => (
      <StoryFooter cardId={text('Card Id', cardId)} collectionId={text('collectionId', collectionId)} />
    )
  );
