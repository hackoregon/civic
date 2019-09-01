/** @jsx jsx */
import { jsx } from "@emotion/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import cardMetaTypes from "./cardMetaTypes";
import CivicCardLink from "./CivicCardLink";

function CivicCardLayoutPreview({ cardMeta }) {
  return (
    <Card>
      <CardContent>
        <h2>{cardMeta.title}</h2>
        <p>{cardMeta.introText}</p>
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
