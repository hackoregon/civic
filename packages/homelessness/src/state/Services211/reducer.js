/*
 * Services211 reducer
 */

import { actionTypes, INITIAL_STATE } from './constants';

export default function services211Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.GET_SERVICE_CALLS:
      return { ...state };
    case actionTypes.GET_SERVICE_CALLS_SUCCESS:
      return {
        ...state,
        serviceCallsData: action.payload,
      };
    case actionTypes.GET_SERVICE_CALLS_FAILURE:
      return { ...state };
    default:
      return state;
  }
}
