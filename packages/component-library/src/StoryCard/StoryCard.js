import React, { PropTypes } from 'react';
import StoryFooter from './StoryFooter';
import styles from './StoryCard.css';

const StoryCard = ({ cardId, collectionId, title, children }) => (
  <div className={styles.Card}>
    <h2 className={'Title FilsonSoft'}>{title}</h2>
    <div className={styles.Description}>
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
  children: PropTypes.node,
};

export default StoryCard;
