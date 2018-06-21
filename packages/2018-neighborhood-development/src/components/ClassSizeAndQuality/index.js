import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CivicStoryCard, Dropdown, Scatterplot } from '@hackoregon/component-library';

import { fetchclassAndSizeQuality, updateYear } from '../../state/class-size-and-quality/actions';
import {
  getDataForSelectedYear,
  getErrors,
  getSelectedYear,
  isDataPending,
} from '../../state/class-size-and-quality/selectors';

const YEARS = [
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
];

const dropdownOptions = YEARS.map(year => ({ value: year, label: year }));

export class ClassSizeAndQuality extends React.Component {
  componentDidMount() {
    this.props.fetchData(this.props.selectedYear);
  }

  onYearChange = ({ value }) => {
    this.props.setYear(value);
  }

  render() {
    const {
      error,
      isLoading,
      selectedYear,
      selectedYearData,
    } = this.props;

    return (
      <CivicStoryCard
        error={error}
        loading={isLoading}
        slug="class-size-and-quality"
        title="Class Size and Quality"
      >
        <p>
          Average class size was used as a metric to determine which schools
          would receive or lose FTE in the 2018-19 fiscal year. Understanding fluctuations
          in student teacher ratios across schools and time, as well as in relation
          to teacher experience, provides the end user with context to understand a staffing model.
        </p>

        <Dropdown
          value={selectedYear}
          onChange={this.onYearChange}
          options={dropdownOptions}
        />

        {selectedYearData && selectedYearData.length === 0 &&
          <div>Loading...</div>
        }

        {selectedYearData && selectedYearData.length > 0 &&
          <Scatterplot
            data={selectedYearData}
            dataKey="teacherExperience"
            dataValue="classSize"
            dataSeries="type"
            xLabel="Experience"
            yLabel="Students"
            title="Class Sizes and Teacher Experience"
            subtitle={`Average student / teacher ratio by average years of teacher experience - ${selectedYear}`}
          />
        }
      </CivicStoryCard>
    );
  }
}

ClassSizeAndQuality.displayName = 'ClassSizeAndQuality';
ClassSizeAndQuality.propTypes = {
  error: PropTypes.string,
  fetchData: PropTypes.func,
  isLoading: PropTypes.bool,
  selectedYear: PropTypes.string,
  selectedYearData: PropTypes.arrayOf(PropTypes.object),
  setYear: PropTypes.func,
};

export default connect(
  state => ({
    isLoading: isDataPending(state),
    error: getErrors(state),
    selectedYear: getSelectedYear(state),
    selectedYearData: getDataForSelectedYear(state),
  }),
  dispatch => ({
    fetchData() {
      dispatch(fetchclassAndSizeQuality());
    },
    setYear(year) {
      dispatch(updateYear(year));
    },
  }),
)(ClassSizeAndQuality);
