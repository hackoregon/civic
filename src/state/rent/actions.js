import { actionEmitter } from '../utils';
import { actionTypes } from './constants';
import { api } from '../api';

export const rentStart = actionEmitter(actionTypes.CALL_START);
export const rentFail = actionEmitter(actionTypes.CALL_FAIL);
export const rentSuccess = actionEmitter(actionTypes.CALL_SUCCESS);

export const fetchRentData = api('/rent', {
  start: rentStart,
  success: rentSuccess,
  fail: rentFail,
  normalizer: json => json.map(data => data),
  buildParams: () => null,
});
