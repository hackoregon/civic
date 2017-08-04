import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text, object } from '@kadira/storybook-addon-knobs';
import StoryFooter from '../src/StoryCard/StoryFooter';
import { ICONS } from '../src/styleConstants';

const collectionId = 'collection-id';
const cardId = 'cardId';

const propTableOptions = { inline: true, propTables: [StoryFooter] };
const wrapperStyle = { width: '30%', padding: '10%', margin: '0 auto' };
export default () => storiesOf('StoryFooter', module)
  .addDecorator(withKnobs)
  .addWithInfo(
    'default usage',
    `Made with 2 <StoryLink /> components, 1 allows navigating to the card page & 1 copies the link for sharing.
     Since the links are made with card id and collection id, change the values in the knobs below,
     copy via the link then try pasting from your clipboard.
    `,
    () => (
      <StoryFooter cardId={text('Card Id', cardId)} collectionId={text('collectionId', collectionId)} />
    ),
    propTableOptions,
  );
