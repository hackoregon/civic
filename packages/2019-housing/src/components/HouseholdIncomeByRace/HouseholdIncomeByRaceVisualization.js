import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { civicFormat, LineChart } from "@hackoregon/component-library";
import TempLoader from "../TempLoader/TempLoader";

const HouseholdIncomeByRaceVisualization = ({ data }) => {
  if (!isLoaded(data.householdIncomeByRace)) return <TempLoader />;

  const dataSeriesLabels = [
    { category: "Asian/Pacific Islander", label: "Asian/Pacific Islander" },
    { category: "Black", label: "Black" },
    { category: "Another race", label: "Another race" },
    { category: "Hispanic or Latino", label: "Hispanic or Latino" },
    { category: "Native American", label: "Native American" },
    { category: "White", label: "White" }
  ];

  return (
    data && (
      <LineChart
        data={data.householdIncomeByRace.value.results}
        dataKey="year"
        dataValue="adjusted_median_income"
        dataSeries="race_explicit"
        dataSeriesLabel={dataSeriesLabels}
        domain={{
          x: [1990, 2017],
          y: [30000, 80200]
        }}
        subtitle="Portland 7-county MSA, 1990 to 2017, adjusted for inflation to 2018"
        title="Median Household Income by Race over Time"
        xLabel="Census Year"
        yLabel="Income"
        xNumberFormatter={x => civicFormat.year(x)}
        yNumberFormatter={y => civicFormat.dollars(y)}
        protect
      />
    )
  );
};

HouseholdIncomeByRaceVisualization.propTypes = {
  data: PropTypes.shape({ householdIncomeByRace: resourceShape })
};

export default HouseholdIncomeByRaceVisualization;
