import importReducer from "../import-adapter-reducer";
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

export default importReducer({
  INITIAL_STATE,
  IMPORT_START,
  IMPORT_SUCCESS,
  SET_FARMERS_MARKET_NEW
});
