import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { Scatterplot } from "@hackoregon/component-library";
import { civicFormat } from "@hackoregon/component-library/dist/utils";

const ProactivePlanningPumaVisualization = ({ data }) => {
  const isLoading = !isLoaded(data.proactivePlanningPuma);

  return (
    <>
      {!isLoading && data && (
        <Scatterplot
          title="Resilience and Displacement"
          subtitle="Resilience as measured by census non-response rate and expected displacement in a 9.0 earthquake by neighborhood"
          data={data.proactivePlanningPuma.value}
          xLabel="Census Non-Response Rate"
          yLabel="Per Capita Displacement"
          dataKey="census_response_rate"
          dataKeyLabel="resilienceLabel"
          dataValue="displaced_percap"
          dataValueLabel="displacementLabel"
          dataSeries="quadrant"
          size={{ key: "total_population", minSize: 2, maxSize: 10 }}
          xNumberFormatter={civicFormat.percentage}
          yNumberFormatter={civicFormat.percentage}
        />
      )}
    </>
  );
};

ProactivePlanningPumaVisualization.propTypes = {
  data: PropTypes.shape({ proactivePlanningPuma: resourceShape })
};

export default ProactivePlanningPumaVisualization;
