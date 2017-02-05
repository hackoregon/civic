import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text, object } from '@kadira/storybook-addon-knobs';
import StoryLink from '../components/StoryCard/StoryLink';
import { ICONS } from '../components/styleConstants';

const collectionId = 'collection-id';
const cardId = 'cardId';

const propTableOptions = { inline: true, propTables: [StoryLink] };
const wrapperStyle = { width: '30%', padding: '10%', margin: '0 auto' };
export default () => storiesOf('StoryLink', module)
  .addDecorator(withKnobs)
  .addWithInfo(
    'that can link to full page card',
    'Wraps react-router <Link />, so that when given a route prop, it will route to the right part of the application.',
    () => (
      <div style={object('Style', wrapperStyle)}>
        <StoryLink className={'Context'} route={`/${collectionId}/${cardId}`} icon={ICONS.eye}>View card</StoryLink>
      </div>
    ),
    propTableOptions,
  )
  .addWithInfo(
  'that can take an action',
  'Either use it with component functions, or dispatch redux actions',
  () => (
    <div style={object('Style', wrapperStyle)}>
      <StoryLink className={'Context'} action={action('Takes some action!')} icon={ICONS.download}>Download!</StoryLink>
    </div>
  ),
  propTableOptions,
  )
  .addWithInfo(
    'takes any font awesome icon',
    'Try switching the font awesome classnames with the knobs below to check out different looks.',
     () => {
       const fontAwesomeIcon = text('Font Awesome class', 'fa fa-code');
       return (
         <div style={object('Style', wrapperStyle)}>
           <StoryLink icon={fontAwesomeIcon} action={action('Take some other action!')}>{fontAwesomeIcon}</StoryLink>
         </div>);
     },
    propTableOptions,
);
