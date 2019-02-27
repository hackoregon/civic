import importAdapter from '../import-adapter';
import actionEmitter from '../import-adapter-action-emitter';

export const IMPORT_START = 'PORTLAND_FARMERS_MARKETS/START';
export const IMPORT_SUCCESS = 'PORTLAND_FARMERS_MARKETS/SUCCESS';
export const SET_FARMERS_MARKET = 'PORTLAND_FARMERS_MARKETS/SET';

export const portlandFarmersMarketsStart = actionEmitter(IMPORT_START);
export const portlandFarmersMarketsSuccess = actionEmitter(IMPORT_SUCCESS);

const importPromise = import('../../assets/farmers-markets.json');

export const fetchPortlandFarmersMarkets = importAdapter(
  importPromise,
  {
    start: portlandFarmersMarketsStart,
    success: portlandFarmersMarketsSuccess,
  }
);

export const setFarmersMarket = (market) => {
  return {
    type: SET_FARMERS_MARKET,
    selectedMarket: market,
  };
};
