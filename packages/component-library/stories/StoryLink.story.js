import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { checkA11y } from '@storybook/addon-a11y';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import StoryLink from '../src/StoryCard/StoryLink';
import { ICONS } from '../src/styleConstants';

const collectionId = 'collection-id';
const cardId = 'cardId';
// 'Wraps react-router <Link />, so that when given a route prop, it will route to the right part of the application.',
const wrapperStyle = { width: '30%', padding: '10%', margin: '0 auto' };
export default () =>
  storiesOf('StoryLink', module)
    .addDecorator(checkA11y)
    .addDecorator(withKnobs)
    .add('that can link to full page card', () => (
      <div style={object('Style', wrapperStyle)}>
        <StoryLink
          className={'Context'}
          route={`/${collectionId}/${cardId}`}
          icon={ICONS.eye}
        >
          View card
        </StoryLink>
      </div>
    ))
    // 'Either use it with component functions, or dispatch redux actions',
    .add('that can take an action', () => (
      <div style={object('Style', wrapperStyle)}>
        <StoryLink
          className={'Context'}
          action={action('Takes some action!')}
          icon={ICONS.download}
        >
          Download!
        </StoryLink>
      </div>
    ))
    .add(
      'takes any font awesome icon',
      // 'Try switching the font awesome classnames with the knobs below to check out different looks.',
      () => {
        const fontAwesomeIcon = text('Font Awesome class', 'fa fa-code');
        return (
          <div style={object('Style', wrapperStyle)}>
            <StoryLink
              icon={fontAwesomeIcon}
              action={action('Take some other action!')}
            >
              {fontAwesomeIcon}
            </StoryLink>
          </div>
        );
      }
    );
