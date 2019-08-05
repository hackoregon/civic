import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getTransportationRequest = createSelector(
  rootState,
  ({ transportationData }) => transportationData
);

export const getTransportationData = createSelector(
  getTransportationRequest,
  ({ data }) => data && data.TransportationData
);

export const isTransportationDataPending = createSelector(
  getTransportationRequest,
  ({ pending }) => !!pending
);
