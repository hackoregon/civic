import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { LineChart } from "@hackoregon/component-library";
import { DataContext } from "./index";

export default () => {
  const data = useContext(DataContext);
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    const stops2017 = [
      ...data.features.filter(feature => feature.properties.year === 2017)
    ];
    const stops2018 = [
      ...data.features.filter(feature => feature.properties.year === 2018)
    ];

    const lineChartData2017 = stops2017.reduce((acc, stop) => {
      const startQuarterHour = `${stop.properties.start_quarter_hour}`;
      const accumulatedDuration =
        (acc[startQuarterHour] || 0) +
        moment.duration(stop.properties.duration).asSeconds();
      return {
        ...acc,
        [startQuarterHour]: accumulatedDuration
      };
    }, {});

    const lineChartData2018 = stops2018.reduce((acc, stop) => {
      const startQuarterHour = `${stop.properties.start_quarter_hour}`;
      const accumulatedDuration =
        (acc[startQuarterHour] || 0) +
        moment.duration(stop.properties.duration).asSeconds();
      return {
        ...acc,
        [startQuarterHour]: accumulatedDuration
      };
    }, {});

    const theLineChartData = [
      ...Object.entries(lineChartData2017).map(entry => ({
        series: "2017",
        start_quarter_hour: parseFloat(entry[0]),
        total_duration: entry[1]
      })),
      ...Object.entries(lineChartData2018).map(entry => ({
        series: "2018",
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
          { category: "2017", label: "2017" },
          { category: "2018", label: "2018" }
        ]}
        loading={!data.loaded}
        subtitle="Accumulated weekday disturbance stop duration from all buses, Sept. - Nov."
        title="Total Disturbance Stop Duration"
        xLabel="Quarter hour"
        yLabel="Duration (seconds)"
        xNumberFormatter={time => {
          return time
            ? `${Math.floor(time)}:${
                (time % 1) * 60 === 0 ? "00" : (time % 1) * 60
              } am`
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
