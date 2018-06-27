import apiAdapter from '../fetch-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const API_START =
'MAGNITUDE_OF_URBAN_CAMPSITE_SWEEPS/START';
export const API_SUCCESS =
'MAGNITUDE_OF_URBAN_CAMPSITE_SWEEPS/SUCCESS';
export const API_ERROR =
'MAGNITUDE_OF_URBAN_CAMPSITE_SWEEPS/ERROR';

export const UrbanCampsiteSweepsByWeekStart = actionEmitter(API_START);
export const UrbanCampsiteSweepsByWeekSuccess = actionEmitter(API_SUCCESS);
export const UrbanCampsiteSweepsByWeekError = actionEmitter(API_ERROR);

const endpoint = 'api/camp_sweeps/bytime?timeframe=month';

export const fetchUrbanCampsiteSweepsByWeek = apiAdapter(
  endpoint,
  {
    start: UrbanCampsiteSweepsByWeekStart,
    success: UrbanCampsiteSweepsByWeekSuccess,
    failure: UrbanCampsiteSweepsByWeekError,
  }
);
