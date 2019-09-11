import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { LineChart } from "@hackoregon/component-library";

const SystemWideSummaryVisualization = ({ data }) => {
  const isLoading = !isLoaded(data.busSystemWideSummary);
  const [onsOffsSeries, setOnsOffsSeries] = useState(null);

  // creating a data series for ons and offs separately and as totals
  useEffect(() => {
    if (!isLoading) {
      const totalSeries = data.busSystemWideSummary.value.results.map(
        result => {
          return {
            series: "ons_offs",
            arrive_quarter_hour: result.arrive_quarter_hour,
            count: result.total_ons + result.total_offs
          };
        }
      );

      setOnsOffsSeries([...totalSeries]);
    }
  }, [isLoading]); // eslint-disable-line

  return (
    <>
      {!isLoading && data && onsOffsSeries ? (
        <>
          <LineChart
            data={onsOffsSeries}
            dataKey="arrive_quarter_hour"
            dataSeries="series"
            dataSeriesLabel={[
              { category: "ons_offs", label: "Total Ons and Offs" }
            ]}
            dataValue="count"
            title="System Wide Summary — Ons & Offs"
            xLabel="Quarter Hour"
            xNumberFormatter={time => {
              return time
                ? `${Math.floor(time)}:${
                    (time % 1) * 60 === 0 ? "00" : (time % 1) * 60
                  }`
                : time;
            }}
            yLabel="Ons and Offs"
          />
        </>
      ) : null}
    </>
  );
};

SystemWideSummaryVisualization.propTypes = {
  data: PropTypes.shape({ busSystemWideSummary: resourceShape })
};

export default SystemWideSummaryVisualization;
