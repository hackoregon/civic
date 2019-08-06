import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getEducationRequest = createSelector(
  rootState,
  ({ educationData }) => educationData
);

export const getEducationData = createSelector(
  getEducationRequest,
  ({ data }) => data && data.EducationData
);

export const isEducationDataPending = createSelector(
  getEducationRequest,
  ({ pending }) => !!pending
);
