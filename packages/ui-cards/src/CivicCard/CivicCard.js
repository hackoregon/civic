import React from "react";
import PropTypes from "prop-types";
import { ErrorBoundary, DataChecker } from "@hackoregon/utils";
import CivicCardLayoutFull from "./CivicCardLayoutFull";
import { cardMetaKeys, optionalCardMetaKeys } from "./cardMetaTypes";

const CivicCard = ({ cardMeta, data, isLoading, Layout }) => (
  <ErrorBoundary
    customMessage={`CivicCard: "${cardMeta(data).title}" failed to load`}
  >
    <DataChecker
      data={cardMeta(data)}
      dataAccessors={cardMetaKeys}
      optionalKeys={optionalCardMetaKeys}
      dataIsObject
      message="Invalid cardMeta"
    >
      <Layout cardMeta={cardMeta(data)} isLoading={isLoading} data={data} />
    </DataChecker>
  </ErrorBoundary>
);

CivicCard.propTypes = {
  cardMeta: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  isLoading: PropTypes.bool,
  Layout: PropTypes.func
};

CivicCard.defaultProps = {
  Layout: CivicCardLayoutFull
};

export default CivicCard;
