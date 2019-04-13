import importReducer from "../import-adapter-reducer";
import { IMPORT_START, IMPORT_SUCCESS, SET_FARMERS_MARKET } from "./actions";

const INITIAL_STATE = {
  pending: false,
  data: null
};

const loadReducers = importReducer({
  INITIAL_STATE,
  IMPORT_START,
  IMPORT_SUCCESS
});
const allReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FARMERS_MARKET:
      return {
        ...state,
        selectedMarket: action.selectedMarket
      };
    default:
      return loadReducers(state, action);
  }
};

export default allReducers;
