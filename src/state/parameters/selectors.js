import { createSelector } from 'reselect';
import { propOr } from 'ramda';
import {
  DEMOGRAPHICS,
  UNIT_SIZES,
} from '../../utils/data-constants';

// app : State -> Obj
export const getAppState = state => propOr({}, 'parameters')(state);

export const getSelectedUnitSize = createSelector(
  getAppState,
  propOr(UNIT_SIZES[0], 'selectedUnitSize'),
);

export const getSelectedDemographic = createSelector(
  getAppState,
  propOr(DEMOGRAPHICS[0], 'selectedDemographic'),
);
