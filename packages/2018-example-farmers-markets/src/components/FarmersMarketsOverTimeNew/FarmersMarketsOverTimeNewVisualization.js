import React from "react";
import PropTypes from "prop-types";

import { LineChart } from "@hackoregon/component-library";

const FarmersMarketsOverTimeNewVisualization = ({ isLoading, data }) => (
  <React.Fragment>
    {!isLoading && data && (
      <LineChart
        title="Have we hit peak Farmers Markets?"
        subtitle="US Farmers Markets, excluding farm stands"
        data={data}
        xLabel="Year"
        yLabel="# Farmers Markets Nationally"
        dataKey="Year"
        dataValue="FarmersMarketCount"
        dataKeyLabel="Year"
      />
    )}
  </React.Fragment>
);

FarmersMarketsOverTimeNewVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      ridership: PropTypes.number,
      series: PropTypes.string
    })
  )
};

export default FarmersMarketsOverTimeNewVisualization;
