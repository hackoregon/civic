import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from "emotion"; // eslint-disable-line emotion/no-vanilla

import { LineChart, Button } from "@hackoregon/component-library";
import { civicFormat } from "@hackoregon/component-library/dist/utils";

export default function DemoCardVisualization({ isLoading, data }) {
  const [dataType, setData] = useState("demoData");

  let dataTypeDescription;
  let title;

  switch (dataType) {
    case "midData":
      dataTypeDescription =
        "for lines passing through mid-stage gentrifying neighborhoods";
      title = "Portland Transit Ridership - Mid Gentrification";
      break;
    case "lateData":
      dataTypeDescription =
        "for lines passing through late-stage gentrifying neighborhoods";
      title = "Portland Transit Ridership - Late Gentrification";
      break;
    default:
      dataTypeDescription = "for all TriMet bus and rail";
      title = "Portland Transit Ridership - All";
  }
  return (
    <Fragment>
      <div
        className={css`
          display: flex;
          margin: 12px auto;
          max-width: 500px;
        `}
      >
        <Button
          accentColor={dataType === "demoData" ? "#DC4556" : "#1E62BD"}
          onClick={() => setData("demoData")}
          margin="6px auto"
        >
          All Neighborhoods
        </Button>
        <Button
          accentColor={dataType === "midData" ? "#DC4556" : "#1E62BD"}
          onClick={() => setData("midData")}
          margin="6px auto"
        >
          Mid Gentrification
        </Button>
        <Button
          accentColor={dataType === "lateData" ? "#DC4556" : "#1E62BD"}
          onClick={() => setData("lateData")}
          margin="6px auto"
        >
          Late Gentrification
        </Button>
      </div>
      {!isLoading && data[dataType] && (
        <LineChart
          data={data[dataType]}
          dataKey="year"
          dataValue="ridership"
          dataSeries="series"
          title={title}
          xLabel="Year"
          yLabel="Ridership"
          xNumberFormatter={civicFormat.year}
          subtitle={`Average daily ridership ${dataTypeDescription}`}
        />
      )}
    </Fragment>
  );
}

DemoCardVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      ridership: PropTypes.number,
      series: PropTypes.string
    })
  )
};
