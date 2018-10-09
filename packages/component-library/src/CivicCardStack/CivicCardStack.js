import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import CivicStoryCard from '../CivicStoryCard/CivicStoryCard';

const lastCardOpacity = 0.4;

const foregroundCard = css`
`;

const bgCard = (index, total, baseOpacity) => css`
  position: absolute;
  z-index: ${-index};
  left: ${5 * (index)}px;
  top: ${-5 * (index)}px;
  opacity: ${1 - (index)*(1- baseOpacity)/(total - 1)};
`;

const BackgroundStoryCard = (index, total, children) => (
  <div className={bgCard(index, total, lastCardOpacity)} key={index}>
    <CivicStoryCard footer={false}>{children}</CivicStoryCard>
  </div>
);

const CivicCardStack = ({ cards, children }) => {
  return (
    <div>
      <div className={foregroundCard}>
      {cards &&
        [...Array(cards)].map((item, index) =>
          BackgroundStoryCard(index, cards, children)
        )}
      </div>
    </div>
  );
};

CivicCardStack.propTypes = {
  children: PropTypes.node,
  cards: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
};

CivicCardStack.defaultProps = {};

export default CivicCardStack;
