import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import data from './data';

const formatter = value => {
  if (value < 1) {
    return (value * 100).toFixed(2);
  }
  if (value % 1 !== 0) {
    return value.toFixed(2);
  }
  return value;
};

const Scatterplot = () => (
  <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
        Response Time
        <br />
        vs. FMA Population
      </h4>
      <ResponsiveContainer aspect={1}>
        <ScatterChart>
          <XAxis dataKey={'fma_population_total'} name="Population" />
          <YAxis
            dataKey={'median_response_time'}
            name="Response Time"
            unit="min"
          />
          <ZAxis dataKey={'fma'} name="Fire Management Area" />
          <Scatter
            name="Response Time vs. FMA Population"
            data={data}
            fill="#D7075F"
          />
          <CartesianGrid />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={formatter} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
        Response Time
        <br />
        vs FMA Median Income
      </h4>
      <ResponsiveContainer aspect={1}>
        <ScatterChart>
          <XAxis
            dataKey={'median_hh_income'}
            name="Median HH Income"
            unit="$"
          />
          <YAxis
            dataKey={'median_response_time'}
            name="Response Time"
            unit="min"
          />
          <ZAxis dataKey={'fma'} name="Fire Management Area" />
          <Scatter
            name="Response Time vs FMA Median Income"
            data={data}
            fill="#D7075F"
          />
          <CartesianGrid />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={formatter} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
        Response Time
        <br />
        vs FMA % Non-White
      </h4>
      <ResponsiveContainer aspect={1}>
        <ScatterChart>
          <XAxis dataKey={'percent_non_white'} name="Non-White" unit="%" />
          <YAxis
            dataKey={'median_response_time'}
            name="Response Time"
            unit="min"
          />
          <ZAxis dataKey={'fma'} name="Fire Management Area" />
          <Scatter
            name="Response Time vs FMA % Non-White"
            data={data}
            fill="#D7075F"
          />
          <CartesianGrid />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={formatter} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
        Incidents Per Thousand
        <br />
        vs FMA Population
      </h4>
      <ResponsiveContainer aspect={1}>
        <ScatterChart>
          <XAxis dataKey={'fma_population_total'} name="Population" />
          <YAxis
            dataKey={'total_incidents_per_1000'}
            name="Incidents Per 1,000"
          />
          <ZAxis dataKey={'fma'} name="Fire Management Area" />
          <Scatter
            name="Incidents Per Thousand vs FMA Population"
            data={data}
            fill="#D7075F"
          />
          <CartesianGrid />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={formatter} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
        Incidents Per Thousand
        <br />
        vs FMA Median Income
      </h4>
      <ResponsiveContainer aspect={1}>
        <ScatterChart>
          <XAxis
            dataKey={'median_hh_income'}
            name="Median HH Income"
            unit="$"
          />
          <YAxis
            dataKey={'total_incidents_per_1000'}
            name="Incidents Per 1,000"
          />
          <ZAxis dataKey={'fma'} name="Fire Management Area" />
          <Scatter
            name="Incidents Per Thousand vs FMA Median Income"
            data={data}
            fill="#D7075F"
          />
          <CartesianGrid />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={formatter} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
        Incidents Per Thousand
        <br />
        vs FMA % Non-White
      </h4>
      <ResponsiveContainer aspect={1}>
        <ScatterChart>
          <XAxis dataKey={'percent_non_white'} name="Non-White" unit="%" />
          <YAxis
            dataKey={'total_incidents_per_1000'}
            name="Incidents Per 1,000"
          />
          <ZAxis dataKey={'fma'} name="Fire Management Area" />
          <Scatter
            name="Incidents Per Thousand vs FMA % Non-White"
            data={data}
            fill="#D7075F"
          />
          <CartesianGrid />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={formatter} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default Scatterplot;
