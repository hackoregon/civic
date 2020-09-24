/* eslint-disable import/prefer-default-export */
import React from "react";
import PropTypes from "prop-types";
import { ErrorBoundary, DataChecker } from "@hackoregon/utils";
import { CivicCardLayoutFull } from "./CivicCardLayoutFull";
import { cardMetaKeys, optionalCardMetaKeys } from "./cardMetaTypes";

export const CivicCard = ({ cardMeta, data, isLoading, Layout }) => (
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
  /** A function that takes data as an argument and returns an object consisting of the card data and metadata  */
  cardMeta: PropTypes.func.isRequired,
  /** Data to be used by the visualization component specified in cardMeta */
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  /** Whether the layout should display a loading state */
  isLoading: PropTypes.bool,
  /** A layout component that takes cardMeta, data, isLoading as props (e.g. CivicCardLayoutVisualizationOnly, CivicCardLayoutClassic, etc...) */
  Layout: PropTypes.elementType
};

CivicCard.defaultProps = {
  Layout: CivicCardLayoutFull
};

CivicCard.displayName = "CivicCard";
