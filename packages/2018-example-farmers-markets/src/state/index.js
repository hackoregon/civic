import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import farmersMarketsOverTimeNewData from "./farmers-markets-over-time-new";
import portlandFarmersMarketsNewData from "./portland-farmers-markets-new";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    portlandFarmersMarketsNewData,
    farmersMarketsOverTimeNewData,
    ...asyncReducers
  });
}
