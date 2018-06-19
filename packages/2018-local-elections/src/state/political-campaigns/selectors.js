import { createSelector } from 'reselect';
import { rootState } from '../selectors';

const politicalCampaignsSelector = createSelector(
  rootState,
  ({ politicalCampaigns }) => politicalCampaigns,
);

export const getContributorBreakdownRequest = createSelector(
  rootState,
  ({ politicalCampaigns }) => politicalCampaigns,
);

export const getContributorBreakdownData = createSelector(
  politicalCampaignsSelector,
  ({ data }) => data.contributorBreakdown && data.contributorBreakdown.data ? data.contributorBreakdown.data : data.contributorBreakdown,
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
  politicalCampaignsSelector,
  ({ meta }) => meta.campaign,
);

export const getCommittees = createSelector(
  politicalCampaignsSelector,
  ({ data }) => data.committees && data.committees.data ? data.committees.data : data.committees,
);
