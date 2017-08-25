/*
 *
 * Definition actions
 *
 */

 import { actionTypes } from './constants';
 import { typesOfSheltersApi } from '../../api';

 const getShelterType = payload => ({
   type: actionTypes.GET_SHELTER_TYPE,
   payload,
 });

 const getShelterTypeSuccess = payload => ({
   type: actionTypes.GET_SHELTER_TYPE_SUCCESS,
   payload,
 });

 const getShelterTypeFailure = payload => ({
   type: actionTypes.GET_SHELTER_TYPE_FAILURE,
   payload,
 });

 export const fetchShelterTypeData = payload => (dispatch) => {
   dispatch(getShelterType());
   return typesOfSheltersApi(payload)
    .then(
      d => dispatch(getShelterTypeSuccess(d)),
      e => dispatch(getShelterTypeFailure(e)),
    );
 };

 export const fetchDefinitionData = (dispatch) => {
   dispatch(fetchShelterTypeData());
 }; 

 export default {
   fetchShelterTypeData,
 };
