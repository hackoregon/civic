/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import CivicCardLink from "./CivicCardLink";

function CivicCardLayoutSideBySide({ isLoading, data, cardMeta }) {
  return (
    <div
      css={css`
        text-align: center;
        margin: 1.5em auto;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: "row";
          @media screen and (max-width: 600px) {
            flex-direction: column;
          }
        `}
      >
        <cardMeta.visualization isLoading={isLoading} data={data} />
        <cardMeta.visualization isLoading={isLoading} data={data} />
      </div>
      <CivicCardLink slug={cardMeta.slug}>Learn more</CivicCardLink>
    </div>
  );
}

CivicCardLayoutSideBySide.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  cardMeta: PropTypes.shape({
    /* TODO: Add shape */
  })
};

export default CivicCardLayoutSideBySide;
