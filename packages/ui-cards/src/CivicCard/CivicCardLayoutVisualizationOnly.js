/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import cardMetaTypes from "./cardMetaTypes";
import CivicCardLink from "./CivicCardLink";

export function CivicCardLayoutVisualizationOnly({
  isLoading,
  data,
  cardMeta
}) {
  return (
    <div
      css={css`
        text-align: center;
        margin: 1.5em auto;
      `}
    >
      <cardMeta.visualization isLoading={isLoading} data={data} />
      <CivicCardLink slug={cardMeta.slug}>Learn more</CivicCardLink>
    </div>
  );
}

CivicCardLayoutVisualizationOnly.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  cardMeta: cardMetaTypes
};

CivicCardLayoutVisualizationOnly.displayName =
  "CivicCardLayoutVisualizationOnly";
