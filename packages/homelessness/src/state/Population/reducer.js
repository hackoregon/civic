/*
 * Population reducer
 */

import { actionTypes, INITIAL_STATE } from './constants';

export default function populationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.GET_ETHNICITY:
      return { ...state };
    case actionTypes.GET_ETHNICITY_SUCCESS:
      return {
        ...state,
        ethnicityData: action.payload,
      };
    case actionTypes.GET_ETHNICITY_FAILURE:
      return { ...state };
    case actionTypes.GET_AGE_GENDER:
      return { ...state };
    case actionTypes.GET_AGE_GENDER_SUCCESS:
      return {
        ...state,
        ageGenderData: action.payload,
      };
    case actionTypes.GET_AGE_GENDER_FAILURE:
      return { ...state };
    default:
      return state;
  }
}
