import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { LineChart } from "@hackoregon/component-library";

const TillamookCountyEarthquakeCasualtyEstimatesVisualization = ({ data }) => {
  const isLoading = !isLoaded(data.earthquakeCasualties);

  return (
    <>
      {!isLoading && data && (
        <LineChart
          data={data.earthquakeCasualties.value}
          dataKey="year"
          dataValue="weekday_sum_ons"
          title="Template API Plot"
        />
      )}
    </>
  );
};

TillamookCountyEarthquakeCasualtyEstimatesVisualization.propTypes = {
  data: PropTypes.shape({ earthquakeCasualties: resourceShape })
};

export default TillamookCountyEarthquakeCasualtyEstimatesVisualization;
