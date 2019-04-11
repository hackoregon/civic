/* eslint-disable no-global-require */

import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    parameters: require("./parameters").default,
    affordability: require("./affordability").default,
    neighborhoods: require("./neighborhoods").default,
    rent: require("./rent").default,
    households: require("./households").default,
    populations: require("./populations").default,
    ...asyncReducers
  });
}
