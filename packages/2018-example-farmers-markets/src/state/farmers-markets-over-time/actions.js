import importAdapter from '../import-adapter';
import actionEmitter from '../import-adapter-action-emitter';

export const IMPORT_START = 'FARMERS_MARKETS_OVER_TIME/START';
export const IMPORT_SUCCESS = 'FARMERS_MARKETS_OVER_TIME/SUCCESS';

export const farmersMarketsOverTimeStart = actionEmitter(IMPORT_START);
export const farmersMarketsOverTimeSuccess = actionEmitter(IMPORT_SUCCESS);

const importPromise = import('../../assets/farmers-markets-by-year.json');

export const fetchFarmersMarketsOverTime = importAdapter(
  importPromise,
  {
    start: farmersMarketsOverTimeStart,
    success: farmersMarketsOverTimeSuccess,
  }
);
