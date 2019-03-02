import { actionEmitter } from '../utils';
import { actionTypes } from './constants';

export const updateUserIncome = actionEmitter(actionTypes.UPDATE_USER_INCOME);
export const updateUserUnitSize = actionEmitter(
  actionTypes.UPDATE_USER_UNIT_SIZE
);
export const updateOtherUnitSize = actionEmitter(
  actionTypes.UPDATE_OTHER_UNIT_SIZE
);
export const updateOtherDemographic = actionEmitter(
  actionTypes.UPDATE_OTHER_DEMOGRAPHIC
);
export const updateNeighborhood = actionEmitter(
  actionTypes.UPDATE_NEIGHBORHOOD
);
