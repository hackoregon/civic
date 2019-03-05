import React from 'react';
import { css } from 'emotion';
import { TwitterShareButton, TwitterIcon } from 'react-share';

const quoteClass = css`
  font-family: 'Merriweather', serif;
  font-size: 24px;
  color: #eb4d5f;
  margin-bottom: 12px;
`;

const attributionClass = css`
  font-size: 18px;
  text-align: center;
  display: flex;
  justify-content: center;
  line-height: 40px;
`;

const iconClass = css`
  display: inline-block;
`;

const wrapperClass = css`
  max-width: 700px;
  text-align: center;
  margin: 80px auto;
`;

const PullQuote = ({ quoteText, quoteAttribution, url }) => (
  <div className={wrapperClass}>
    <TwitterShareButton url={url || window.location.href} title={quoteText}>
      <blockquote className={quoteClass}>
        &#8220;
        {quoteText}
        &#8221;
        <br />
        {quoteAttribution ? (
          <span className={attributionClass}>&#8212; {quoteAttribution}</span>
        ) : null}
      </blockquote>
      <div className={iconClass}>
        <TwitterIcon size={24} round iconBgStyle={{ fill: '#eb4d5f' }} />
      </div>
    </TwitterShareButton>
  </div>
);

PullQuote.displayName = 'PullQuote';

PullQuote.propTypes = {
  quoteText: React.PropTypes.string,
  quoteAttribution: React.PropTypes.string,
  url: React.PropTypes.string,
};

export default PullQuote;
