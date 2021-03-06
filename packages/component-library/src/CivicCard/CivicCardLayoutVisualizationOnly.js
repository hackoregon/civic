/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import CivicCardLink from "./CivicCardLink";

function CivicCardLayoutVisualizationOnly({ isLoading, data, cardMeta }) {
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
  cardMeta: PropTypes.shape({
    /* TODO: Add shape */
  })
};

export default CivicCardLayoutVisualizationOnly;
