import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getStudentEnrollmentTrendsRequest = createSelector(
  rootState,
  ({ studentEnrollmentTrends }) => studentEnrollmentTrends
);

const calcStudents = (numpct, enrollment) =>
  numpct && enrollment ? (numpct * enrollment) / 100 : 0;

const calculateStudents = school =>
  school.map(d => ({
    year: d.year,
    asian: calcStudents(d.enroll_asian, d.enroll_current),
    black: calcStudents(d.enroll_black, d.enroll_current),
    hispanic: calcStudents(d.enroll_hispanic, d.enroll_current),
    multi_ethnic: calcStudents(d.enroll_multi_ethnic, d.enroll_current),
    native: calcStudents(d.enroll_native, d.enroll_current),
    pacific: calcStudents(d.enroll_pacific, d.enroll_current),
    white: calcStudents(d.enroll_white, d.enroll_current),
    underrepresented:
      calcStudents(100, d.enroll_current) -
      (calcStudents(d.enroll_white, d.enroll_current) +
        calcStudents(d.enroll_asian, d.enroll_current))
  }));

const getProperty = key =>
  createSelector(
    getStudentEnrollmentTrendsRequest,
    state => state[key]
  );

export const isSchoolListPending = getProperty("schoolListPending");
export const isSchoolDataPending = getProperty("schoolDataPending");
export const catchSchoolListFailure = getProperty("schoolListFailure");
export const catchSchoolDataFailure = getProperty("schoolDataFailure");
export const getSchoolList = getProperty("schoolList");
export const getSchoolData = getProperty("schoolData");
export const getSelectedSchool = getProperty("selectedSchool");

export const getProcessedSchoolData = createSelector(
  getStudentEnrollmentTrendsRequest,
  ({ schoolData }) => schoolData && calculateStudents(schoolData)
);
