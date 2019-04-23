import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import ridershipOverTime from "./decline-in-ridership";
import serviceAndRidership from "./service-and-ridership";
import driversOfParticipation from "./drivers-of-participation";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    ridershipOverTime,
    serviceAndRidership,
    driversOfParticipation,
    ...asyncReducers
  });
}
