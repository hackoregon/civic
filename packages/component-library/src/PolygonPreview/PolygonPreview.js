import { Fragment } from "react";

/** @jsx jsx */
import { jsx } from "@emotion/core";

const PolygonPreview = () => (
  <Fragment>
    <span role="img" aria-label="region">
      🧩
    </span>
  </Fragment>
);

PolygonPreview.propTypes = {};

PolygonPreview.displayName = "PolygonPreview";

export default PolygonPreview;
