/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";

function CivicCardLayoutVisualizationOnlyNoLink({ isLoading, data, cardMeta }) {
  return (
    <div
      css={css`
        text-align: center;
        margin: 1.5em auto;
      `}
    >
      <cardMeta.visualization isLoading={isLoading} data={data} />
    </div>
  );
}

CivicCardLayoutVisualizationOnlyNoLink.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  cardMeta: PropTypes.shape({
    /* TODO: Add shape */
  })
};

export default CivicCardLayoutVisualizationOnlyNoLink;
