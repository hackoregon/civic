/* eslint-disable import/prefer-default-export */
import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { get } from "lodash";
import window from "global/window";

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
  margin: 60px auto;
`;

/** A styled pull quote with Twitter sharing of the current page or a custom URL */
export const PullQuote = ({ quoteText, quoteAttribution, url }) => (
  <div css={wrapperClass}>
    <TwitterShareButton
      url={url || get(window, "location.href", "")}
      title={quoteText}
    >
      <blockquote css={quoteClass}>
        &#8220;
        {quoteText}
        &#8221;
        <br />
        {quoteAttribution ? (
          <span css={attributionClass}>&#8212; {quoteAttribution}</span>
        ) : null}
      </blockquote>
      <div css={iconClass}>
        <TwitterIcon size={24} round iconBgStyle={{ fill: "#1E62BD" }} />
      </div>
    </TwitterShareButton>
  </div>
);

PullQuote.displayName = "PullQuote";

PullQuote.propTypes = {
  /** the quote */
  quoteText: PropTypes.string,
  /** who or what the source of the quote is */
  quoteAttribution: PropTypes.string,
  /** link to share with this quote, if different from the current page */
  url: PropTypes.string
};
