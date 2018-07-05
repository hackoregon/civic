import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import CivicStoryFooter from './CivicStoryFooter';

const cardClass = css`
  text-align: center;
  max-width: 1000px;
  margin: 1.5em auto;
  position: relative;
  border: 1px solid #DDD;
  border-radius: 2px;
  box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.2);
  padding:3em;

  p {
    margin: 40px 0;
    line-height: 1.6;
  }
`;

const descriptionClass = css`
  margin: 0 auto;
  text-align: left;
`;

const watermarkContainer = css`
  position:absolute;
  left: 0;
  top: 0;
  z-index: 0;
`;

const titleClass = css`
  margin: 0;
  text-align: left;
  font-size: 2.5em;
  line-height:1.2;
  margin-bottom:1em;
`;

const cardLoading = css`
  padding: 50px;
  text-align: center;
  background: #EEE;
`;

const cardError = css`
  padding: 50px;
  text-align: center;
  background: #FDD;
`;

const CivicStoryCard = ({ slug, title, children, error, loading, source }) => {
  let content = children;

  if (loading) {
    content = <div className={cardLoading}>Loading...</div>;
  } else if (error) {
    content = <div className={cardError}>{error}</div>;
  }

  return (
    <div className={cardClass}>
      <div className={watermarkContainer}>
        <svg width="134" height="135" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path d="M0 134.658V0l11.566 11.597v123.061H0z" fill="#191119" />
            <path d="M133.864 0v11.597H11.566v.008L0 .008V0h133.864z" fill="#DC4556" />
          </g>
        </svg>
      </div>
      { title ? <h2 className={titleClass}>{title}</h2> : null}
      <div className={descriptionClass}>
        {content}
      </div>
      <CivicStoryFooter slug={slug} source={source}/>
    </div>
  );
};

CivicStoryCard.displayName = 'CivicStoryCard';

CivicStoryCard.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  children: PropTypes.node,
  source: PropTypes.string,
};

export default CivicStoryCard;
