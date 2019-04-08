import React from 'react'

import { get } from 'lodash'
import { BarChart, civicFormat } from '@hackoregon/component-library'

// Average Daily Medical Incidents per Month, 2010-2016
const dataMonthMedical = [
    {
        order: 1,
        name: 'Jan',
        Incidents: 138.087,
    },
    {
        order: 2,
        name: 'Feb',
        Incidents: 140.253,
    },
    {
        order: 3,
        name: 'Mar',
        Incidents: 140.618,
    },
    {
        order: 4,
        name: 'Apr',
        Incidents: 142.067,
    },
    {
        order: 5,
        name: 'May',
        Incidents: 143.562,
    },
    {
        order: 6,
        name: 'Jun',
        Incidents: 147.424,
    },
    {
        order: 7,
        name: 'Jul',
        Incidents: 148.358,
    },
    {
        order: 8,
        name: 'Aug',
        Incidents: 150.53,
    },
    {
        order: 9,
        name: 'Sep',
        Incidents: 146.671,
    },
    {
        order: 10,
        name: 'Oct',
        Incidents: 144.207,
    },
    {
        order: 11,
        name: 'Nov',
        Incidents: 138.9,
    },
    {
        order: 12,
        name: 'Dec',
        Incidents: 145.069,
    },
]

// Average Daily Fire Incidents per Month, 2010-2016
const dataMonthFire = [
    {
        order: 1,
        name: 'Jan',
        Incidents: 3.93,
    },
    {
        order: 2,
        name: 'Feb',
        Incidents: 4.295,
    },
    {
        order: 3,
        name: 'Mar',
        Incidents: 4.053,
    },
    {
        order: 4,
        name: 'Apr',
        Incidents: 4.626,
    },
    {
        order: 5,
        name: 'May',
        Incidents: 6.488,
    },
    {
        order: 6,
        name: 'Jun',
        Incidents: 8.433,
    },
    {
        order: 7,
        name: 'Jul',
        Incidents: 12.493,
    },
    {
        order: 8,
        name: 'Aug',
        Incidents: 12.731,
    },
    {
        order: 9,
        name: 'Sep',
        Incidents: 7.985,
    },
    {
        order: 10,
        name: 'Oct',
        Incidents: 5.327,
    },
    {
        order: 11,
        name: 'Nov',
        Incidents: 4.493,
    },
    {
        order: 12,
        name: 'Dec',
        Incidents: 4.072,
    },
]

// Average Daily False Alarms per Month, 2010-2016
const dataMonthFalse = [
    {
        order: 1,
        name: 'Jan',
        Incidents: 22.747,
    },
    {
        order: 2,
        name: 'Feb',
        Incidents: 22.707,
    },
    {
        order: 3,
        name: 'Mar',
        Incidents: 22.304,
    },
    {
        order: 4,
        name: 'Apr',
        Incidents: 22.462,
    },
    {
        order: 5,
        name: 'May',
        Incidents: 23.618,
    },
    {
        order: 6,
        name: 'Jun',
        Incidents: 25.51,
    },
    {
        order: 7,
        name: 'Jul',
        Incidents: 26.88,
    },
    {
        order: 8,
        name: 'Aug',
        Incidents: 27.889,
    },
    {
        order: 9,
        name: 'Sep',
        Incidents: 28.176,
    },
    {
        order: 10,
        name: 'Oct',
        Incidents: 26.774,
    },
    {
        order: 11,
        name: 'Nov',
        Incidents: 25.5,
    },
    {
        order: 12,
        name: 'Dec',
        Incidents: 26.051,
    },
]

