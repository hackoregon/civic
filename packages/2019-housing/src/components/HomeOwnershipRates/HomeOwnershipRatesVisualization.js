import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { civicFormat, LineChart } from "@hackoregon/component-library";
import TempLoader from "../TempLoader/TempLoader";

const dataSeriesLabel = [
  { category: "asian", label: "Asian/Pacific Islander" },
  { category: "black", label: "Black" },
  { category: "hisp", label: "Hispanic or Latino" },
  { category: "white", label: "White" }
];

const HomeOwnershipRatesVisualization = ({ data }) => {
  if (!isLoaded(data.homeownershipByRace)) return <TempLoader />;

  return (
    data && (
      <LineChart
        data={data.homeownershipByRace.value.results}
        dataKey="yr"
        dataValue="home_ownership_rate"
        dataSeries="race"
        dataSeriesLabel={dataSeriesLabel}
        domain={{
          x: [1990, 2017],
          y: [0, 0.83]
        }}
        subtitle="Multnomah County, 1990 to 2017, using census racial categories"
        title="Home Ownership By Race over Time"
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
