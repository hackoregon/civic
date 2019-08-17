---
to: packages/<%=package%>/src/components/<%=StoryCardName%>/<%=StoryCardName%>Visualization.js
---
import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";

import { LineChart } from "@hackoregon/component-library";

const <%=StoryCardName%>Visualization = ({ isLoading, data }) => (
  <>
    {!isLoading && data && (
      <LineChart
        data={data.mockRidershipOverTime.value}
        dataKey="year"
        dataValue="weekday_sum_ons"
        title="Template API Plot"
      />
    )}
  </>
);

<%=StoryCardName%>Visualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({ mockRidershipOverTime: resourceShape })
};

export default <%=StoryCardName%>Visualization;
