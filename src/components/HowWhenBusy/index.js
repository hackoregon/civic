import React, { PropTypes } from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';

// Average Daily Medical Incidents per Month, 2010-2016
const dataMonthMedical = [{
  name: 'Jan',
  'Average Daily Medical Incidents per Month, 2010-2016': 138.087,
}, {
  name: 'Feb',
  'Average Daily Medical Incidents per Month, 2010-2016': 140.253,
}, {
  name: 'Mar',
  'Average Daily Medical Incidents per Month, 2010-2016': 140.618,
}, {
  name: 'Apr',
  'Average Daily Medical Incidents per Month, 2010-2016': 142.067,
}, {
  name: 'May',
  'Average Daily Medical Incidents per Month, 2010-2016': 143.562,
}, {
  name: 'Jun',
  'Average Daily Medical Incidents per Month, 2010-2016': 147.424,
}, {
  name: 'Jul',
  'Average Daily Medical Incidents per Month, 2010-2016': 148.358,
}, {
  name: 'Aug',
  'Average Daily Medical Incidents per Month, 2010-2016': 150.530,
}, {
  name: 'Sep',
  'Average Daily Medical Incidents per Month, 2010-2016': 146.671,
}, {
  name: 'Oct',
  'Average Daily Medical Incidents per Month, 2010-2016': 144.207,
}, {
  name: 'Nov',
  'Average Daily Medical Incidents per Month, 2010-2016': 138.900,
}, {
  name: 'Dec',
  'Average Daily Medical Incidents per Month, 2010-2016': 145.069,
}];

// Average Daily Fire Incidents per Month, 2010-2016
const dataMonthFire = [{
  name: 'Jan',
  'Average Daily Fire Incidents per Month, 2010-2016': 3.930,
}, {
  name: 'Feb',
  'Average Daily Fire Incidents per Month, 2010-2016': 4.295,
}, {
  name: 'Mar',
  'Average Daily Fire Incidents per Month, 2010-2016': 4.053,
}, {
  name: 'Apr',
  'Average Daily Fire Incidents per Month, 2010-2016': 4.626,
}, {
  name: 'May',
  'Average Daily Fire Incidents per Month, 2010-2016': 6.488,
}, {
  name: 'Jun',
  'Average Daily Fire Incidents per Month, 2010-2016': 8.433,
}, {
  name: 'Jul',
  'Average Daily Fire Incidents per Month, 2010-2016': 12.493,
}, {
  name: 'Aug',
  'Average Daily Fire Incidents per Month, 2010-2016': 12.731,
}, {
  name: 'Sep',
  'Average Daily Fire Incidents per Month, 2010-2016': 7.985,
}, {
  name: 'Oct',
  'Average Daily Fire Incidents per Month, 2010-2016': 5.327,
}, {
  name: 'Nov',
  'Average Daily Fire Incidents per Month, 2010-2016': 4.493,
}, {
  name: 'Dec',
  'Average Daily Fire Incidents per Month, 2010-2016': 4.072,
}];

// Average Daily False Alarms per Month, 2010-2016
const dataMonthFalse = [{
  name: 'Jan',
  'Average Daily False Alarms per Month, 2010-2016': 22.747,
}, {
  name: 'Feb',
  'Average Daily False Alarms per Month, 2010-2016': 22.707,
}, {
  name: 'Mar',
  'Average Daily False Alarms per Month, 2010-2016': 22.304,
}, {
  name: 'Apr',
  'Average Daily False Alarms per Month, 2010-2016': 22.462,
}, {
  name: 'May',
  'Average Daily False Alarms per Month, 2010-2016': 23.618,
}, {
  name: 'Jun',
  'Average Daily False Alarms per Month, 2010-2016': 25.510,
}, {
  name: 'Jul',
  'Average Daily False Alarms per Month, 2010-2016': 26.880,
}, {
  name: 'Aug',
  'Average Daily False Alarms per Month, 2010-2016': 27.889,
}, {
  name: 'Sep',
  'Average Daily False Alarms per Month, 2010-2016': 28.176,
}, {
  name: 'Oct',
  'Average Daily False Alarms per Month, 2010-2016': 26.774,
}, {
  name: 'Nov',
  'Average Daily False Alarms per Month, 2010-2016': 25.500,
}, {
  name: 'Dec',
  'Average Daily False Alarms per Month, 2010-2016': 26.051,
}];

