/*
 *
 * Services211 actions
 *
 */

 import { actionTypes } from './constants';
 import { compareServiceCallsApi } from '../../api';

 const getServiceCalls = payload => ({
   type: actionTypes.GET_SERVICE_CALLS,
   payload,
 });

 const getServiceCallsSuccess = payload => ({
   type: actionTypes.GET_SERVICE_CALLS_SUCCESS,
   payload,
 });

 const getServiceCallsFailure = error => ({
   type: actionTypes.GET_SERVICE_CALLS_FAILURE,
   error,
 });

 export const fetchServiceCallsData = payload => (dispatch) => {
   dispatch(getServiceCalls());
   return compareServiceCallsApi(payload)
     .then(
       d => dispatch(getServiceCallsSuccess(d)),
       e => dispatch(getServiceCallsFailure(e)),
     );
 };

 export default {
   fetchServiceCallsData,
 };
