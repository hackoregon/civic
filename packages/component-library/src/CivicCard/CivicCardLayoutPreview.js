/** @jsx jsx */
import { jsx } from "@emotion/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { generate } from "shortid";

import cardMetaTypes from "./cardMetaTypes";
import CivicCardLink from "./CivicCardLink";
import { Chip, BrandColors } from "../..";

const { secondary } = BrandColors;

function CivicCardLayoutPreview({ cardMeta }) {
  return (
    <Card>
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
    </Card>
  );
}

CivicCardLayoutPreview.propTypes = {
  cardMeta: cardMetaTypes
};

CivicCardLayoutPreview.displayName = "CivicCardLayoutPreview";

export default CivicCardLayoutPreview;
