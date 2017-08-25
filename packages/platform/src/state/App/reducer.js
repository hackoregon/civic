/*
 * App reducer
 */

import { actionTypes, INITIAL_STATE } from './constants';

export default function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.DEFAULT_ACTION:
      return state;
    case actionTypes.GET_THREADS:
      return { ...state };

    case actionTypes.GET_THREADS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };

    case actionTypes.GET_THREADS_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
