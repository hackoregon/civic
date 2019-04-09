import React from 'react'
import PropTypes from 'prop-types'
import { HorizontalBarChart, civicFormat } from '@hackoregon/component-library'

const percentageFromWholeNumber = d => civicFormat.percentage(d/100);

const ListBarChart = ({ data, title }) => (
  <HorizontalBarChart
    data={data}
    dataLabel="name"
    dataValue="value"
    dataValueFormatter={percentageFromWholeNumber}
    minimalist
    xLabel={title}
  />
)

ListBarChart.propTypes = {
  data: PropTypes.array.isRequired,
}

export default ListBarChart
