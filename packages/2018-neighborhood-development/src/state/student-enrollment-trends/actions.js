import apiAdapter from '../api-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const API_START = 'STUDENT_ENROLLMENT_TRENDS/START';
export const API_SUCCESS = 'STUDENT_ENROLLMENT_TRENDS/SUCCESS';
export const API_ERROR = 'STUDENT_ENROLLMENT_TRENDS/ERROR';

export const UPDATE_SCHOOL = 'STUDENT_ENROLLMENT_TRENDS/UPDATE_SCHOOL';

export const studentEnrollmentTrendsStart = actionEmitter(API_START);
export const studentEnrollmentTrendsSuccess = actionEmitter(API_SUCCESS);
export const studentEnrollmentTrendsError = actionEmitter(API_ERROR);

const STUDENT_ENROLLMENT_TRENDS_API = 'http://service.civicpdx.org/neighborhood-development/api/school_demographics/names?format=json';

export const fetchStudentEnrollmentTrends = apiAdapter(
  STUDENT_ENROLLMENT_TRENDS_API,
  {
    start: studentEnrollmentTrendsStart,
    success: studentEnrollmentTrendsSuccess,
    error: studentEnrollmentTrendsError,
  }
);

export const updateUserSchool = (school) => {
  return {
    type: UPDATE_SCHOOL,
    selectedSchool: school,
  };
};
