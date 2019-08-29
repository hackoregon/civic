import {
  IMPORT_START,
  IMPORT_SUCCESS,
  SET_FARMERS_MARKET_NEW
} from "./actions";

const INITIAL_STATE = {
  pending: false,
  data: null,
  selectedMarket: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMPORT_START:
      return {
        ...state,
        pending: true
      };
    case IMPORT_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload
      };
    case SET_FARMERS_MARKET_NEW:
      return {
        ...state,
        selectedMarket: action.selectedMarket
      };
    default:
      return state;
  }
};

export default reducer;
