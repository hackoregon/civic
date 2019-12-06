import React from "react";
import { StackedAreaChart } from "@hackoregon/component-library";
import {
  ungroupBy,
  civicFormat
} from "@hackoregon/component-library/dist/utils";

import { data } from "./utils";

const categories = [
  "Community Development",
  "Elected Officials",
  "Legislative and Administrative",
  "Parks, Recreation, & Culture",
  "Public Safety",
  "Public Utilities",
  "Transportation & Parking"
];

const BudgetStackedAreaChart = () => {
  const transformedData = ungroupBy(data, categories);
  return (
    <StackedAreaChart
      title="City of Portland Service Area Budget"
      subtitle="2006-2015"
      data={transformedData}
      dataKey="name"
      dataValue="value"
      dataSeries="type"
      xLabel="Year"
      xNumberFormatter={civicFormat.year}
      yLabel="Budget"
      yNumberFormatter={civicFormat.dollars}
    />
  );
};

export default BudgetStackedAreaChart;
