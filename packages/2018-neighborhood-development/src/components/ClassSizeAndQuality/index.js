import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CivicStoryCard, Scatterplot } from '@hackoregon/component-library';

import { fetchclassAndSizeQuality, updateYear } from '../../state/class-size-and-quality/actions';
import {
  getDataForSelectedYear,
  getErrors,
  getSelectedYear,
  isDataPending,
} from '../../state/class-size-and-quality/selectors';

export class ClassSizeAndQuality extends React.Component {
  componentDidMount() {
    const {
      selectedYear,
      fetchData,
    } = this.props;

    fetchData(selectedYear);
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

        {selectedYearData.length > 0 &&
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
};

export default connect(
  state => ({
    isLoading: isDataPending(state),
    error: getErrors(state),
    selectedYear: getSelectedYear(state),
    selectedYearData: getDataForSelectedYear(state),
  }),
  dispatch => ({
    fetchData(year) {
      const fetchDataForYear = fetchclassAndSizeQuality(year);
      dispatch(fetchDataForYear());
    },
    setYear(year) {
      dispatch(updateYear(year));
    },
  }),
)(ClassSizeAndQuality);
