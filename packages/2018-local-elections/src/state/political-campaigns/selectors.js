import { createSelector } from 'reselect';
import { rootState } from '../selectors';

const politicalCampaignsSelector = createSelector(
  rootState,
  ({ politicalCampaigns }) => politicalCampaigns,
);

export const getContributorBreakdownData = createSelector(
  politicalCampaignsSelector,
  ({ data }) => data.contributorBreakdown && data.contributorBreakdown.data ? data.contributorBreakdown.data : data.contributorBreakdown,
);

export const getSpendingBreakdownData = createSelector(
  politicalCampaignsSelector,
  ({ data }) => data.spendingBreakdown && data.spendingBreakdown.data ? data.spendingBreakdown.data : data.spendingBreakdown,
);

export const isPoliticalCampaignsLoading = createSelector(
  politicalCampaignsSelector,
  ({ data }) => !!((data.committees && data.committees.pending) || (data.electionCycles && data.electionCycles.pending)),
);

export const isContributorBreakdownLoading = createSelector(
  politicalCampaignsSelector,
  ({ data }) => data.contributorBreakdown && data.contributorBreakdown.pending,
);

export const isSpendingBreakdownLoading = createSelector(
  politicalCampaignsSelector,
  ({ data }) => data.spendingBreakdown && data.spendingBreakdown.pending,
);

export const getCampaign = createSelector(
  politicalCampaignsSelector,
  ({ meta }) => meta.campaign,
);

export const getElectionCycle = createSelector(
  politicalCampaignsSelector,
  ({ meta }) => meta.electionCycle,
);

export const getElectionCycles = createSelector(
  politicalCampaignsSelector,
  ({ data }) => data.electionCycles && data.electionCycles.data ? data.electionCycles.data : data.electionCycles,
);

export const getCommittees = createSelector(
  politicalCampaignsSelector,
  ({ data }) => data.committees && data.committees.data ? data.committees.data : data.committees,
);
