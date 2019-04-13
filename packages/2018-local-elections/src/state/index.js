import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import politicalCampaigns from "./political-campaigns";
import volumeOfMoney from "./volume-of-money";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    politicalCampaigns,
    volumeOfMoney,
    ...asyncReducers
  });
}
