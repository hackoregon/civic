import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { LineChart } from "@hackoregon/component-library";

const SystemWideSummaryVisualization = ({ data }) => {
  const isLoading = !isLoaded(data.busSystemWideSummary);
  const [secondsLateSeries, setSecondsLateSeries] = useState(null);
  const [onsOffsSeries, setOnsOffsSeries] = useState(null);

  // creating a data series for seconds late percentiles
  useEffect(() => {
    if (!isLoading) {
      const fifthPercentileSeries = data.busSystemWideSummary.value.results.map(
        result => ({
          series: "5",
          arrive_quarter_hour: result.arrive_quarter_hour,
          seconds: result.p05_seconds_late
        })
      );

      const firstQuartileSeries = data.busSystemWideSummary.value.results.map(
        result => ({
          series: "25",
          arrive_quarter_hour: result.arrive_quarter_hour,
          seconds: result.q1_seconds_late
        })
      );

      const medianSeries = data.busSystemWideSummary.value.results.map(
        result => ({
          series: "50",
          arrive_quarter_hour: result.arrive_quarter_hour,
          seconds: result.median_seconds_late
        })
      );

      const thirdQuartileSeries = data.busSystemWideSummary.value.results.map(
        result => ({
          series: "75",
          arrive_quarter_hour: result.arrive_quarter_hour,
          seconds: result.q3_seconds_late
        })
      );

      const ninetyFifthPercentileSeries = data.busSystemWideSummary.value.results.map(
        result => ({
          series: "95",
          arrive_quarter_hour: result.arrive_quarter_hour,
          seconds: result.p95_seconds_late
        })
      );

      setSecondsLateSeries([
        ...fifthPercentileSeries,
        ...firstQuartileSeries,
        ...medianSeries,
        ...thirdQuartileSeries,
        ...ninetyFifthPercentileSeries
      ]);
    }
  }, [isLoading]); // eslint-disable-line

  // creating a data series for ons and offs separately and as totals
  useEffect(() => {
    if (!isLoading) {
      const onSeries = data.busSystemWideSummary.value.results.map(result => {
        return {
          series: "ons",
          arrive_quarter_hour: result.arrive_quarter_hour,
          count: result.total_ons
        };
      });

      const offSeries = data.busSystemWideSummary.value.results.map(result => {
        return {
          series: "offs",
          arrive_quarter_hour: result.arrive_quarter_hour,
          count: result.total_offs
        };
      });

      const totalSeries = data.busSystemWideSummary.value.results.map(
        result => {
          return {
            series: "ons_offs",
            arrive_quarter_hour: result.arrive_quarter_hour,
            count: result.total_ons + result.total_offs
          };
        }
      );

      setOnsOffsSeries([...onSeries, ...offSeries, ...totalSeries]);
    }
  }, [isLoading]); // eslint-disable-line

  return (
    <>
      {!isLoading && data && secondsLateSeries && onsOffsSeries ? (
        <>
          <LineChart
            data={onsOffsSeries}
            dataKey="arrive_quarter_hour"
            dataSeries="series"
            dataSeriesLabel={[
              { category: "ons", label: "Total Ons" },
              { category: "offs", label: "Total Offs" },
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
          {/*
              This line chart would display the breakdown of delay times by the major buckets we have
              it currently is NOT in the demo script so it is commented out. We may add it at the last minute.
              If not:
          */}
          {/* TODO: remove this chart */}
          {/* <LineChart */}
          {/*  data={secondsLateSeries} */}
          {/*  dataKey="arrive_quarter_hour" */}
          {/*  dataSeries="series" */}
          {/*  dataSeriesLabel={[ */}
          {/*    { category: "5", label: "Fifth Percentile" }, */}
          {/*    { category: "25", label: "First Quartile" }, */}
          {/*    { category: "50", label: "Median" }, */}
          {/*    { category: "75", label: "Third Quartile" }, */}
          {/*    { category: "95", label: "Ninety-Fifth Percentile" } */}
          {/*  ]} */}
          {/*  dataValue="seconds" */}
          {/*  title="System Wide Summary — Running Late" */}
          {/*  xLabel={"Quarter Hour"} */}
          {/*  xNumberFormatter={time => { */}
          {/*    return time */}
          {/*      ? `${Math.floor(time)}:${ */}
          {/*        (time % 1) * 60 === 0 ? "00" : (time % 1) * 60 */}
          {/*        }` */}
          {/*      : time; */}
          {/*  }} */}
          {/*  yLabel={"Seconds Late"} */}
          {/* /> */}
        </>
      ) : null}
    </>
  );
};

SystemWideSummaryVisualization.propTypes = {
  data: PropTypes.shape({ busSystemWideSummary: resourceShape })
};

export default SystemWideSummaryVisualization;
