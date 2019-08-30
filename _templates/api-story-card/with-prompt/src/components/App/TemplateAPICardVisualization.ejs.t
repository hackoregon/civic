---
to: packages/<%=package%>/src/components/<%=StoryCardName%>/<%=StoryCardName%>Visualization.js
---
import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { LineChart } from "@hackoregon/component-library";

const <%=StoryCardName%>Visualization = ({ data }) => {
  const isLoading = !isLoaded(data.<%=aPI%>);

  return (
    <>
      {!isLoading && data && (
        <LineChart
          data={data.<%=aPI%>.value}
          dataKey="year"
          dataValue="weekday_sum_ons"
          title="Template API Plot"
        />
      )}
    </>
  );
};

<%=StoryCardName%>Visualization.propTypes = {
  data: PropTypes.shape({ <%=aPI%>: resourceShape })
};

export default <%=StoryCardName%>Visualization;
