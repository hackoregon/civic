import { actionEmitter } from '../utils';
import { actionTypes } from './constants';
import { api } from '../api';

export const populationsStart = actionEmitter(actionTypes.CALL_START);
export const populationsFail = actionEmitter(actionTypes.CALL_FAIL);
export const populationsSuccess = actionEmitter(actionTypes.CALL_SUCCESS);

/* eslint-disable no-param-reassign */
export const normalizer = json => json.reduce((populations, datum) => {
  populations[datum.NP_ID] = populations[datum.NP_ID] || [];
  if (datum.ethnicity !== 'Total') {
    populations[datum.NP_ID].push({
      name: datum.ethnicity,
      value: datum.population,
    });
  }
  return populations;
}, []);
/* eslint-enable no-param-reassign */

export const fetchPopulationsData = api('/poptooltip', {
  start: populationsStart,
  success: populationsSuccess,
  fail: populationsFail,
  normalizer,
  buildParams: () => ({}),
});
