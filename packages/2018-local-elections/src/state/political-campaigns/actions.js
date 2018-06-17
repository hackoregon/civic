
import apiAdapter from '../api-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const CONTRIBUTOR_BREAKDOWN_START = 'CONTRIBOTOR_BREAKDOWN/START'
export const CONTRUBUTOR_BREAKDOWN_SUCCESS = 'CONTRIBOTOR_BREAKDOWN/SUCCESS'
export const CONTRIBUTOR_BREAKDOWN_ERROR = 'CONTRIBOTOR_BREAKDOWN/ERROR'
export const SET_CAMPAIGN = 'SET_CAMPAIGN'

export const requestStart = actionEmitter(CONTRIBUTOR_BREAKDOWN_START);
export const requestSuccess = actionEmitter(CONTRUBUTOR_BREAKDOWN_SUCCESS);
export const requestError = actionEmitter(CONTRIBUTOR_BREAKDOWN_ERROR);

const CONTRIBUTOR_BREAKDOWN_API = 'http://service.civicpdx.org/local-elections/contributorbreakdown/?format=json';

export const fetchContributorBreakdown = apiAdapter(CONTRIBUTOR_BREAKDOWN_API, {
  start: requestStart,
  success: requestSuccess,
  error: requestError,
});

export const setCampaign = campaign => ({
  type: SET_CAMPAIGN,
  payload: { campaign },
});