// Average Medical Incidents per Hour, 2010-2016
const dataHourMedical = [
    {
        order: 1,
        name: '12am',
        Incidents: 4.791,
    },
    {
        order: 2,
        name: '1am',
        Incidents: 4.471,
    },
    {
        order: 3,
        name: '2am',
        Incidents: 4.142,
    },
    {
        order: 4,
        name: '3am',
        Incidents: 3.406,
    },
    {
        order: 5,
        name: '4am',
        Incidents: 2.97,
    },
    {
        order: 6,
        name: '5am',
        Incidents: 3.019,
    },
    {
        order: 7,
        name: '6am',
        Incidents: 3.399,
    },
    {
        order: 8,
        name: '7am',
        Incidents: 4.473,
    },
    {
        order: 9,
        name: '8am',
        Incidents: 5.616,
    },
    {
        order: 10,
        name: '9am',
        Incidents: 6.467,
    },
    {
        order: 11,
        name: '10am',
        Incidents: 6.97,
    },
    {
        order: 12,
        name: '11am',
        Incidents: 7.37,
    },
    {
        order: 13,
        name: '12pm',
        Incidents: 7.537,
    },
    {
        order: 14,
        name: '1pm',
        Incidents: 7.729,
    },
    {
        order: 15,
        name: '2pm',
        Incidents: 7.669,
    },
    {
        order: 16,
        name: '3pm',
        Incidents: 7.675,
    },
    {
        order: 17,
        name: '4pm',
        Incidents: 7.733,
    },
    {
        order: 18,
        name: '5pm',
        Incidents: 8.051,
    },
    {
        order: 19,
        name: '6pm',
        Incidents: 7.882,
    },
    {
        order: 20,
        name: '7pm',
        Incidents: 7.356,
    },
    {
        order: 21,
        name: '8pm',
        Incidents: 7.112,
    },
    {
        order: 22,
        name: '9pm',
        Incidents: 6.688,
    },
    {
        order: 23,
        name: '10pm',
        Incidents: 6.0,
    },
    {
        order: 24,
        name: '11pm',
        Incidents: 5.427,
    },
]

// Average Fire Incidents per Hour, 2010-2016
const dataHourFire = [
    {
        order: 1,
        name: '12am',
        Incidents: 0.208,
    },
    {
        order: 2,
        name: '1am',
        Incidents: 0.171,
    },
    {
        order: 3,
        name: '2am',
        Incidents: 0.171,
    },
    {
        order: 4,
        name: '3am',
        Incidents: 0.169,
    },
    {
        order: 5,
        name: '4am',
        Incidents: 0.161,
    },
    {
        order: 6,
        name: '5am',
        Incidents: 0.18,
    },
    {
        order: 7,
        name: '6am',
        Incidents: 0.226,
    },
    {
        order: 8,
        name: '7am',
        Incidents: 0.246,
    },
    {
        order: 9,
        name: '8am',
        Incidents: 0.24,
    },
    {
        order: 10,
        name: '9am',
        Incidents: 0.248,
    },
    {
        order: 11,
        name: '10am',
        Incidents: 0.246,
    },
    {
        order: 12,
        name: '11am',
        Incidents: 0.256,
    },
    {
        order: 13,
        name: '12pm',
        Incidents: 0.302,
    },
    {
        order: 14,
        name: '1pm',
        Incidents: 0.313,
    },
    {
        order: 15,
        name: '2pm',
        Incidents: 0.357,
    },
    {
        order: 16,
        name: '3pm',
        Incidents: 0.36,
    },
    {
        order: 17,
        name: '4pm',
        Incidents: 0.385,
    },
    {
        order: 18,
        name: '5pm',
        Incidents: 0.418,
    },
    {
        order: 19,
        name: '6pm',
        Incidents: 0.382,
    },
    {
        order: 20,
        name: '7pm',
        Incidents: 0.372,
    },
    {
        order: 21,
        name: '8pm',
        Incidents: 0.304,
    },
    {
        order: 22,
        name: '9pm',
        Incidents: 0.291,
    },
    {
        order: 23,
        name: '10pm',
        Incidents: 0.268,
    },
    {
        order: 24,
        name: '11pm',
        Incidents: 0.23,
    },
]

