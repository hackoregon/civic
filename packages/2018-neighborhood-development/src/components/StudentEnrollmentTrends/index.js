import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, Dropdown, StackedAreaChart } from '@hackoregon/component-library';
import { ungroupBy } from '@hackoregon/component-library/src/utils/dataHelpers';
import { year, titleCase } from '@hackoregon/component-library/src/utils/formatters';

import { fetchSchoolList, fetchSchoolData, setSchool } from '../../state/student-enrollment-trends/actions';
import {
  isSchoolListPending,
  catchSchoolListErrors,
  getSchoolList,
  isSchoolDataPending,
  catchSchoolDataErrors,
  getSchoolData,
  getSelectedSchool,
  getProcessedSchoolData,
} from '../../state/student-enrollment-trends/selectors';

const DEFAULT_SCHOOL = 'Buckman';
const CHARTA_CATEGORIES = [
  'white',
  'asian',
  'underrepresented',
];
const CHARTA_LABELS = [
  'White',
  'Asian',
  'Historically Underrepresented',
];
const CHARTB_CATEGORIES = [
  'black',
  'hispanic',
  'multi_ethnic',
  'native',
  'pacific',
];
const CHARTB_LABELS = [
  'black',
  'hispanic',
  'multi_ethnic',
  'native',
  'pacific',
];

const formatForSelector = arr => arr.map(name => ({ value: name, label: name }));
const formatForChartA = d => ungroupBy(d, CHARTA_CATEGORIES, CHARTA_LABELS);
const formatForChartB = d => ungroupBy(d, CHARTB_CATEGORIES, CHARTB_LABELS);

export class StudentEnrollmentTrends extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      schoolListLoading,
      schoolListError,
      schoolList,
      schoolDataLoading,
      schoolDataError,
      schoolData,
      processedSchoolData,
      selectedSchool,
    } = this.props;

    return (
      <CivicStoryCard
        title="Student Enrollment Trends"
        slug="student-enrollment-trends"
        loading={schoolListLoading || schoolDataLoading}
        error={schoolListError || schoolDataError}
      >
        { (schoolList && selectedSchool && processedSchoolData) &&
          <div>
            <Dropdown
              value={selectedSchool}
              onChange={event => setSchool(event)}
              options={formatForSelector(schoolList)}
            />
            <StackedAreaChart
              title="Student Enrollment"
              subtitle={`Fall enrollment in Portland Public Schools - ${titleCase(selectedSchool)}`}
              data={formatForChartA(processedSchoolData)}
              xLabel="Year"
              yLabel="Students"
              dataKey="year"
              dataValue="value"
              dataSeries="type"
              xNumberFormatter={year}
              yNumberFormatter={year}
            />
            <StackedAreaChart
              title="Historically Underrepresented Groups"
              subtitle={`Fall enrollment in Portland Public Schools - ${titleCase(selectedSchool)}`}
              data={formatForChartB(processedSchoolData)}
              xLabel="Year"
              yLabel="Students"
              dataKey="year"
              dataValue="value"
              dataSeries="type"
              xNumberFormatter={year}
              yNumberFormatter={year}
            />
          </div>
        }
      </CivicStoryCard>
    );
  }
}

StudentEnrollmentTrends.displayName = 'StudentEnrollmentTrends';

// Connect this to the redux store when necessary
export default connect(

  state => ({
    schoolListLoading: isSchoolListPending(state),
    schoolListError: catchSchoolListErrors(state),
    schoolList: getSchoolList(state),
    schoolDataLoading: isSchoolDataPending(state),
    schoolDataError: catchSchoolDataErrors(state),
    schoolData: getSchoolData(state),
    selectedSchool: getSelectedSchool(state),
    processedSchoolData: getProcessedSchoolData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchSchoolList());
      dispatch(setSchool(DEFAULT_SCHOOL));
      dispatch(fetchSchoolData());
    },
    setSchool(school) {
      dispatch(fetchSchoolData());
      dispatch(setSchool(school));
    },
  }),
)(StudentEnrollmentTrends);
