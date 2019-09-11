import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { LineChart } from "@hackoregon/component-library";

const EarthquakeDamageEstimatesForBuildingsInTillamookCountyVisualization = ({
  data
}) => {
  const isLoading = !isLoaded(data.damageEstimates);

  return (
    <>
      {!isLoading && data && (
        <LineChart
          data={data.damageEstimates.value}
          dataKey="year"
          dataValue="weekday_sum_ons"
          title="Template API Plot"
        />
      )}
    </>
  );
};

EarthquakeDamageEstimatesForBuildingsInTillamookCountyVisualization.propTypes = {
  data: PropTypes.shape({ damageEstimates: resourceShape })
};

export default EarthquakeDamageEstimatesForBuildingsInTillamookCountyVisualization;
