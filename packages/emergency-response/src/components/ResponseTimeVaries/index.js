import React from "react";
import { Scatterplot, civicFormat } from "@hackoregon/component-library";
import data from "./data";

const ResponseTimeScatterplot = () => (
  <div style={{ display: "flex", flexFlow: "row wrap" }}>
    <div style={{ width: "33.333%" }}>
      <h4 style={{ color: "#d7075f", textAlign: "right" }}>
        Response Time
        <br />
        vs. FMA Population
      </h4>
      <Scatterplot
        data={data}
        dataKey="fma_population_total"
        xLabel="Population"
        dataValue="median_response_time"
        yLabel="Minutes"
      />
    </div>
    <div style={{ width: "33.333%" }}>
      <h4 style={{ color: "#d7075f", textAlign: "right" }}>
        Response Time
        <br />
        vs FMA Median Income
      </h4>
      <Scatterplot
        data={data}
        dataKey="median_hh_income"
        xLabel="Median HH Income"
        xNumberFormatter={civicFormat.dollars}
        dataValue="median_response_time"
        yLabel="Minutes"
      />
    </div>
    <div style={{ width: "33.333%" }}>
      <h4 style={{ color: "#d7075f", textAlign: "right" }}>
        Response Time
        <br />
        vs FMA % Non-White
      </h4>
      <Scatterplot
        data={data}
        dataKey="percent_non_white"
        xLabel="Non-White"
        xNumberFormatter={civicFormat.percentage}
        dataValue="median_response_time"
        yLabel="Minutes"
      />
    </div>
    <div style={{ width: "33.333%" }}>
      <h4 style={{ color: "#d7075f", textAlign: "right" }}>
        Incidents Per Thousand
        <br />
        vs FMA Population
      </h4>
      <Scatterplot
        data={data}
        dataKey="fma_population_total"
        xLabel="Population"
        xNumberFormatter={civicFormat.numeric}
        dataValue="total_incidents_per_1000"
        yLabel="Incidents Per 1,000"
      />
    </div>
    <div style={{ width: "33.333%" }}>
      <h4 style={{ color: "#d7075f", textAlign: "right" }}>
        Incidents Per Thousand
        <br />
        vs FMA Median Income
      </h4>
      <Scatterplot
        data={data}
        dataKey="median_hh_income"
        xLabel="Median HH Income"
        xNumberFormatter={civicFormat.dollars}
        dataValue="total_incidents_per_1000"
        yLabel="Incidents Per 1,000"
      />
    </div>
    <div style={{ width: "33.333%" }}>
      <h4 style={{ color: "#d7075f", textAlign: "right" }}>
        Incidents Per Thousand
        <br />
        vs FMA % Non-White
      </h4>
      <Scatterplot
        data={data}
        dataKey="percent_non_white"
        xLabel="Non-White"
        xNumberFormatter={civicFormat.percentage}
        dataValue="total_incidents_per_1000"
        yLabel="Incidents Per 1,000"
      />
    </div>
  </div>
);

export default ResponseTimeScatterplot;
