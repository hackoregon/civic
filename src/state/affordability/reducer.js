import { INITIAL_STATE, actionTypes } from './constants';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CALL_START:
      return {
        pending: true,
        data: null,
        error: null,
      };
    case actionTypes.CALL_FAIL:
      return {
        pending: false,
        error: action.payload,
        data: null,
      };
    case actionTypes.CALL_SUCCESS:
      return {
        pending: false,
        error: null,
        data: action.payload,
      };
    default:
      return state;
  }
};
