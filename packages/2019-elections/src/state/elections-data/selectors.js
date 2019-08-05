import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getElectionsRequest = createSelector(
  rootState,
  ({ electionsData }) => electionsData
);

export const getElectionsData = createSelector(
  getElectionsRequest,
  ({ data }) => data && data.ElectionsData
);

export const isElectionsDataPending = createSelector(
  getElectionsRequest,
  ({ pending }) => !!pending
);
