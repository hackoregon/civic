import React from 'react';
import { css } from 'emotion';
import { TwitterShareButton, TwitterIcon } from 'react-share';

const quoteClass = css`
  font-family: 'Merriweather', serif;
  font-size: 40px;
  color: #eb4d5f;
  margin-bottom: 20px;
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
  max-width: 1000px;
  text-align: center;
  margin: 1.5em auto;
`;

const PullQuote = ({ quoteText, quoteAttribution }) => (
  <div className={wrapperClass}>
    <TwitterShareButton url={window.location.href} title={quoteText}>
      <blockquote className={quoteClass} >
          &#8220;{ quoteText }&#8221;<br />
        { quoteAttribution ? <span className={attributionClass}>&#8212; { quoteAttribution }</span> : null }
      </blockquote>
      <div className={iconClass}>
        <TwitterIcon size={40} round iconBgStyle={{ fill: '#eb4d5f' }} />
      </div>
    </TwitterShareButton>
  </div>
);

PullQuote.displayName = 'PullQuote';

PullQuote.propTypes = {
  quoteText: React.PropTypes.string,
  quoteAttribution: React.PropTypes.string,
};

export default PullQuote;
