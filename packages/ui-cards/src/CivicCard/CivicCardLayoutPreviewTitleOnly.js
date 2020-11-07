/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { generate } from "shortid";
import { BrandColors } from "@hackoregon/ui-themes";
import { Chip } from "@hackoregon/ui-core";

import cardMetaTypes from "./cardMetaTypes";
import CivicCardLink from "./CivicCardLink";

const { secondary } = BrandColors;

const contentContainer = css`
  position: relative;
  &:focus-within {
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 4px 2px -1px rgba(0, 0, 0, 0.12);
    outline: 1px solid transparent; /* needed for Windows high-contrast mode */
`;

/* this is an accessibility feature to make the entire card clickable without wrapping all the content in a link. */
const cardHeadlineLink = css`
  display: inline-block;
  color: unset;
  &::before {
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  &:focus-visible {
    outline: 2px solid hsl(300, 5%, 55%);
  }
  &:-moz-focusring {
    outline: 2px solid hsl(300, 5%, 55%);
  }
  &:hover {
    color: currentColor;
  }
`;

const watermarkContainer = css`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  text-align: left;
`;

const scaleCorner = css`
  width: 5vw;
  min-width: 67px;
  max-width: 134px;
  height: 5vw;
  min-height: 67px;
  max-height: 134px;
`;

const nonInteractiveCta = css`
  font-family: Rubik, Helvetica Neue, Helvetica, sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.75;
  padding: 0.307692308em 0.615384615em;
  text-transform: uppercase;
  transition: background-color 63ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 63ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 63ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  z-index: 2;
  &:hover {
    background-color: rgba(32, 16, 36, 0.08);
    cursor: pointer;
  }
`;

const tagList = css`
  list-style: unset;
  padding: unset;
  & li {
    display: unset;
  }
`;

const useStyles = makeStyles({
  card: {
    "&:hover": {
      boxShadow:
        "0px 2px 6px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 4px 2px -1px rgba(0,0,0,0.12)"
    }
  }
});

const Watermark = () => (
  <div css={watermarkContainer}>
    <svg css={scaleCorner}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 134.658V0l11.566 11.597v123.061H0z" fill="#191119" />
        <path
          d="M133.864 0v11.597H11.566v.008L0 .008V0h133.864z"
          fill="#DC4556"
        />
      </g>
    </svg>
  </div>
);

export function CivicCardLayoutPreviewTitleOnly({ cardMeta }) {
  const classes = useStyles();

  return (
    <Card css={contentContainer} className={classes.card}>
      <Watermark />
      <div
        css={css`
          padding: 0 15px 0 27px;
        `}
      >
        <CardContent>
          <h2>
            <CivicCardLink css={cardHeadlineLink} slug={cardMeta.slug}>
              {cardMeta.title}
            </CivicCardLink>
          </h2>
          <ul css={tagList} id={`${cardMeta.slug}-tags`}>
            {cardMeta.tags.map((tag, index) => (
              <li>
                <Chip
                  tag={tag}
                  index={index}
                  key={generate()}
                  color={secondary.hex}
                />
              </li>
            ))}
          </ul>
        </CardContent>
        <CardActions>
          <span css={nonInteractiveCta}>Learn more</span>
        </CardActions>
      </div>
    </Card>
  );
}

CivicCardLayoutPreviewTitleOnly.propTypes = {
  cardMeta: cardMetaTypes
};

CivicCardLayoutPreviewTitleOnly.displayName = "CivicCardLayoutPreviewTitleOnly";
