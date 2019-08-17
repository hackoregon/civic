import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";

import { VictoryCrazyTheme, LineChart } from "@hackoregon/component-library";

const TemplateAPICardVisualization = ({ isLoading, data }) => (
  <>
    {!isLoading && data && (
      <LineChart
        data={data.ridershipOverTime.value}
        dataKey="year"
        dataValue="weekday_sum_ons"
        title="Template API Plot"
        theme={VictoryCrazyTheme}
      />
    )}
  </>
);

TemplateAPICardVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({ ridershipOverTime: resourceShape })
};

export default TemplateAPICardVisualization;
