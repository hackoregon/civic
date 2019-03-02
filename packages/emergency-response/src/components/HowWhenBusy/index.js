import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from 'recharts';

// Average Daily Medical Incidents per Month, 2010-2016
const dataMonthMedical = [
  {
    name: 'Jan',
    Incidents: 138.087,
  },
  {
    name: 'Feb',
    Incidents: 140.253,
  },
  {
    name: 'Mar',
    Incidents: 140.618,
  },
  {
    name: 'Apr',
    Incidents: 142.067,
  },
  {
    name: 'May',
    Incidents: 143.562,
  },
  {
    name: 'Jun',
    Incidents: 147.424,
  },
  {
    name: 'Jul',
    Incidents: 148.358,
  },
  {
    name: 'Aug',
    Incidents: 150.53,
  },
  {
    name: 'Sep',
    Incidents: 146.671,
  },
  {
    name: 'Oct',
    Incidents: 144.207,
  },
  {
    name: 'Nov',
    Incidents: 138.9,
  },
  {
    name: 'Dec',
    Incidents: 145.069,
  },
];

// Average Daily Fire Incidents per Month, 2010-2016
const dataMonthFire = [
  {
    name: 'Jan',
    Incidents: 3.93,
  },
  {
    name: 'Feb',
    Incidents: 4.295,
  },
  {
    name: 'Mar',
    Incidents: 4.053,
  },
  {
    name: 'Apr',
    Incidents: 4.626,
  },
  {
    name: 'May',
    Incidents: 6.488,
  },
  {
    name: 'Jun',
    Incidents: 8.433,
  },
  {
    name: 'Jul',
    Incidents: 12.493,
  },
  {
    name: 'Aug',
    Incidents: 12.731,
  },
  {
    name: 'Sep',
    Incidents: 7.985,
  },
  {
    name: 'Oct',
    Incidents: 5.327,
  },
  {
    name: 'Nov',
    Incidents: 4.493,
  },
  {
    name: 'Dec',
    Incidents: 4.072,
  },
];

// Average Daily False Alarms per Month, 2010-2016
const dataMonthFalse = [
  {
    name: 'Jan',
    Incidents: 22.747,
  },
  {
    name: 'Feb',
    Incidents: 22.707,
  },
  {
    name: 'Mar',
    Incidents: 22.304,
  },
  {
    name: 'Apr',
    Incidents: 22.462,
  },
  {
    name: 'May',
    Incidents: 23.618,
  },
  {
    name: 'Jun',
    Incidents: 25.51,
  },
  {
    name: 'Jul',
    Incidents: 26.88,
  },
  {
    name: 'Aug',
    Incidents: 27.889,
  },
  {
    name: 'Sep',
    Incidents: 28.176,
  },
  {
    name: 'Oct',
    Incidents: 26.774,
  },
  {
    name: 'Nov',
    Incidents: 25.5,
  },
  {
    name: 'Dec',
    Incidents: 26.051,
  },
];

// Average Medical Incidents per Hour, 2010-2016
const dataHourMedical = [
  {
    name: '12am',
    Incidents: 4.791,
  },
  {
    name: '1am',
    Incidents: 4.471,
  },
  {
    name: '2am',
    Incidents: 4.142,
  },
  {
    name: '3am',
    Incidents: 3.406,
  },
  {
    name: '4am',
    Incidents: 2.97,
  },
  {
    name: '5am',
    Incidents: 3.019,
  },
  {
    name: '6am',
    Incidents: 3.399,
  },
  {
    name: '7am',
    Incidents: 4.473,
  },
  {
    name: '8am',
    Incidents: 5.616,
  },
  {
    name: '9am',
    Incidents: 6.467,
  },
  {
    name: '10am',
    Incidents: 6.97,
  },
  {
    name: '11am',
    Incidents: 7.37,
  },
  {
    name: '12pm',
    Incidents: 7.537,
  },
  {
    name: '1pm',
    Incidents: 7.729,
  },
  {
    name: '2pm',
    Incidents: 7.669,
  },
  {
    name: '3pm',
    Incidents: 7.675,
  },
  {
    name: '4pm',
    Incidents: 7.733,
  },
  {
    name: '5pm',
    Incidents: 8.051,
  },
  {
    name: '6pm',
    Incidents: 7.882,
  },
  {
    name: '7pm',
    Incidents: 7.356,
  },
  {
    name: '8pm',
    Incidents: 7.112,
  },
  {
    name: '9pm',
    Incidents: 6.688,
  },
  {
    name: '10pm',
    Incidents: 6.0,
  },
  {
    name: '11pm',
    Incidents: 5.427,
  },
];

