import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import StoryFooter from './StoryFooter';

const cardClass = css`
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const descriptionClass = css`
  margin: 0 auto;
  text-align: left;
`;

const StoryCard = ({ cardId, collectionId, title, children }) => (
  <div className={cardClass}>
    <h2 className="Title">{title}</h2>
    <div className={descriptionClass}>{children}</div>
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
