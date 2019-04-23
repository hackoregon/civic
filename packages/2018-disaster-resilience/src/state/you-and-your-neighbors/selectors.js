import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getYouAndYourNeighborsRequest = createSelector(
  rootState,
  ({ youAndYourNeighbors }) => youAndYourNeighbors
);

export const getYouAndYourNeighborsData = createSelector(
  getYouAndYourNeighborsRequest,
  ({ data }) => data
);

export const isYouAndYourNeighborsPending = createSelector(
  getYouAndYourNeighborsRequest,
  ({ pending }) => !!pending
);

export const catchYouAndYourNeighborsErrors = createSelector(
  getYouAndYourNeighborsRequest,
  ({ error }) => error || error
);

export const getYouAndYourNeighborsCoordsData = createSelector(
  getYouAndYourNeighborsRequest,
  ({ coordsData }) => coordsData
);

export const isYouAndYourNeighborsCoordsPending = createSelector(
  getYouAndYourNeighborsRequest,
  ({ coordsPending }) => !!coordsPending
);

export const catchYouAndYourNeighborsCoordsErrors = createSelector(
  getYouAndYourNeighborsRequest,
  ({ coordsError }) => coordsError || coordsError
);

export const getSelectedCoords = createSelector(
  getYouAndYourNeighborsRequest,
  ({ selectedCoords }) => selectedCoords
);
