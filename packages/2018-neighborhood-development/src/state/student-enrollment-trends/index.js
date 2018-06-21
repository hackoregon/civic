import {
  SCHOOL_LIST_START,
  SCHOOL_LIST_SUCCESS,
  SCHOOL_LIST_FAILURE,
  SCHOOL_DATA_START,
  SCHOOL_DATA_SUCCESS,
  SCHOOL_DATA_FAILURE,
  SET_SCHOOL,
} from './actions';

const INITIAL_STATE = {
  schoolListPending: false,
  schoolListFailure: null,
  schoolList: null,
  schoolDataPending: false,
  schoolDataFailure: null,
  schoolData: null,
  selectedSchool: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCHOOL_LIST_START:
      return {
        ...state,
        schoolListPending: true,
        schoolListFailure: null,
        schoolList: null,
      };
    case SCHOOL_LIST_SUCCESS:
      return {
        ...state,
        schoolListPending: false,
        schoolListFailure: null,
        schoolList: action.payload,
      };
    case SCHOOL_LIST_FAILURE:
      return {
        ...state,
        schoolListPending: false,
        schoolListFailure: action.payload,
        schoolList: null,
      };
    case SCHOOL_DATA_START:
      return {
        ...state,
        schoolDataPending: true,
        schoolDataFailure: null,
        schoolData: null,
      };
    case SCHOOL_DATA_SUCCESS:
      return {
        ...state,
        schoolDataPending: false,
        schoolDataFailure: null,
        schoolData: action.payload.results,
      };
    case SCHOOL_DATA_FAILURE:
      return {
        ...state,
        schoolDataPending: false,
        schoolDataFailure: action.payload,
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

