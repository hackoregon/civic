import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import {
  CivicStoryCard,
  Dropdown,
  StackedAreaChart,
  ungroupBy,
} from '@hackoregon/component-library';
import { civicFormat } from '@hackoregon/component-library/dist/utils';
import {
  fetchSchoolList,
  fetchSchoolData,
  setSchool,
} from '../../state/student-enrollment-trends/actions';
import {
  isSchoolListPending,
  catchSchoolListFailure,
  getSchoolList,
  isSchoolDataPending,
  catchSchoolDataFailure,
  getSchoolData,
  getSelectedSchool,
  getProcessedSchoolData,
} from '../../state/student-enrollment-trends/selectors';

const DEFAULT_SCHOOL = 'Buckman';
const CHARTA_CATEGORIES = ['white', 'asian', 'underrepresented'];
const CHARTA_LABELS = ['White', 'Asian', 'Historically Underrepresented'];
const CHARTB_CATEGORIES = [
  'black',
  'hispanic',
  'multi_ethnic',
  'native',
  'pacific',
];
const CHARTB_LABELS = [
  'Black/African American',
  'Hispanic/Latino',
  'Multi-Ethnic',
  'American Indian/Alaska Native',
  'Native Hawaiian/Pacific Islander',
];

const formatForSelector = arr =>
  arr.map(name => ({ value: name, label: name }));
const formatForChartA = d => ungroupBy(d, CHARTA_CATEGORIES, CHARTA_LABELS);
const formatForChartB = d => ungroupBy(d, CHARTB_CATEGORIES, CHARTB_LABELS);

export class StudentEnrollmentTrends extends React.Component {
  componentDidMount() {
    this.props.init();
    this.props.setSchool(DEFAULT_SCHOOL);
  }

  render() {
    const {
      schoolListLoading,
      schoolListFailure,
      schoolList,
      schoolDataLoading,
      schoolDataFailure,
      schoolData,
      processedSchoolData,
      selectedSchool,
    } = this.props;

    return (
      <CivicStoryCard
        title="Student Enrollment Trends"
        slug="student-enrollment-trends"
        loading={schoolListLoading || schoolDataLoading}
        error={
          (schoolListFailure || schoolDataFailure) &&
          'Could not load school data'
        }
        source="https://github.com/hackoregon/neighborhoods-2018/tree/master/docs/schools"
      >
        {schoolList && selectedSchool && processedSchoolData && (
          <div>
            <Dropdown
              value={selectedSchool}
              onChange={event => this.props.setSchool(event.value)}
              options={formatForSelector(schoolList)}
            />
            <StackedAreaChart
              title="All Students"
              subtitle={`Fall enrollment in Portland Public Schools - ${civicFormat.titleCase(
                selectedSchool
              )}`}
              data={formatForChartA(processedSchoolData)}
              xLabel="Year"
              yLabel="Students"
              dataKey="year"
              dataValue="value"
              dataSeries="type"
              xNumberFormatter={civicFormat.year}
              yNumberFormatter={civicFormat.year}
            />
            <StackedAreaChart
              title="Students From Historically Underrepresented Groups"
              subtitle={`Fall enrollment in Portland Public Schools - ${civicFormat.titleCase(
                selectedSchool
              )}`}
              data={formatForChartB(processedSchoolData)}
              xLabel="Year"
              yLabel="Students"
              dataKey="year"
              dataValue="value"
              dataSeries="type"
              xNumberFormatter={civicFormat.year}
              yNumberFormatter={civicFormat.year}
            />
          </div>
        )}
      </CivicStoryCard>
    );
  }
}

StudentEnrollmentTrends.displayName = 'StudentEnrollmentTrends';

// Connect this to the redux store when necessary
export default connect(
  state => ({
    schoolListLoading: isSchoolListPending(state),
    schoolListFailure: catchSchoolListFailure(state),
    schoolList: getSchoolList(state),
    schoolDataLoading: isSchoolDataPending(state),
    schoolDataFailure: catchSchoolDataFailure(state),
    schoolData: getSchoolData(state),
    selectedSchool: getSelectedSchool(state),
    processedSchoolData: getProcessedSchoolData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchSchoolList());
    },
    setSchool(school = {}) {
      dispatch(fetchSchoolData(school));
      dispatch(setSchool(school));
    },
  })
)(StudentEnrollmentTrends);
