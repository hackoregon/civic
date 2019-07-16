import React from "react";
import PropTypes from "prop-types";
import CivicCardLayoutFull from "./CivicCardLayoutClassic";

const CivicCard = ({ cardMeta, data, isLoading, Layout }) => (
  <Layout cardMeta={cardMeta(data)} isLoading={isLoading} data={data} />
);

CivicCard.propTypes = {
  cardMeta: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  Layout: PropTypes.node
};

CivicCard.defaultProps = {
  Layout: CivicCardLayoutFull
};

export default CivicCard;
