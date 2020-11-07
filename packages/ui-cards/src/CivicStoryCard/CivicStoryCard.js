/* eslint-disable import/prefer-default-export */
import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Link } from "react-router";
import { BrandColors } from "@hackoregon/ui-themes";
import { Logo } from "@hackoregon/ui-brand";
import CivicStoryFooter from "./CivicStoryFooter";

const { action } = BrandColors;

const cardClass = css`
  text-align: center;
  max-width: 1000px;
  margin: 1.5em auto;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.2);
  padding: 3em;
  background-color: white;

  p {
    margin: 40px 0;
    line-height: 1.6;
  }

  h2 {
    color: #001732;
  }
  @media (max-width: 640px) {
    padding: 3em 2em;
  }
`;

const descriptionClass = css`
  margin: 0 auto;
  text-align: left;
`;

const watermarkContainer = css`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  text-align: left;
`;

const titleClass = css`
  margin: 0;
  text-align: left;
  font-size: 2.5em;
  line-height: 1.2;
  margin-bottom: 1em;

  @media (max-width: 640px) {
    font-size: 2em;
  }
`;

const cardLoading = css`
  padding: 50px;
  text-align: center;
`;

const cardError = css`
  padding: 50px;
  text-align: center;
  color: #ee495c;
`;

const scaleCorner = css`
  width: 10vw;
  min-width: 67px;
  max-width: 134px;
  height: 10vw;
  min-height: 67px;
  max-height: 134px;
`;

const linkHeader = css`
  color: #000;
  cursor: pointer;

  &:hover {
    color: ${action.hex};
  }
`;

export const CivicStoryCard = ({
  slug,
  title,
  children,
  error,
  loading,
  source,
  footer,
  watermark
}) => {
  let content = children;
  if (loading) {
    content = (
      <div css={cardLoading}>
        <Logo type="squareLogoAnimated" alt="Loading..." />
      </div>
    );
  } else if (error) {
    content = (
      <div css={cardError}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div css={cardClass}>
      <div css={watermarkContainer}>
        {watermark || (
          <svg css={scaleCorner} xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path d="M0 134.658V0l11.566 11.597v123.061H0z" fill="#191119" />
              <path
                d="M133.864 0v11.597H11.566v.008L0 .008V0h133.864z"
                fill="#DC4556"
              />
            </g>
          </svg>
        )}
      </div>
      {title ? (
        <h2 css={titleClass}>
          <Link to={`/cards/${slug}`} css={linkHeader}>
            {title}
          </Link>
        </h2>
      ) : null}
      <div css={descriptionClass}>{content}</div>
      {footer && <CivicStoryFooter slug={slug} source={source} />}
    </div>
  );
};

CivicStoryCard.displayName = "CivicStoryCard";

CivicStoryCard.defaultProps = {
  source: "https://service.civicpdx.org/",
  footer: true
};

CivicStoryCard.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  children: PropTypes.node,
  source: PropTypes.string,
  footer: PropTypes.bool,
  watermark: PropTypes.node
};

CivicStoryCard.displayName = "CivicStoryCard";
