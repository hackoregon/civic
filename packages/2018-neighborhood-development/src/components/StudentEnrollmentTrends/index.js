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
  catchSchoolListFailure,
  getSchoolList,
  isSchoolDataPending,
  catchSchoolDataFailure,
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
  'Black/African American',
  'Hispanic/Latino',
  'Multi-Ethnic',
  'American Indian/Alaska Native',
  'Native Hawaiian/Pacific Islander',
];

const formatForSelector = arr => arr.map(name => ({ value: name, label: name }));
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
        error={(schoolListFailure || schoolDataFailure) && 'Could not load school data'}
      >
        <p>Shifts in neighborhood demographics are mirrored in school populations. Portland
           Public Schools (PPS) reports the total number of students enrolled at each school as well as 
           race/ethnicity subgroups. Use this visualization to explore changes in subgroups of Portland 
           Public School students.
        </p>
        { (schoolList && selectedSchool && processedSchoolData) &&
          <div>
            <Dropdown
              value={selectedSchool}
              onChange={event => this.props.setSchool(event.value)}
              options={formatForSelector(schoolList)}
            />
            <StackedAreaChart
              title="All Students"
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
              title="Students From Historically Underrepresented Groups"
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

        <p>PPS assigns each student served 
          one of  the race/ethnicity subgroups (shown above) using federal
          guidelines. These guidelines indicate that student designated with
          Hispanic ethnicity will be counted as Hispanic (regardless of whether 
          the student also has a race designation). 
        </p>
        <p>Non-Hispanic students with more than one race designation are
           counted as multiracial. Non-Hispanic students with a single race designation are counted as that racial subgroup. 
        </p>
        <p>Data collected prior to 2009-2010 was not included. Prior to the 2009-2010
           school year, Asian and Native Hawaiian/Pacific Islander populations were not counted separately.
        </p>
        <p>Check out Peninsula, King or Bridger to see some schools that have had some noticeable 
          changes in student subgroups. 
        </p>

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
  }),
)(StudentEnrollmentTrends);
