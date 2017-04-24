import { promiseToGet } from './utils';

// const ROOT_URL = 'http://service.civicpdx.org/transport/';
const ROOT_URL = 'http://localhost:8000/transport/';

// without fma: This endpoint provides the fma id and geoms for all FMAs (Fire Management Areas).
// with fma: This viewset will provide the 'detail' action.
export const getFeatures = (inputs = {}) => {
  const url = `${ROOT_URL}features/?source_name=Grind and Pave`;
  return promiseToGet(url);
};


export const transportApi = {
  getFeatures,
};
