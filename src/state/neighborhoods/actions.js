import { actionEmitter } from '../utils';
import { actionTypes } from './constants';
import { get } from '../api';
/**
 * Using file loader to keep track of the url of the neighborhoods.geojson
 * static asset url.
 * @TODO Check with David Daniel to see if this will work when this project
 * is pulled in to civic platform
 */
/* eslint-disable */
import neighborhoodsUrl from '../../../assets/neighborhoods.geojson';
// console.log(neighborhoodsUrl);
/* eslint-enable */

export const neighborhoodsStart = actionEmitter(actionTypes.CALL_START);
export const neighborhoodsFail = actionEmitter(actionTypes.CALL_FAIL);
export const neighborhoodsSuccess = actionEmitter(actionTypes.CALL_SUCCESS);

export const fetchNeighborhoods = get(neighborhoodsUrl, {
  start: neighborhoodsStart,
  success: neighborhoodsSuccess,
  fail: neighborhoodsFail,
  normalizer: json => json,
  buildParams: () => {},
});
