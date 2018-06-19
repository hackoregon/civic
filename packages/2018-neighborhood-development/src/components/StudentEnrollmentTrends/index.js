import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, Placeholder, Dropdown } from '@hackoregon/component-library';

import { fetchStudentEnrollmentTrends, updateSchool } from '../../state/student-enrollment-trends/actions';
import {
  isStudentEnrollmentTrendsPending,
  catchStudentEnrollmentTrendsErrors,
  getStudentEnrollmentTrendsSchools,
} from '../../state/student-enrollment-trends/selectors';

const DEFAULT_SCHOOL = { value: 'Buckman', label: 'Buckman' };

const formatForSelector = arr => arr.map(name => ({ value: name, label: name }));

export class StudentEnrollmentTrends extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      schools,
    } = this.props;

    return (
      <CivicStoryCard
        title="Student Enrollment Trends"
        slug="student-enrollment-trends"
        loading={isLoading}
        error={error}
      >
      { !!schools &&
        <Dropdown
          value={DEFAULT_SCHOOL}
          onChange={event => console.log('hi')} //this.props.setNeighborhood(event)}
          options={formatForSelector(schools)}
        />
      }
      </CivicStoryCard>
    );
  }
}

StudentEnrollmentTrends.displayName = 'StudentEnrollmentTrends';

// Connect this to the redux store when necessary
export default connect(

  state => ({
    isLoading: isStudentEnrollmentTrendsPending(state),
    error: catchStudentEnrollmentTrendsErrors(state),
    schools: getStudentEnrollmentTrendsSchools(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchStudentEnrollmentTrends());
    },
  }),
)(StudentEnrollmentTrends);
