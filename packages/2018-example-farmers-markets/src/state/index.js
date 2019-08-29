import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import farmersMarketsOverTimeData from "./farmers-markets-over-time";
import portlandFarmersMarketsData from "./portland-farmers-markets";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    portlandFarmersMarketsData,
    farmersMarketsOverTimeData,
    ...asyncReducers
  });
}
