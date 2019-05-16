import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import withReduxInfrastructure from "./with-redux-infrastructure";
import reallyReallyFast from "./really-really-fast";
import iCanMakeCards from "./i-can-make-cards";
import ridershipOverTime from "./decline-in-ridership";
import serviceAndRidership from "./service-and-ridership";
import driversOfParticipation from "./drivers-of-participation";

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    withReduxInfrastructure,
    reallyReallyFast,
    iCanMakeCards,
    ridershipOverTime,
    serviceAndRidership,
    driversOfParticipation,
    ...asyncReducers
  });
}
