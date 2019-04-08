import React from 'react'
import PropTypes from 'prop-types'
import { PieChart } from '@hackoregon/component-library'
import { css } from 'emotion'

const pieContainerClass = css`
  margin-bottom: -25%;
`

const HalfDonutChart = ({ dataSets, legend }) => (
  <div className={pieContainerClass}>
    <PieChart data={dataSets} halfDoughnut dataLabel="name" dataValue="value" />
  </div>
)

HalfDonutChart.propTypes = {
  dataSets: PropTypes.array.isRequired,
  legend: PropTypes.boolean,
}

HalfDonutChart.defaultProps = {
  legend: true,
}

export default HalfDonutChart
