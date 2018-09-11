import { START, SUCCESS, FAILURE } from './actions';

const INITIAL_STATE = {
  pending: false,
  error: null,
  allPolicies: null,
  allPrograms: null,
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
    default:
      return state;
  }
};

export default reducer;
