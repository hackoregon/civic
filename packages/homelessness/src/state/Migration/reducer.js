/*
 * Migration reducer
 */

import { actionTypes, INITIAL_STATE } from './constants';

export default function migrationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.GET_MIGRATION_DEMO:
      return { ...state };
    case actionTypes.GET_MIGRATION_DEMO_SUCCESS:
      return {
        ...state,
        migrationDemoData: action.payload,
      };
    case actionTypes.GET_MIGRATION_DEMO_FAILURE:
      return { ...state };
    default:
      return state;
  }
}
