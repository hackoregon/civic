/*
 *
 * App actions
 *
 */

 import { actionTypes } from './constants';

 const someSyncAction = payload => ({
   type: actionTypes.DEFAULT_ACTION,
   payload,
 });

 const getData = payload => ({
   type: actionTypes.GET_DATA,
   payload,
 });

 const getDataSuccess = payload => ({
   type: actionTypes.GET_DATA_SUCCESS,
   payload,
 });

 const getDataFailure = error => ({
   type: actionTypes.GET_DATA_FAILURE,
   error,
 });

 // export const fetchData = payload => (dispatch) => {
 //   dispatch(getData());
 //   return api.products.threads(payload)
 //     .then(
 //       d => dispatch(getDataSuccess(d)),
 //       e => dispatch(getDataFailure(e)),
 //     );
 // };

 export default {
   getData,
   getDataSuccess,
   getDataFailure,
   someSyncAction,
 };
