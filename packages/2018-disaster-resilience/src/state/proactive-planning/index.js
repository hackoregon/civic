import { API_START, API_SUCCESS, API_FAILURE } from './actions';

const INITIAL_STATE = {
  pending: false,
  error: null,
  data: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_START:
      return {
        ...state,
        pending: true,
        error: null,
        data: null,
      };
    case API_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        data: action.payload.results.features,
      };
    case API_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
        data: null,
      };
    default:
      return state;
  }
};

export default reducer;
