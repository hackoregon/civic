import PropTypes from "prop-types";
import React from "react";
import { css } from "emotion";
import { TwitterShareButton, TwitterIcon } from "react-share";

const quoteClass = css`
  font-family: "Merriweather", serif;
  font-size: 24px;
  color: #1e62bd;
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
        <TwitterIcon size={24} round iconBgStyle={{ fill: "#1E62BD" }} />
      </div>
    </TwitterShareButton>
  </div>
);

PullQuote.displayName = "PullQuote";

PullQuote.propTypes = {
  quoteText: PropTypes.string,
  quoteAttribution: PropTypes.string,
  url: PropTypes.string
};

export default PullQuote;
