
import apiAdapter from '../api-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const CONTRIBUTOR_BREAKDOWN = 'contributorBreakdown';
export const COMMITTEES = 'committees';

export const SET_CAMPAIGN = 'SET_CAMPAIGN';
export const SET_ELECTION_CYCLE = 'SET_ELECTION_CYCLE';

export const REQUEST_START = 'START';
export const REQUEST_SUCCESS = 'SUCCESS';
export const REQUEST_ERROR = 'ERROR';

const requestStart = type => actionEmitter(`${type}/START`);
const requestSuccess = type => actionEmitter(`${type}/SUCCESS`);
const requestError = type => actionEmitter(`${type}/ERROR`);

const API_BASE = 'http://service.civicpdx.org/local-elections/';

const endpoint = (type) => {
  const endpoints = {
    [CONTRIBUTOR_BREAKDOWN]: 'contributorbreakdown',
    [COMMITTEES]: 'committeeslist',
  };

  return `${API_BASE}${endpoints[type]}/`;
};

export const fetchContributorBreakdown = (committeeID, params = {}) =>
  apiAdapter(`${endpoint(CONTRIBUTOR_BREAKDOWN)}`,
    {
      ...params,
      committee_id: committeeID,
    },
    {
      start: requestStart(CONTRIBUTOR_BREAKDOWN),
      success: requestSuccess(CONTRIBUTOR_BREAKDOWN),
      error: requestError(CONTRIBUTOR_BREAKDOWN),
    })();

export const fetchCommittees = (params = {}) =>
  apiAdapter(endpoint(COMMITTEES), params, {
    start: requestStart(COMMITTEES),
    success: requestSuccess(COMMITTEES),
    error: requestError(COMMITTEES),
  })();

export const setCampaign = campaign => ({
  type: SET_CAMPAIGN,
  payload: { campaign },
});
