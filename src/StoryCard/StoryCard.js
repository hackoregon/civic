import React, { PropTypes } from 'react';
import StoryFooter from './StoryFooter';
import './StoryCard.css';

const StoryCard = ({ cardId, collectionId, title, description, children }) => (
  <div className={'Card'}>
    <h2 className={'Title FilsonSoft'}>{title}</h2>
    <p className={'Description'}>{description}</p>
    <div style={{ width: '100%' }}>
      {children}
    </div>
    <StoryFooter cardId={cardId} collectionId={collectionId} />
  </div>
  );

StoryCard.displayName = 'StoryCard';

StoryCard.propTypes = {
  title: PropTypes.string,
  cardId: PropTypes.string,
  collectionId: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default StoryCard;
