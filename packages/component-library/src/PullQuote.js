import React from 'react';
import { css } from 'emotion';

const quoteClass = css`
  font-family: 'Merriweather', serif;
  font-size: 40px;
`;

const attributionClass = css`
  font-size: 18px;
  text-align: center;
  display: flex;
  justify-content: center;
  line-height: 56px;
`;

const PullQuote = ({ quoteText, quoteAttribution }) => (
  <blockquote className={quoteClass} >
      &#8220;{ quoteText }&#8221;<br/>
    { quoteAttribution ? <span className={attributionClass}>&#8212; { quoteAttribution }</span> : null }
  </blockquote>
);

PullQuote.displayName = 'PullQuote';

PullQuote.propTypes = {
  quoteText: React.PropTypes.string,
  quoteAttribution: React.PropTypes.string,
};

export default PullQuote;
