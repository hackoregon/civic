import React from 'react'
import PropTypes from 'prop-types'
import { HorizontalBarChart, civicFormat } from '@hackoregon/component-library'

const percentageFromWholeNumber = d => civicFormat.percentage(d/100);

const TreemapChart = ({ dataSet }) => (
  <HorizontalBarChart
    data={dataSet}
    dataLabel="name"
    dataValue="value"
    dataValueFormatter={percentageFromWholeNumber}
    xLabel=''
    yLabel='Origin'
  />
)

TreemapChart.propTypes = {
  dataSet: PropTypes.array.isRequired,
}

export default TreemapChart
