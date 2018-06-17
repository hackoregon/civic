import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getContributorBreakdownRequest = createSelector(
  rootState,
  ({ politicalCampaigns }) => politicalCampaigns,
);

export const getContributorBreakdownData = createSelector(
  getContributorBreakdownRequest,
  ({ data }) => data
);

export const isContributorBreakdownPending = createSelector(
  getContributorBreakdownRequest,
  ({ pending }) => !!pending,
);

export const isContributorBreakdownErrors = createSelector(
  getContributorBreakdownRequest,
  ({ error }) => error || error,
);

export const getCampaign = createSelector(
  rootState,
  ({ politicalCampaigns }) => politicalCampaigns.meta.campaign,
);
