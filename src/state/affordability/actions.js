import { actionEmitter } from '../utils';
import { actionTypes } from './constants';
import { api } from '../api';
import { getSelectedUnitSize, getSelectedDemographic } from '../parameters/selectors';

export const affordabilityStart = actionEmitter(actionTypes.CALL_START);
export const affordabilityFail = actionEmitter(actionTypes.CALL_FAIL);
export const affordabilitySuccess = actionEmitter(actionTypes.CALL_SUCCESS);

export const fetchAffordabilityData = api('/affordable', {
  start: affordabilityStart,
  success: affordabilitySuccess,
  fail: affordabilityFail,
  normalizer: json => json.map(demo => [
    demo.affordable ? ':D' : ':C',
    demo.demographic,
    demo.housing_size,
  ]),
  buildParams: state => ({
    housing_size: getSelectedUnitSize(state),
    demographic: getSelectedDemographic(state),
  }),
});
