import apiAdapter from "../api-adapter";
import actionEmitter from "../api-adapter-action-emitter";

export const CONTRIBUTOR_BREAKDOWN = "contributorBreakdown";
export const SPENDING_BREAKDOWN = "spendingBreakdown";
export const ELECTION_CYCLES = "electionCycles";
export const COMMITTEES = "committees";

export const SET_CAMPAIGN = "SET_CAMPAIGN";
export const SET_ELECTION_CYCLE = "SET_ELECTION_CYCLE";

export const REQUEST_START = "START";
export const REQUEST_SUCCESS = "SUCCESS";
export const REQUEST_ERROR = "ERROR";

const requestStart = type => actionEmitter(`${type}/START`);
const requestSuccess = type => actionEmitter(`${type}/SUCCESS`);
const requestError = type => actionEmitter(`${type}/ERROR`);

const API_BASE = "https://service.civicpdx.org/local-elections/";

const endpoint = type => {
  const endpoints = {
    [CONTRIBUTOR_BREAKDOWN]: "contributorbreakdown",
    [SPENDING_BREAKDOWN]: "spendingbreakdown",
    [ELECTION_CYCLES]: "electioncycles",
    [COMMITTEES]: "committeeslist"
  };

  return `${API_BASE}${endpoints[type]}/`;
};

export const fetchContributorBreakdown = (
  committeeID,
  electionCycleID,
  params = {}
) =>
  apiAdapter(
    `${endpoint(CONTRIBUTOR_BREAKDOWN)}`,
    {
      ...params,
      // election_cycle: electionCycleID,
      committee_id: committeeID
    },
    {
      start: requestStart(CONTRIBUTOR_BREAKDOWN),
      success: requestSuccess(CONTRIBUTOR_BREAKDOWN),
      error: requestError(CONTRIBUTOR_BREAKDOWN)
    }
  )();

export const fetchSpendingBreakdown = (
  committeeID,
  electionCycleID,
  params = {}
) =>
  apiAdapter(
    `${endpoint(SPENDING_BREAKDOWN)}`,
    {
      ...params,
      // election_cycle: electionCycleID,
      committee_id: committeeID
    },
    {
      start: requestStart(SPENDING_BREAKDOWN),
      success: requestSuccess(SPENDING_BREAKDOWN),
      error: requestError(SPENDING_BREAKDOWN)
    }
  )();

export const fetchElectionCycles = (committeeID, params = {}) =>
  apiAdapter(
    endpoint(ELECTION_CYCLES),
    {
      ...params,
      committee: committeeID
    },
    {
      start: requestStart(ELECTION_CYCLES),
      success: requestSuccess(ELECTION_CYCLES),
      error: requestError(ELECTION_CYCLES)
    }
  )();

export const fetchCommittees = (params = {}) =>
  apiAdapter(endpoint(COMMITTEES), params, {
    start: requestStart(COMMITTEES),
    success: requestSuccess(COMMITTEES),
    error: requestError(COMMITTEES)
  })();

export const setCampaign = campaign => ({
  type: SET_CAMPAIGN,
  payload: { campaign }
});

export const setElectionCycle = electionCycle => ({
  type: SET_ELECTION_CYCLE,
  payload: { electionCycle }
});
