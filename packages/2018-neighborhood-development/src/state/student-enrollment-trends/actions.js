import fetchAdapter from "../fetch-adapter";
import actionEmitter from "../api-adapter-action-emitter";

// Types
export const SCHOOL_LIST_START = "STUDENT_ENROLLMENT_TRENDS/SCHOOL_LIST_START";
export const SCHOOL_LIST_SUCCESS =
  "STUDENT_ENROLLMENT_TRENDS/SCHOOL_LIST_SUCCESS";
export const SCHOOL_LIST_FAILURE =
  "STUDENT_ENROLLMENT_TRENDS/SCHOOL_LIST_FAILURE";
export const SCHOOL_DATA_START = "STUDENT_ENROLLMENT_TRENDS/SCHOOL_DATA_START";
export const SCHOOL_DATA_SUCCESS =
  "STUDENT_ENROLLMENT_TRENDS/SCHOOL_DATA_SUCCESS";
export const SCHOOL_DATA_FAILURE =
  "STUDENT_ENROLLMENT_TRENDS/SCHOOL_DATA_FAILURE";
export const SET_SCHOOL = "STUDENT_ENROLLMENT_TRENDS/UPDATE_SCHOOL";

// Simple actions
export const schoolListStart = actionEmitter(SCHOOL_LIST_START);
export const schoolListSuccess = actionEmitter(SCHOOL_LIST_SUCCESS);
export const schoolListFailure = actionEmitter(SCHOOL_LIST_FAILURE);
export const schoolDataStart = actionEmitter(SCHOOL_DATA_START);
export const schoolDataSuccess = actionEmitter(SCHOOL_DATA_SUCCESS);
export const schoolDataFailure = actionEmitter(SCHOOL_DATA_FAILURE);

// Thunk actions
export const fetchSchoolList = fetchAdapter(
  "api/school_demographics/names?format=json",
  {
    start: schoolListStart,
    success: schoolListSuccess,
    failure: schoolListFailure
  }
);

export const fetchSchoolData = fetchAdapter("api/school_demographics", {
  encodeParams: (url, school) => `${url}?name=${school}`,
  start: schoolDataStart,
  success: schoolDataSuccess,
  failure: schoolDataFailure
});

export const setSchool = school => {
  return {
    type: SET_SCHOOL,
    selectedSchool: school
  };
};

// http://service.civicpdx.org/neighborhood-development/api/school_demographics?format=json&name=Beverly+Cleary
