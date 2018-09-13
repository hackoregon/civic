import { START, SUCCESS, FAILURE, SET_POLICY } from './actions';

const INITIAL_STATE = {
  pending: false,
  error: null,
  allPolicies: null,
  allPrograms: null,
  selectedPolicy: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        pending: true,
        error: null,
        allPolicies: null,
        allPrograms: null,
      };
    case SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        allPolicies: action.payload[0].results,
        allPrograms: action.payload[1].results,
      };
    case FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
        allPolicies: null,
        allPrograms: null,
      };
    case SET_POLICY:
      return {
        ...state,
        selectedPolicy: action.selectedPolicy,
      };
    default:
      return state;
  }
};

export default reducer;
