import PropTypes from "prop-types";
import shortid from "shortid";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { CivicStoryCard } from "@hackoregon/ui-cards";

const smallWatermark = (
  <svg xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path d="M0 75V0l11.566 11.597v63.421H0z" fill="#191119" />
      <path d="M75 0v11.597H11.566v.008L0 .008V0h133.864z" fill="#DC4556" />
    </g>
  </svg>
);

const LAST_CARD_OPACITY = 0.4;

const cardStackWrapper = total => css`
  padding: 0 ${total * 5}px ${total * 5}px 0;
`;

const bgCard = (index, total, baseOpacity) => css`
  position: absolute;
  z-index: ${total - index};
  left: ${5 * index}px;
  top: ${-5 * index + 20}px;
  opacity: ${1 - (index * (1 - baseOpacity)) / (total - 1)};
  padding-right: ${5 * (total - index - 1)}px;
`;

const BackgroundStoryCard = (index, total, children) => (
  <div css={bgCard(index, total, LAST_CARD_OPACITY)} key={shortid.generate()}>
    <CivicStoryCard footer={false} watermark={smallWatermark}>
      {children}
    </CivicStoryCard>
  </div>
);

const CivicCardStack = ({ cards, children }) => {
  return (
    <div css={cardStackWrapper(cards)}>
      {cards &&
        [...Array(cards)].map((item, index) =>
          BackgroundStoryCard(index, cards, children)
        )}
    </div>
  );
};

CivicCardStack.propTypes = {
  children: PropTypes.node,
  cards: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
};

CivicCardStack.defaultProps = {};

export default CivicCardStack;
