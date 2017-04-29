import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import data from './data';

const Scatterplot = () => (
  <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
    <ResponsiveContainer width="33.333%" aspect="1">
      <ScatterChart>
        <XAxis dataKey={'fma_population_total'} name="Population" />
        <YAxis dataKey={'median_response_time'} name="Response Time" unit="min" />
        <ZAxis dataKey={'fma'} name="Fire Management Area" />
        <Scatter name="Response Time vs. FMA Population" data={data} fill="#D7075F" />
        <CartesianGrid />
        <Legend />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      </ScatterChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="33.333%" aspect="1">
      <ScatterChart>
        <XAxis dataKey={'median_hh_income'} name="Median Household Income" unit="$" />
        <YAxis dataKey={'median_response_time'} name="Response Time" unit="min" />
        <ZAxis dataKey={'fma'} name="Fire Management Area" />
        <Scatter name="Response Time vs FMA Median Income" data={data} fill="#D7075F" />
        <CartesianGrid />
        <Legend />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      </ScatterChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="33.333%" aspect="1">
      <ScatterChart>
        <XAxis dataKey={'percent_non_white'} name="Non-White" unit="%" />
        <YAxis dataKey={'median_response_time'} name="Response Time" unit="min" />
        <ZAxis dataKey={'fma'} name="Fire Management Area" />
        <Scatter name="Response Time vs FMA % Non-White" data={data} fill="#D7075F" />
        <CartesianGrid />
        <Legend />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      </ScatterChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="33.333%" aspect="1">
      <ScatterChart>
        <XAxis dataKey={'fma_population_total'} name="Population" />
        <YAxis dataKey={'total_incidents_per_1000'} name="Incidents Per Thousand" />
        <ZAxis dataKey={'fma'} name="Fire Management Area" />
        <Scatter name="Incidents Per Thousand vs FMA Population" data={data} fill="#D7075F" />
        <CartesianGrid />
        <Legend />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      </ScatterChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="33.333%" aspect="1">
      <ScatterChart>
        <XAxis dataKey={'median_hh_income'} name="Median Household Income" unit="$" />
        <YAxis dataKey={'total_incidents_per_1000'} name="Incidents Per Thousand" />
        <ZAxis dataKey={'fma'} name="Fire Management Area" />
        <Scatter name="Incidents Per Thousand vs FMA Median Income" data={data} fill="#D7075F" />
        <CartesianGrid />
        <Legend />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      </ScatterChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="33.333%" aspect="1">
      <ScatterChart>
        <XAxis dataKey={'percent_non_white'} name="Non-White" unit="%" />
        <YAxis dataKey={'total_incidents_per_1000'} name="Incidents Per Thousand" />
        <ZAxis dataKey={'fma'} name="Fire Management Area" />
        <Scatter name="Incidents Per Thousand vs FMA % Non-White" data={data} fill="#D7075F" />
        <CartesianGrid />
        <Legend />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      </ScatterChart>
    </ResponsiveContainer>
  </div>
);

export default Scatterplot;