// Average Medical Incidents per Hour, 2010-2016
const dataHourMedical = [{
  name: '12am',
  'Average Medical Incidents per Hour, 2010-2016': 4.791,
}, {
  name: '1am',
  'Average Medical Incidents per Hour, 2010-2016': 4.471,
}, {
  name: '2am',
  'Average Medical Incidents per Hour, 2010-2016': 4.142,
}, {
  name: '3am',
  'Average Medical Incidents per Hour, 2010-2016': 3.406,
}, {
  name: '4am',
  'Average Medical Incidents per Hour, 2010-2016': 2.970,
}, {
  name: '5am',
  'Average Medical Incidents per Hour, 2010-2016': 3.019,
}, {
  name: '6am',
  'Average Medical Incidents per Hour, 2010-2016': 3.399,
}, {
  name: '7am',
  'Average Medical Incidents per Hour, 2010-2016': 4.473,
}, {
  name: '8am',
  'Average Medical Incidents per Hour, 2010-2016': 5.616,
}, {
  name: '9am',
  'Average Medical Incidents per Hour, 2010-2016': 6.467,
}, {
  name: '10am',
  'Average Medical Incidents per Hour, 2010-2016': 6.970,
}, {
  name: '11am',
  'Average Medical Incidents per Hour, 2010-2016': 7.370,
}, {
  name: '12pm',
  'Average Medical Incidents per Hour, 2010-2016': 7.537,
}, {
  name: '1pm',
  'Average Medical Incidents per Hour, 2010-2016': 7.729,
}, {
  name: '2pm',
  'Average Medical Incidents per Hour, 2010-2016': 7.669,
}, {
  name: '3pm',
  'Average Medical Incidents per Hour, 2010-2016': 7.675,
}, {
  name: '4pm',
  'Average Medical Incidents per Hour, 2010-2016': 7.733,
}, {
  name: '5pm',
  'Average Medical Incidents per Hour, 2010-2016': 8.051,
}, {
  name: '6pm',
  'Average Medical Incidents per Hour, 2010-2016': 7.882,
}, {
  name: '7pm',
  'Average Medical Incidents per Hour, 2010-2016': 7.356,
}, {
  name: '8pm',
  'Average Medical Incidents per Hour, 2010-2016': 7.112,
}, {
  name: '9pm',
  'Average Medical Incidents per Hour, 2010-2016': 6.688,
}, {
  name: '10pm',
  'Average Medical Incidents per Hour, 2010-2016': 6.000,
}, {
  name: '11pm',
  'Average Medical Incidents per Hour, 2010-2016': 5.427,
}];


// Average Fire Incidents per Hour, 2010-2016
const dataHourFire = [{
  name: '12am',
  'Average Fire Incidents per Hour, 2010-2016': 0.208,
}, {
  name: '1am',
  'Average Fire Incidents per Hour, 2010-2016': 0.171,
}, {
  name: '2am',
  'Average Fire Incidents per Hour, 2010-2016': 0.171,
}, {
  name: '3am',
  'Average Fire Incidents per Hour, 2010-2016': 0.169,
}, {
  name: '4am',
  'Average Fire Incidents per Hour, 2010-2016': 0.161,
}, {
  name: '5am',
  'Average Fire Incidents per Hour, 2010-2016': 0.180,
}, {
  name: '6am',
  'Average Fire Incidents per Hour, 2010-2016': 0.226,
}, {
  name: '7am',
  'Average Fire Incidents per Hour, 2010-2016': 0.246,
}, {
  name: '8am',
  'Average Fire Incidents per Hour, 2010-2016': 0.240,
}, {
  name: '9am',
  'Average Fire Incidents per Hour, 2010-2016': 0.248,
}, {
  name: '10am',
  'Average Fire Incidents per Hour, 2010-2016': 0.246,
}, {
  name: '11am',
  'Average Fire Incidents per Hour, 2010-2016': 0.256,
}, {
  name: '12pm',
  'Average Fire Incidents per Hour, 2010-2016': 0.302,
}, {
  name: '1pm',
  'Average Fire Incidents per Hour, 2010-2016': 0.313,
}, {
  name: '2pm',
  'Average Fire Incidents per Hour, 2010-2016': 0.357,
}, {
  name: '3pm',
  'Average Fire Incidents per Hour, 2010-2016': 0.360,
}, {
  name: '4pm',
  'Average Fire Incidents per Hour, 2010-2016': 0.385,
}, {
  name: '5pm',
  'Average Fire Incidents per Hour, 2010-2016': 0.418,
}, {
  name: '6pm',
  'Average Fire Incidents per Hour, 2010-2016': 0.382,
}, {
  name: '7pm',
  'Average Fire Incidents per Hour, 2010-2016': 0.372,
}, {
  name: '8pm',
  'Average Fire Incidents per Hour, 2010-2016': 0.304,
}, {
  name: '9pm',
  'Average Fire Incidents per Hour, 2010-2016': 0.291,
}, {
  name: '10pm',
  'Average Fire Incidents per Hour, 2010-2016': 0.268,
}, {
  name: '11pm',
  'Average Fire Incidents per Hour, 2010-2016': 0.230,
}];

