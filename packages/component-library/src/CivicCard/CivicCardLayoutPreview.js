/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
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
  const classes = useStyles();

  return (
    <CivicCardLink slug={cardMeta.slug}>
      <Card css={contentContainer} className={classes.card}>
        <Watermark />
        <div
          css={css`
            padding: 0 15px 0 27px;
          `}
        >
          <CardContent>
            <h2>{cardMeta.title}</h2>
            <div>{cardMeta.introText}</div>
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
            <Button size="small">Learn more</Button>
          </CardActions>
        </div>
      </Card>
    </CivicCardLink>
  );
}

CivicCardLayoutPreview.propTypes = {
  cardMeta: cardMetaTypes
};

CivicCardLayoutPreview.displayName = "CivicCardLayoutPreview";

export default CivicCardLayoutPreview;
