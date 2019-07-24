import React from "react";
import PropTypes from "prop-types";

import { LineChart } from "@hackoregon/component-library";

const TransportationCardVisualization = ({ isLoading, data }) => (
  <React.Fragment>
    {!isLoading && data && (
      <LineChart
        data={data}
        dataKey="year"
        dataValue="ridership"
        dataSeries="series"
        title="Transportation Plot"
      />
    )}
  </React.Fragment>
);

TransportationCardVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      ridership: PropTypes.number,
      series: PropTypes.string
    })
  )
};

export default TransportationCardVisualization;
