import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getVotersOnTheMoveRequest = createSelector(
  rootState,
  ({ votersOnTheMove }) => votersOnTheMove
);

export const getVotersOnTheMoveData = createSelector(
  getVotersOnTheMoveRequest,
  ({ data }) => data
);

export const isVotersOnTheMovePending = createSelector(
  getVotersOnTheMoveRequest,
  ({ pending }) => !!pending
);

export const catchVotersOnTheMoveErrors = createSelector(
  getVotersOnTheMoveRequest,
  ({ error }) => error
);

export const getAwayVotersOnTheMoveData = createSelector(
  getVotersOnTheMoveRequest,
  ({ awayData }) => awayData
);

export const isAwayVotersOnTheMovePending = createSelector(
  getVotersOnTheMoveRequest,
  ({ awayPending }) => !!awayPending
);

export const catchAwayVotersOnTheMoveErrors = createSelector(
  getVotersOnTheMoveRequest,
  ({ awayError }) => awayError
);
