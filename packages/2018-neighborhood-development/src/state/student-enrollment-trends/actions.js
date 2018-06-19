import apiAdapter from '../api-adapter';
import actionEmitter from '../api-adapter-action-emitter';

//Types
export const SCHOOL_LIST_START = 'STUDENT_ENROLLMENT_TRENDS/SCHOOL_LIST_START';
export const SCHOOL_LIST_SUCCESS = 'STUDENT_ENROLLMENT_TRENDS/SCHOOL_LIST_SUCCESS';
export const SCHOOL_LIST_ERROR = 'STUDENT_ENROLLMENT_TRENDS/SCHOOL_LIST_ERROR';
export const SCHOOL_DATA_START = 'STUDENT_ENROLLMENT_TRENDS/SCHOOL_DATA_START';
export const SCHOOL_DATA_SUCCESS = 'STUDENT_ENROLLMENT_TRENDS/SCHOOL_DATA_SUCCESS';
export const SCHOOL_DATA_ERROR = 'STUDENT_ENROLLMENT_TRENDS/SCHOOL_DATA_ERROR';
export const SET_SCHOOL = 'STUDENT_ENROLLMENT_TRENDS/UPDATE_SCHOOL';

export const schoolListStart = actionEmitter(SCHOOL_LIST_START);
export const schoolListSuccess = actionEmitter(SCHOOL_LIST_SUCCESS);
export const schoolListError = actionEmitter(SCHOOL_LIST_ERROR);
export const schoolDataStart = actionEmitter(SCHOOL_DATA_START);
export const schoolDataSuccess = actionEmitter(SCHOOL_DATA_SUCCESS);
export const schoolDataError = actionEmitter(SCHOOL_DATA_ERROR);

const SCHOOL_LIST_API = 'http://service.civicpdx.org/neighborhood-development/api/school_demographics/names?format=json';
const SCHOOL_DATA_API = 'http://service.civicpdx.org/neighborhood-development/api/school_demographics?format=json&name=Beverly+Cleary';
const TEMP = 'Beverly+Cleary';

export const fetchSchoolList = apiAdapter(
  SCHOOL_LIST_API,
  {
    start: schoolListStart,
    success: schoolListSuccess,
    error: schoolListError,
  }
);

export const fetchSchoolData = apiAdapter(
  `${SCHOOL_DATA_API}&name=${TEMP}`,
  {
    start: schoolDataStart,
    success: schoolDataSuccess,
    error: schoolDataError,
  }
);

export const setSchool = (school) => {
  return {
    type: SET_SCHOOL,
    selectedSchool: school,
  };
};


//http://service.civicpdx.org/neighborhood-development/api/school_demographics?format=json&name=Beverly+Cleary