// Average False Alarms per Hour, 2010-2016
const dataHourFalse = [
    {
        order: 1,
        name: '12am',
        Incidents: 0.728,
    },
    {
        order: 2,
        name: '1am',
        Incidents: 0.619,
    },
    {
        order: 3,
        name: '2am',
        Incidents: 0.54,
    },
    {
        order: 4,
        name: '3am',
        Incidents: 0.51,
    },
    {
        order: 5,
        name: '4am',
        Incidents: 0.428,
    },
    {
        order: 6,
        name: '5am',
        Incidents: 0.528,
    },
    {
        order: 7,
        name: '6am',
        Incidents: 0.651,
    },
    {
        order: 8,
        name: '7am',
        Incidents: 0.881,
    },
    {
        order: 9,
        name: '8am',
        Incidents: 1.085,
    },
    {
        order: 10,
        name: '9am',
        Incidents: 1.278,
    },
    {
        order: 11,
        name: '10am',
        Incidents: 1.338,
    },
    {
        order: 12,
        name: '11am',
        Incidents: 1.376,
    },
    {
        order: 13,
        name: '12pm',
        Incidents: 1.376,
    },
    {
        order: 14,
        name: '1pm',
        Incidents: 1.429,
    },
    {
        order: 15,
        name: '2pm',
        Incidents: 1.429,
    },
    {
        order: 16,
        name: '3pm',
        Incidents: 1.415,
    },
    {
        order: 17,
        name: '4pm',
        Incidents: 1.308,
    },
    {
        order: 18,
        name: '5pm',
        Incidents: 1.419,
    },
    {
        order: 19,
        name: '6pm',
        Incidents: 1.36,
    },
    {
        order: 20,
        name: '7pm',
        Incidents: 1.288,
    },
    {
        order: 21,
        name: '8pm',
        Incidents: 1.185,
    },
    {
        order: 22,
        name: '9pm',
        Incidents: 1.098,
    },
    {
        order: 23,
        name: '10pm',
        Incidents: 0.974,
    },
    {
        order: 24,
        name: '11pm',
        Incidents: 0.824,
    },
]

const orderToLabel = data => order => get(data.find(el => el.order === order),'name','');

const ErBarChart = () => (
    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
        <div style={{ width: '33.333%' }}>
            <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
                Average Daily Medical Incidents
                <br />
                per Month
            </h4>
            <BarChart
                data={dataMonthMedical}
                dataKey="order"
                dataValue="Incidents"
                xNumberFormatter={orderToLabel(dataMonthMedical)}
                yNumberFormatter={civicFormat.unformatted}
                xLabel="Month"
                yLabel="Incidents"
            />
        </div>
        <div style={{ width: '33.333%' }}>
            <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
                Average Daily Fire Incidents
                <br />
                per Month
            </h4>
            <BarChart
                data={dataMonthFire}
                dataKey="order"
                dataValue="Incidents"
                xNumberFormatter={orderToLabel(dataMonthFire)}
                yNumberFormatter={civicFormat.unformatted}
                xLabel="Month"
                yLabel="Incidents"
            />
        </div>
        <div style={{ width: '33.333%' }}>
            <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
                Average Daily False Alarms
                <br />
                per Month
            </h4>
            <BarChart
                data={dataMonthFalse}
                dataKey="order"
                dataValue="Incidents"
                xNumberFormatter={orderToLabel(dataMonthFalse)}
                yNumberFormatter={civicFormat.unformatted}
                xLabel="Month"
                yLabel="Incidents"
            />
        </div>
        <div style={{ width: '33.333%' }}>
            <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
                Average Medical Incidents
                <br />
                per Hour
            </h4>
            <BarChart
                data={dataHourMedical}
                dataKey="order"
                dataValue="Incidents"
                xNumberFormatter={orderToLabel(dataHourMedical)}
                yNumberFormatter={civicFormat.unformatted}
                xLabel="Hour"
                yLabel="Incidents"
            />
        </div>
        <div style={{ width: '33.333%' }}>
            <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
                Average Fire Incidents
                <br />
                per Hour
            </h4>
            <BarChart
                data={dataHourFire}
                dataKey="order"
                dataValue="Incidents"
                xNumberFormatter={orderToLabel(dataHourFire)}
                yNumberFormatter={civicFormat.unformatted}
                xLabel="Hour"
                yLabel="Incidents"
            />
        </div>
        <div style={{ width: '33.333%' }}>
            <h4 style={{ color: '#d7075f', textAlign: 'right' }}>
                Average False Alarms
                <br />
                per Hour
            </h4>
            <BarChart
                data={dataHourFalse}
                dataKey="order"
                dataValue="Incidents"
                xNumberFormatter={orderToLabel(dataHourFalse)}
                yNumberFormatter={civicFormat.unformatted}
                xLabel="Hour"
                yLabel="Incidents"
            />
        </div>
    </div>
)

export default ErBarChart
