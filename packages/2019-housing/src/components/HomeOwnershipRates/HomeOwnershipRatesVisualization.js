import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { civicFormat, LineChart } from "@hackoregon/component-library";

const HomeOwnershipRatesVisualization = ({ data }) => {
  if (!isLoaded(data.homeownershipByRace)) return <div>Data Loading...</div>;

  const dataSeriesLabels = [
    { category: "white", label: "white" },
    { category: "black", label: "black" },
    { category: "asian", label: "asian" },
    { category: "hisp", label: "hisp" }
  ];

  return (
    data && (
      <LineChart
        data={data.homeownershipByRace.value.results}
        dataKey="yr"
        dataValue="home_ownership_rate"
        dataSeries="race"
        dataSeriesLabel={dataSeriesLabels}
        domain={{
          x: [1990, 2017],
          y: [0, 0.83]
        }}
        subtitle="subtitle"
        title="Home Ownership By Race In Multnomah County 1990 to 2017"
        xLabel="Census Year"
        yLabel="Home Ownership Rate"
        xNumberFormatter={x => civicFormat.year(x)}
        yNumberFormatter={y => civicFormat.decimalToPercent(y)}
        protect
      />
    )
  );
};

HomeOwnershipRatesVisualization.propTypes = {
  data: PropTypes.shape({ homeownershipByRace: resourceShape })
};

export default HomeOwnershipRatesVisualization;
