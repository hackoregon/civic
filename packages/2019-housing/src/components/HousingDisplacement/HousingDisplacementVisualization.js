import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";

import { LineChart } from "@hackoregon/component-library";

const HousingDisplacementVisualization = ({ isLoading, data }) => (
  <>
    {!isLoading && data && (
      <LineChart
        data={data.homeownershipByRace.value}
        dataKey="year"
        dataValue="weekday_sum_ons"
        title="Template API Plot"
      />
    )}
  </>
);

HousingDisplacementVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({ homeownershipByRace: resourceShape })
};

export default HousingDisplacementVisualization;
