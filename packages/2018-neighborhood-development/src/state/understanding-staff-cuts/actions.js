import apiAdapter from '../fetch-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const API_START =
'UNDERSTANDING_STAFF_CUTS/START';
export const API_SUCCESS =
'UNDERSTANDING_STAFF_CUTS/SUCCESS';
export const API_ERROR =
'UNDERSTANDING_STAFF_CUTS/ERROR';

export const UnderstandingStaffCutsStart = actionEmitter(API_START);
export const UnderstandingStaffCutsSuccess = actionEmitter(API_SUCCESS);
export const UnderstandingStaffCutsError = actionEmitter(API_ERROR);

const endpoint = 'api/school_staffing_changes?limit=80';

export const fetchUnderstandingStaffCuts = apiAdapter(
  endpoint,
  {
    start: UnderstandingStaffCutsStart,
    success: UnderstandingStaffCutsSuccess,
    failure: UnderstandingStaffCutsError,
  }
);
