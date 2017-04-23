import { INITIAL_STATE, actionTypes } from './constants';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_UNIT_SIZE:
      return {
        ...state,
        selectedUnitSize: action.payload,
      };
    case actionTypes.UPDATE_DEMOGRAPHIC:
      return {
        ...state,
        selectedDemographic: action.payload,
      };
    default:
      return state;
  }
};