// Average False Alarms per Hour, 2010-2016
const dataHourFalse = [{
  name: '12am',
  'Average False Alarms per Hour, 2010-2016': 0.728,
}, {
  name: '1am',
  'Average False Alarms per Hour, 2010-2016': 0.619,
}, {
  name: '2am',
  'Average False Alarms per Hour, 2010-2016': 0.540,
}, {
  name: '3am',
  'Average False Alarms per Hour, 2010-2016': 0.510,
}, {
  name: '4am',
  'Average False Alarms per Hour, 2010-2016': 0.428,
}, {
  name: '5am',
  'Average False Alarms per Hour, 2010-2016': 0.528,
}, {
  name: '6am',
  'Average False Alarms per Hour, 2010-2016': 0.651,
}, {
  name: '7am',
  'Average False Alarms per Hour, 2010-2016': 0.881,
}, {
  name: '8am',
  'Average False Alarms per Hour, 2010-2016': 1.085,
}, {
  name: '9am',
  'Average False Alarms per Hour, 2010-2016': 1.278,
}, {
  name: '10am',
  'Average False Alarms per Hour, 2010-2016': 1.338,
}, {
  name: '11am',
  'Average False Alarms per Hour, 2010-2016': 1.376,
}, {
  name: '12pm',
  'Average False Alarms per Hour, 2010-2016': 1.376,
}, {
  name: '1pm',
  'Average False Alarms per Hour, 2010-2016': 1.429,
}, {
  name: '2pm',
  'Average False Alarms per Hour, 2010-2016': 1.429,
}, {
  name: '3pm',
  'Average False Alarms per Hour, 2010-2016': 1.415,
}, {
  name: '4pm',
  'Average False Alarms per Hour, 2010-2016': 1.308,
}, {
  name: '5pm',
  'Average False Alarms per Hour, 2010-2016': 1.419,
}, {
  name: '6pm',
  'Average False Alarms per Hour, 2010-2016': 1.360,
}, {
  name: '7pm',
  'Average False Alarms per Hour, 2010-2016': 1.288,
}, {
  name: '8pm',
  'Average False Alarms per Hour, 2010-2016': 1.185,
}, {
  name: '9pm',
  'Average False Alarms per Hour, 2010-2016': 1.098,
}, {
  name: '10pm',
  'Average False Alarms per Hour, 2010-2016': 0.974,
}, {
  name: '11pm',
  'Average False Alarms per Hour, 2010-2016': 0.824,
}];

const ErBarChart = () =>
  <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f' }}>
        Average Daily Medical Incidents per Month
      </h4>
      <ResponsiveContainer aspect="1">
        <BarChart layout="horizontal" data={dataMonthMedical}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Average Daily Medical Incidents per Month, 2010-2016" fill="#D7075F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f' }}>
        Average Daily Fire Incidents per Month
      </h4>
      <ResponsiveContainer aspect="1">
        <BarChart layout="horizontal" data={dataMonthFire}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Average Daily Fire Incidents per Month, 2010-2016" fill="#e34d77" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f' }}>
        Average Daily False Alarms per Month
      </h4>
      <ResponsiveContainer aspect="1">
        <BarChart layout="horizontal" data={dataMonthFalse}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Average Daily False Alarms per Month, 2010-2016" fill="#ed7690" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f' }}>
        Average Medical Incidents per Hour
      </h4>
      <ResponsiveContainer aspect="1">
        <BarChart layout="horizontal" data={dataHourMedical}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Average Medical Incidents per Hour, 2010-2016" fill="#D7075F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f' }}>
        Average Fire Incidents per Hour
      </h4>
      <ResponsiveContainer aspect="1">
        <BarChart layout="horizontal" data={dataHourFire}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Average Fire Incidents per Hour, 2010-2016" fill="#e34d77" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f' }}>
        Average False Alarms per Hour
      </h4>
      <ResponsiveContainer aspect="1">
        <BarChart layout="horizontal" data={dataHourFalse}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Average False Alarms per Hour, 2010-2016" fill="#ed7690" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>;

ErBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default ErBarChart;
