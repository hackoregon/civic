import apiAdapter from '../fetch-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const API_START =
'HUMAN_IMPACT_OF_SWEEPING_URBAN_CAMPSITES/START';
export const API_SUCCESS =
'HUMAN_IMPACT_OF_SWEEPING_URBAN_CAMPSITES/SUCCESS';
export const API_ERROR =
'HUMAN_IMPACT_OF_SWEEPING_URBAN_CAMPSITES/ERROR';

export const HumanImpactOfSweepingUrbanCampsitesStart = actionEmitter(API_START);
export const HumanImpactOfSweepingUrbanCampsitesSuccess = actionEmitter(API_SUCCESS);
export const HumanImpactOfSweepingUrbanCampsitesError = actionEmitter(API_ERROR);

const endpoint = 'api/camp_weekly_aggregates?limit=130';

export const fetchHumanImpactOfSweepingUrbanCampsites = apiAdapter(
  endpoint,
  {
    start: HumanImpactOfSweepingUrbanCampsitesStart,
    success: HumanImpactOfSweepingUrbanCampsitesSuccess,
    failure: HumanImpactOfSweepingUrbanCampsitesError,
  }
);
