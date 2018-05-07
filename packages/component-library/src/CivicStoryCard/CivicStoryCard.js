import React, { PropTypes } from 'react';
import { css } from 'emotion';
import CivicStoryFooter from './CivicStoryFooter';

const cardClass = css`
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const descriptionClass = css`
  margin: 0 auto;
  text-align: left;
`;

const CivicStoryCard = ({ cardId, collectionId, title, children }) => (
  <div className={cardClass}>
    <h2 className={'Title FilsonSoft'}>{title}</h2>
    <div className={descriptionClass}>
      {children}
    </div>
    <CivicStoryFooter cardId={cardId} collectionId={collectionId} />
  </div>
);

CivicStoryCard.displayName = 'CivicStoryCard';

CivicStoryCard.propTypes = {
  title: PropTypes.string,
  cardId: PropTypes.string,
  collectionId: PropTypes.string,
  children: PropTypes.node,
};

export default CivicStoryCard;
