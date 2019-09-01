import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { BaseMap, ComparisonMap } from "@hackoregon/component-library";

const DisturbanceStopsVisualization = ({ data }) => {
  const isLoading = !isLoaded(data.disturbanceStops);

  const DisturbanceStopsMap2017 = <BaseMap />;

  const DisturbanceStopsMap2018 = <BaseMap />;

  return (
    <>
      {!isLoading && data && (
        <ComparisonMap
          leftMap={DisturbanceStopsMap2017}
          rightMap={DisturbanceStopsMap2018}
        />
      )}
    </>
  );
};

DisturbanceStopsVisualization.propTypes = {
  data: PropTypes.shape({ disturbanceStops: resourceShape })
};

export default DisturbanceStopsVisualization;
