/*
 * Definition reducer
 */

import { actionTypes, INITIAL_STATE } from './constants';

export default function definitionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.GET_SHELTER_TYPE:
      return { ...state };
    case actionTypes.GET_SHELTER_TYPE_SUCCESS:
      return {
        ...state,
        shelterTypeData: action.payload,
      };
    case actionTypes.GET_SHELTER_TYPE_FAILURE:
      return { ...state };
    default:
      return state;
  }
}
