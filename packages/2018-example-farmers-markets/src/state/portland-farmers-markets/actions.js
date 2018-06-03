import importAdapter from '../import-adapter';
import actionEmitter from '../import-adapter-action-emitter';

export const IMPORT_START = 'PORTLAND_FARMERS_MARKETS/START';
export const IMPORT_SUCCESS = 'PORTLAND_FARMERS_MARKETS/SUCCESS';

export const portlandFarmersMarketsStart = actionEmitter(IMPORT_START);
export const portlandFarmersMarketsSuccess = actionEmitter(IMPORT_SUCCESS);

export const fetchPortlandFarmersMarkets = importAdapter(
  import('../../assets/farmers-markets.json'),
  {
    start: portlandFarmersMarketsStart,
    success: portlandFarmersMarketsSuccess,
  }
);
