import React from "react";
import PropTypes from "prop-types";

import { LineChart } from "@hackoregon/component-library";

const TemplateCardVisualization = ({ isLoading, data }) => (
  <React.Fragment>
    {!isLoading && data && (
      <LineChart
        data={data}
        dataKey="year"
        dataValue="ridership"
        dataSeries="series"
        title="Template Plot"
      />
    )}
  </React.Fragment>
);

TemplateCardVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      ridership: PropTypes.number,
      series: PropTypes.string
    })
  )
};

export default TemplateCardVisualization;
