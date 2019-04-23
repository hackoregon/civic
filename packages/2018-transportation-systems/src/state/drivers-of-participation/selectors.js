import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getDriversOfParticipationRequest = createSelector(
  rootState,
  ({ driversOfParticipation }) => driversOfParticipation
);

const calcLabels = arr =>
  arr.map(obj => ({
    ...obj,
    combinedLabel: `Line ${obj.route_id} - ${obj.year} • Frequency Change`
  }));

export const getDriversOfParticipationData = createSelector(
  getDriversOfParticipationRequest,
  ({ data }) =>
    data && calcLabels(data.data.results.filter(obj => obj.year > 2012))
);

export const isDriversOfParticipationPending = createSelector(
  getDriversOfParticipationRequest,
  ({ pending }) => !!pending
);

export const catchDriversOfParticipationErrors = createSelector(
  getDriversOfParticipationRequest,
  ({ error }) => error || error
);
