import React, { useEffect, useState, useContext } from "react";
import { LineChart } from "@hackoregon/component-library";
import durationStringToSeconds from "../../utils/duration-parser";
import { SouthwestMadisonContext } from "./index";

export default () => {
  const data = useContext(SouthwestMadisonContext);
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    const stops2018 = [
      ...data.features.filter(feature => feature.properties.year === 2018)
    ];
    const stops2019 = [
      ...data.features.filter(feature => feature.properties.year === 2019)
    ];

    const lineChartData2018 = stops2018.reduce((acc, stop) => {
      const startQuarterHour = `${stop.properties.start_quarter_hour}`;
      const accumulatedDuration =
        (acc[startQuarterHour] || 0) +
        durationStringToSeconds(stop.properties.duration);
      return {
        ...acc,
        [startQuarterHour]: accumulatedDuration
      };
    }, {});

    const lineChartData2019 = stops2019.reduce((acc, stop) => {
      const startQuarterHour = `${stop.properties.start_quarter_hour}`;
      const accumulatedDuration =
        (acc[startQuarterHour] || 0) +
        durationStringToSeconds(stop.properties.duration);
      return {
        ...acc,
        [startQuarterHour]: accumulatedDuration
      };
    }, {});

    const theLineChartData = [
      ...Object.entries(lineChartData2018).map(entry => ({
        series: "2018",
        start_quarter_hour: parseFloat(entry[0]),
        total_duration: entry[1]
      })),
      ...Object.entries(lineChartData2019).map(entry => ({
        series: "2019",
        start_quarter_hour: parseFloat(entry[0]),
        total_duration: entry[1]
      }))
    ];

    setLineChartData(theLineChartData);
  }, [data.loaded]); // eslint-disable-line

  return (
    <>
      <LineChart
        data={!data.loaded && lineChartData.length ? [{}] : lineChartData}
        dataKey="start_quarter_hour"
        dataValue="total_duration"
        dataSeries="series"
        dataSeriesLabel={[
          { category: "2018", label: "2018" },
          { category: "2019", label: "2019" }
        ]}
        loading={!data.loaded}
        subtitle="Accumulated weekday disturbance stop duration from all buses, May, July."
        title="Total Disturbance Stop Duration"
        xLabel="Quarter hour"
        yLabel="Duration (seconds)"
        xNumberFormatter={time => {
          return time
            ? `${Math.floor(time)}:${
                (time % 1) * 60 === 0 ? "00" : (time % 1) * 60
              }`
            : time;
        }}
        yNumberFormatter={duration => {
          return typeof duration === "number"
            ? duration.toLocaleString()
            : duration;
        }}
      />
    </>
  );
};
