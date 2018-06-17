
import apiAdapter from '../api-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const requestStart = actionEmitter('CONTRIBOTOR_BREAKDOWN/START');
export const requestSuccess = actionEmitter('CONTRIBOTOR_BREAKDOWN/SUCCESS');
export const requestError = actionEmitter('CONTRIBOTOR_BREAKDOWN/ERROR');

const CONTRIBUTOR_BREAKDOWN_API = 'http://service.civicpdx.org/local-elections/contributorbreakdown/?format=json';

export const fetchContributorBreakdown = apiAdapter(CONTRIBUTOR_BREAKDOWN_API, {
  start: requestStart,
  success: requestSuccess,
  error: requestError,
});
