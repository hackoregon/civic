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
  padding: 24px;
  text-align: left;
`;

const CivicStoryCard = ({ cardId, collectionId, title, children }) => (
  <div className={cardClass}>
    { title ? <h2 className={'Title FilsonSoft'}>{title}</h2> : null}
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