// Average Fire Incidents per Hour, 2010-2016
const dataHourFire = [
  {
    name: '12am',
    Incidents: 0.208,
  },
  {
    name: '1am',
    Incidents: 0.171,
  },
  {
    name: '2am',
    Incidents: 0.171,
  },
  {
    name: '3am',
    Incidents: 0.169,
  },
  {
    name: '4am',
    Incidents: 0.161,
  },
  {
    name: '5am',
    Incidents: 0.18,
  },
  {
    name: '6am',
    Incidents: 0.226,
  },
  {
    name: '7am',
    Incidents: 0.246,
  },
  {
    name: '8am',
    Incidents: 0.24,
  },
  {
    name: '9am',
    Incidents: 0.248,
  },
  {
    name: '10am',
    Incidents: 0.246,
  },
  {
    name: '11am',
    Incidents: 0.256,
  },
  {
    name: '12pm',
    Incidents: 0.302,
  },
  {
    name: '1pm',
    Incidents: 0.313,
  },
  {
    name: '2pm',
    Incidents: 0.357,
  },
  {
    name: '3pm',
    Incidents: 0.36,
  },
  {
    name: '4pm',
    Incidents: 0.385,
  },
  {
    name: '5pm',
    Incidents: 0.418,
  },
  {
    name: '6pm',
    Incidents: 0.382,
  },
  {
    name: '7pm',
    Incidents: 0.372,
  },
  {
    name: '8pm',
    Incidents: 0.304,
  },
  {
    name: '9pm',
    Incidents: 0.291,
  },
  {
    name: '10pm',
    Incidents: 0.268,
  },
  {
    name: '11pm',
    Incidents: 0.23,
  },
];

// Average False Alarms per Hour, 2010-2016
const dataHourFalse = [
  {
    name: '12am',
    Incidents: 0.728,
  },
  {
    name: '1am',
    Incidents: 0.619,
  },
  {
    name: '2am',
    Incidents: 0.54,
  },
  {
    name: '3am',
    Incidents: 0.51,
  },
  {
    name: '4am',
    Incidents: 0.428,
  },
  {
    name: '5am',
    Incidents: 0.528,
  },
  {
    name: '6am',
    Incidents: 0.651,
  },
  {
    name: '7am',
    Incidents: 0.881,
  },
  {
    name: '8am',
    Incidents: 1.085,
  },
  {
    name: '9am',
    Incidents: 1.278,
  },
  {
    name: '10am',
    Incidents: 1.338,
  },
  {
    name: '11am',
    Incidents: 1.376,
  },
  {
    name: '12pm',
    Incidents: 1.376,
  },
  {
    name: '1pm',
    Incidents: 1.429,
  },
  {
    name: '2pm',
    Incidents: 1.429,
  },
  {
    name: '3pm',
    Incidents: 1.415,
  },
  {
    name: '4pm',
    Incidents: 1.308,
  },
  {
    name: '5pm',
    Incidents: 1.419,
  },
  {
    name: '6pm',
    Incidents: 1.36,
  },
  {
    name: '7pm',
    Incidents: 1.288,
  },
  {
    name: '8pm',
    Incidents: 1.185,
  },
  {
    name: '9pm',
    Incidents: 1.098,
  },
  {
    name: '10pm',
    Incidents: 0.974,
  },
  {
    name: '11pm',
    Incidents: 0.824,
  },
];

const ErBarChart = () => (
  <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
        Average Daily Medical Incidents
        <br />
        per Month
      </h4>
      <ResponsiveContainer aspect={1}>
        <BarChart layout="horizontal" data={dataMonthMedical}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Incidents" fill="#D7075F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
        Average Daily Fire Incidents
        <br />
        per Month
      </h4>
      <ResponsiveContainer aspect={1}>
        <BarChart layout="horizontal" data={dataMonthFire}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Incidents" fill="#e34d77" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
        Average Daily False Alarms
        <br />
        per Month
      </h4>
      <ResponsiveContainer aspect={1}>
        <BarChart layout="horizontal" data={dataMonthFalse}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Incidents" fill="#ed7690" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
        Average Medical Incidents
        <br />
        per Hour
      </h4>
      <ResponsiveContainer aspect={1}>
        <BarChart layout="horizontal" data={dataHourMedical}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Incidents" fill="#D7075F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
        Average Fire Incidents
        <br />
        per Hour
      </h4>
      <ResponsiveContainer aspect={1}>
        <BarChart layout="horizontal" data={dataHourFire}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Incidents" fill="#e34d77" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: '33.333%' }}>
      <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
        Average False Alarms
        <br />
        per Hour
      </h4>
      <ResponsiveContainer aspect={1}>
        <BarChart layout="horizontal" data={dataHourFalse}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Incidents" fill="#ed7690" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

ErBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default ErBarChart;
