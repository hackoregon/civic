import {
  SCHOOL_LIST_START,
  SCHOOL_LIST_SUCCESS,
  SCHOOL_LIST_ERROR,
  SCHOOL_DATA_START,
  SCHOOL_DATA_SUCCESS,
  SCHOOL_DATA_ERROR,
  SET_SCHOOL,
} from './actions';

const INITIAL_STATE = {
  schoolListPending: false,
  schoolListError: null,
  schoolList: null,
  schoolDataPending: false,
  schoolDataError: null,
  schoolData: null,
  selectedSchool: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCHOOL_LIST_START:
      return {
        ...state,
        schoolListPending: true,
        schoolListError: null,
        schoolList: null,
      };
    case SCHOOL_LIST_SUCCESS:
      return {
        ...state,
        schoolListPending: false,
        schoolListError: null,
        schoolList: action.payload.data,
      };
    case SCHOOL_LIST_ERROR:
      return {
        ...state,
        schoolListPending: false,
        schoolListError: action.payload,
        schoolList: null,
      };
    case SCHOOL_DATA_START:
      return {
        ...state,
        schoolDataPending: true,
        schoolDataError: null,
        schoolData: null,
      };
    case SCHOOL_DATA_SUCCESS:
      return {
        ...state,
        schoolDataPending: false,
        schoolDataError: null,
        schoolData: action.payload.data.results,
      };
    case SCHOOL_DATA_ERROR:
      return {
        ...state,
        schoolDataPending: false,
        schoolDataError: action.payload,
        schoolData: null,
      };
    case SET_SCHOOL:
      return {
        ...state,
        selectedSchool: action.selectedSchool,
      };
    default:
      return state;
  }
};

export default reducer;

