import importAdapter from '../import-adapter';
import actionEmitter from '../import-adapter-action-emitter';

export const IMPORT_START = 'FARMERS_MARKETS_OVER_TIME__START';
export const IMPORT_SUCCESS = 'FARMERS_MARKETS_OVER_TIME__SUCCESS';

export const farmersMarketsOverTimeStart = actionEmitter(IMPORT_START);
export const farmersMarketsOverTimeSuccess = actionEmitter(IMPORT_SUCCESS);

export const fetchFarmersMarketsOverTime = importAdapter(
  import('../../assets/farmers-markets-by-year.json'),
  {
    start: farmersMarketsOverTimeStart,
    success: farmersMarketsOverTimeSuccess,
  }
);
