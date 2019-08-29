import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import farmersMarketsOverTime from "./farmers-markets-over-time";
import portlandFarmersMarkets from "./portland-farmers-markets";
import farmersMarketsOverTimeNewData from "./farmers-markets-over-time-new";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    farmersMarketsOverTimeNewData,
    farmersMarketsOverTime,
    portlandFarmersMarkets,
    ...asyncReducers
  });
}
