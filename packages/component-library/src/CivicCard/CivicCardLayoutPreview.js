/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { generate } from "shortid";

import cardMetaTypes from "./cardMetaTypes";
import CivicCardLink from "./CivicCardLink";
import { Chip, BrandColors } from "../..";

const { secondary } = BrandColors;

const contentContainer = css`
  position: relative;
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

const Watermark = () => (
  <div css={watermarkContainer}>
    <svg css={scaleCorner} xmlns="http://www.w3.org/2000/svg">
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

function CivicCardLayoutPreview({ cardMeta }) {
  return (
    <Card css={contentContainer}>
      <Watermark />
      <div
        css={css`
          padding: 0 15px 0 27px;
        `}
      >
        <CardContent>
          <h2>{cardMeta.title}</h2>
          <p>{cardMeta.introText}</p>
          <section id={`${cardMeta.slug}-tags`}>
            {cardMeta.tags.map((tag, index) => (
              <Chip
                tag={tag}
                index={index}
                key={generate()}
                color={secondary.hex}
              />
            ))}
          </section>
        </CardContent>
        <CardActions>
          <CivicCardLink slug={cardMeta.slug}>Learn more</CivicCardLink>
        </CardActions>
      </div>
    </Card>
  );
}

CivicCardLayoutPreview.propTypes = {
  cardMeta: cardMetaTypes
};

CivicCardLayoutPreview.displayName = "CivicCardLayoutPreview";

export default CivicCardLayoutPreview;
