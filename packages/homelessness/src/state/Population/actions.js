/*
 *
 * Population actions
 *
 */

 import { actionTypes } from './constants';
 import { compareEthnicityApi, compareAgeGenderApi } from '../../api';

 const getAgeGender = payload => ({
   type: actionTypes.GET_AGE_GENDER,
   payload,
 });

 const getAgeGenderSuccess = payload => ({
   type: actionTypes.GET_AGE_GENDER_SUCCESS,
   payload,
 });

 const getAgeGenderFailure = error => ({
   type: actionTypes.GET_AGE_GENDER_FAILURE,
   error,
 });

 export const fetchAgeGenderData = payload => (dispatch) => {
   dispatch(getAgeGender());
   return compareAgeGenderApi(payload)
     .then(
       d => dispatch(getAgeGenderSuccess(d)),
       e => dispatch(getAgeGenderFailure(e)),
     );
 };

 const getEthnicity = payload => ({
   type: actionTypes.GET_ETHNICITY,
   payload,
 });

 const getEthnicitySuccess = payload => ({
   type: actionTypes.GET_ETHNICITY_SUCCESS,
   payload,
 });

 const getEthnicityFailure = error => ({
   type: actionTypes.GET_DATA_FAILURE,
   error,
 });

 export const fetchEthnicityData = payload => (dispatch) => {
   dispatch(getEthnicity());
   return compareEthnicityApi(payload)
     .then(
       d => dispatch(getEthnicitySuccess(d)),
       e => dispatch(getEthnicityFailure(e)),
     );
 };

 export const fetchPopulationData = (dispatch) => {
   dispatch(fetchEthnicityData());
   dispatch(fetchAgeGenderData());
 };

 export default {
   fetchEthnicityData,
   fetchAgeGenderData,
 };
