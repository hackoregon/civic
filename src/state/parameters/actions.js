import { actionEmitter } from '../utils';
import { actionTypes } from './constants';

export const updateSelectedUnitSize = actionEmitter(actionTypes.UPDATE_UNIT_SIZE);
export const updateSelectedDemographic = actionEmitter(actionTypes.UPDATE_DEMOGRAPHIC);
