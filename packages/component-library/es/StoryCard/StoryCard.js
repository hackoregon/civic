import React, { PropTypes } from 'react';
import StoryFooter from './StoryFooter';
import './StoryCard.css';

var StoryCard = function StoryCard(_ref) {
  var cardId = _ref.cardId,
      collectionId = _ref.collectionId,
      title = _ref.title,
      children = _ref.children;
  return React.createElement(
    'div',
    { className: 'Card' },
    React.createElement(
      'h2',
      { className: 'Title FilsonSoft' },
      title
    ),
    React.createElement(
      'div',
      { style: { width: '100%' } },
      children
    ),
    React.createElement(StoryFooter, { cardId: cardId, collectionId: collectionId })
  );
};

StoryCard.displayName = 'StoryCard';

StoryCard.propTypes = {
  title: PropTypes.string,
  cardId: PropTypes.string,
  collectionId: PropTypes.string,
  children: PropTypes.node
};

export default StoryCard;